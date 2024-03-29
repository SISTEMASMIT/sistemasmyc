import {futuDate} from "./date.js";
import {ajax_peticion} from "./Ajax-peticiones.js";
import {crear_tabla} from "./table.js";
import * as imp from "./importer.js";

var id='';
var base="#base";
var titulo ="";
var base_html="";
var isdclick = false;
var isrclick = false;
var isdclick2 = false;
var isrclick2 = false;
var dclick = [];
var rclick = [];
var emergente = '';
var parametros = [];
var etiquetas = [];
var comando = '';
var orden = '';
var vtn = [];
var etq = [];
var extra = [];
var btns = [];
var have_set = [];
var et;
var modal_id=1;
var row;

$(document).on("change","#receptores",async function(){
    let receptores=$(this).selectpicker().val();
    let data={"receptor":receptores,"comando":"age_rece"};
    var info =  await ajax_peticion("/query/standard_query", {'data': JSON.stringify(data)}, "POST");
    if(info.data.data.length ==  0){
        Swal.fire({
            title: '',
            text: "Este receptor no tiene Agencias",
            icon: 'warning',
            confirmButtonText: 'Aceptar'
          });
        let agencias=$("#agencias");
        agencias.html("");
        agencias.selectpicker("refresh");
    }else{
        let agencias=$("#agencias");
        agencias.selectpicker({noneSelectedText: 'Seleccione una agencia'});
        agencias.html(generarHtml(info.data.data));
        agencias.selectpicker("refresh");
    }

});

$(document).on("click","#agregrar",async function(){
    let data={"comando":"","orden":"modalTaquillas"};
    let info =  await ajax_peticion("/query/standard_query", {'data': JSON.stringify(data)}, "POST");
    let formulario=JSON.parse(info.settings["jsr"]);
    let receptor = $("#receptores").selectpicker('val');
    let html=`<div class='col-12 col-sm-6 col-md-4 col-lg-3 col-xl-3 filtros'><label class='form-label'>Receptor:</label><label class='form-label'>${receptor}</label></div>`;
    modal_id++;
    let modal = $(base).children().first().html().replaceAll("{}",modal_id);
    let modalsplit=modal.split("*");
    let titulo ='';
    if(formulario.filtros!=undefined){
        formulario.filtros.forEach((element,index)=>{
            if(element.tipo!="titulo"){
                if(imp[element.tipo]){
                    html+=imp[element.tipo](element.label,element.datos)
                }
            }else{
                titulo = element.datos.id;
            }
        })
        modalsplit[1] = html;
        modal=modalsplit.join("");
        modal=modal.replaceAll("#",titulo);
        $(base).append(modal);
        let agencias=$("#agencias").html();
        $("#agencias_receptor").html(agencias);
        $("#agencias_receptor").selectpicker("refresh");
        $("#tipo_mensaje").selectpicker("refresh");
        futuDate("#f1f2");
        if($(base).children().length>1){
            $('.modal-backdrop').addClass('show');
            $(base).children().last().addClass("fade");
            $(base).children().last().addClass("show1");
            $(base).children().last().modal("show");
        }
    }
});

function generarHtml(list){
    let html=""
    list.forEach(function(element,index){
        if(index==0){
            html+=`<option value="todas" selected>Todas</option>`;
            html+=`<option value="${element.codigo_age}" data-subtext='${element.id}' > ${element.nombre_age}</option>`;
        }else{
            html+=`<option value="${element.codigo_age}" data-subtext='${element.id}' >${element.nombre_age}</option>`;
        }
    });
    return html;
}



$(document).ready(function () {
    var columns = 6;
    var rows = 10;
    var head = crear_head(columns);
    var body = crear_body(columns,rows);
    var html=head+body;
    $('#tablaf').html(html);
    $('#tablaf').DataTable();
});

function crear_head(data){
    let head = `<thead><tr>`;
    for(var i=0; i<data;i++){
        head+=`<th>-</th>`;
    }
    head+=`</tr></thead>`;
    return head;
}

function crear_body(columns, rows){
    let body = `<tbody>`;
    for(var a =0; a< rows; a++){
        body+=`<tr>`;
        for(var i=0; i<columns;i++){
            body+=`<td>-</td>`;
        }
        body+=`</tr>`
    }
    
    
    body+=`</tbody>`;
    return body;
}


$(document).on('click', '#detener', async function() {
    clearInterval(intervalo);
});



//Ocultar El modal
$(document).on('hidden.bs.modal', '#base', function() {
    modal_id--;
    $(base).children().last().remove();
    if($(base).children().length>1){
        $('.modal-backdrop').addClass('show');
        $(base).children().last().addClass("fade");
        $(base).children().last().addClass("show");
        setTimeout(() => this.input.nativeElement.focus(), 0);
    }
    vtn.pop();
    etq.pop();
    extra.pop();
    let ss=have_set[have_set.length-1];
    if(ss){
        btns.pop();
    }
 });


$(document).on('click', '#mensajeria_taquillas', async function() {
    $('#tabla1').removeClass('invisible');
    // $('#aceptar').prop('disabled', true);
    montar_tabla();
    // intervalo = setInterval(montar_tabla, 50000);
    
});

//Funcion para guardar los mensajes

$(document).on('click', '#agregar_mensaje_taquillas', async function() {
    let agencia =$('#agencias_receptor').selectpicker('val').join(',');
    let f1 = $("#f1f2").data('daterangepicker').startDate.format('YYYYMMDD');
    let f2 = $("#f1f2").data('daterangepicker').endDate.format('YYYYMMDD');
    let tipo_mensaje = $("#tipo_mensaje").selectpicker('val');
    let receptor = $("#receptores").selectpicker('val');
    let mensaje= $('#texto').val();
    let data = {"agencia":agencia,"receptor":receptor,"f1":f1,"f2":f2,"tipo_mensaje":tipo_mensaje,"mensaje":mensaje,"comando":"agregar_mensaje_taquillas"};
    var info =  await ajax_peticion("/query/standard_query", {'data': JSON.stringify(data)}, "POST");
    if(info.data.mensaje=="Mensaje creado Correctamente"){
        Swal.fire({
            title: '',
            text: info.data.mensaje,
            icon: 'success',
            confirmButtonText: 'Aceptar'
          });
    }else{
        Swal.fire({
            title: '',
            text: 'Ocurrió un error inesperado, intente nuevamente',
            icon: 'error',
            confirmButtonText: 'Aceptar'
          });
    }
    $("#modal2").modal('hide');
    $("#modal2").removeClass("show1");
    $('#tabla1').removeClass('invisible');
    montar_tabla();



});


async function montar_tabla(){
    var w = document.getElementById("tabla_res").clientWidth;
    var h = document.getElementById("tabla_res").clientHeight;
    h = h+500;
    $('#f').html('');
    $("#carga").addClass('carga');
    $("#carga").width( w );
    $("#carga").height( h );
    $("#load").addClass('spinner');
    let data = [];
    let receptores = $('#receptores').selectpicker('val');
    let agencias = $('#agencias').selectpicker('val');


    data = {"receptor":receptores,"agencias":agencias,"comando":"mensajeria_taquillas"};

    var info =  await ajax_peticion("/query/standard_query", {'data': JSON.stringify(data)}, "POST");
    let set = Object.values(JSON.parse(info.settings.jsr));
    etq.push(info.data.head);
    vtn.push(set);
    extra.push(info.datos_extra);
    let invisibles = [];
    let sumatorias = [];
    if(set[0].length > 0){
        have_set.push(true);

        btns.push(set[0].filter(function(x){
            return x.label == 'Anular';
        }));

       invisibles = set[0].find(function(x){    
            return x.label == '96';
        });

        sumatorias = set[0].find(function(x){    
            return x.label == '97';
        });

        dclick.push(set[0].filter(function(x){ 
            if(x.label!='98' && x.label!='99' && x.label!='97' && x.label != '96'){
                return x;
            }else if(x.label=='98'){
                return x;
            }
            
        }));

        rclick.push(set[0].find(function(x){    
            return x.label == '99';
        }));

        if(dclick[0]!=undefined){
            isdclick=true;
        }

        if(rclick[0]!=undefined){
            isrclick=true;
        }

        if(invisibles !=undefined){
            invisibles=invisibles.datos.c_invisible.split(",");
            invisibles = invisibles.map(function(x){    
              return parseInt(x);
            });   
         }else{
            invisibles = [];
         }
          
   
         if(sumatorias != undefined){
            sumatorias=sumatorias.datos.c_sumatoria.split(",");
            sumatorias = sumatorias.map(function(x){    
              return parseInt(x);
            });
         }else{
            sumatorias = [];
         }
    }else{
        have_set.push(false);
        isdclick=false;
        isrclick=false;
    }

    let labels = {"Receptores":receptores,"Agencias":agencias};
    crear_tabla(info.data,"#tabla1","#thead1","#tbody1",isdclick,dclick,isrclick,invisibles,sumatorias,labels,'Mensajería Taquillas');

}


function getCurrentDate(formato){
    const date = new Date();
    let day = `${date.getDate()}`.padStart(2, "0")
    let month = `${date.getMonth() + 1}`.padStart(2, "0")
    let year = date.getFullYear();
    if(formato==1){
        let fe = [year, month, day].join("")
        return fe;
    }else{
        let fe = [day, month, year].join("/");
        return fe;
    }   
  
}



//Detectamos el Doble Click
$(document).on('dblclick', 'td', async function () {

    let dclick = vtn[vtn.length -1 ];
    
   let data = [];
   let etiq = [];
   let key;
   let value;
   let cosas = [];
   let iscorrect = false;
   var column = $(this).parent().children().index(this);
   if(isdclick){  
    if(have_set[have_set.length -1 ]){$("#load").addClass('spinner');}
       for (let a = 0; a < dclick[0].length; a++) {
           if(dclick[0][a].label!='98'){
               if (column==dclick[0][a].label){
                   iscorrect=true;
                   parametros = dclick[0][a].datos["parametros"].split(",")
                   etiquetas = dclick[0][a].datos["etiquetas"].split(",")
                   emergente = dclick[0][a].datos["emergente"];
                   comando = dclick[0][a].datos["id"];
                   titulo = dclick[0][a].datos["titulo_emergente"];
                   Object.assign(data,{"comando":dclick[0][a].datos["id"]});
                   for (let i = 0; i < parametros.length; i++) {
                       if(Number.isInteger(parseInt(parametros[i]))){
                           key = `c`+parametros[i];
                           value = $(this).parent().find("td").eq(parseInt(parametros[i])).text();
                           Object.assign(data,{[key]:value});
                       }
                   }
               }
           }else{
               iscorrect=true;
               parametros = dclick[0][a].datos["parametros"].split(",")
               emergente = dclick[0][a].datos["emergente"];
               etiquetas = dclick[0][a].datos["etiquetas"].split(",")
               comando = dclick[0][a].datos["id"];
               titulo = dclick[0][a].datos["titulo_emergente"];
               Object.assign(data,{"comando":dclick[0][a].datos["id"]});
               for (let i = 0; i < parametros.length; i++) {
                   if(Number.isInteger(parseInt(parametros[i]))){
                       key = `c`+parametros[i];
                       value = $(this).parent().find("td").eq(parseInt(parametros[i])).text();
                       Object.assign(data,{[key]:value});
                   }else{
                       if(parametros[i]=="f1"){
                           if($("#"+parametros[i]).length < 1){
                               let f = getCurrentDate(1);
                               Object.assign(data,{[parametros[i]]:f});
                           }else{
                               Object.assign(data,{[parametros[i]]:$('#'+parametros[i]).data('daterangepicker').startDate.format('YYYYMMDD')});
                           }       
                       }else if(parametros[i]=="f1f2"){
                           if($("#"+parametros[i]).length < 1 ){
                               let f = getCurrentDate(1);
                               Object.assign(data,{[parametros[i]]:f});

                           }else{
                              Object.assign(data,{f1:$("#"+parametros[i]).data('daterangepicker').startDate.format('YYYYMMDD')});
                              Object.assign(data,{f2:$("#"+parametros[i]).data('daterangepicker').endtDate.format('YYYYMMDD')});
                           }
                       }else{
                           Object.assign(data,{[parametros[i]]:$('#'+parametros[i]).selectpicker('val')});
                       } 
                   }
               }
               //Saco las etiquetas
               for (let i = 0; i < etiquetas.length; i++) {

                   if(Number.isInteger(parseInt(etiquetas[i]))){
                       // key = `c`+etiquetas[i];
                       key = etq[etq.length-1][etiquetas[i]];
                       value = $(this).parent().find("td").eq(parseInt(etiquetas[i])).text();
                       Object.assign(etiq,{[key]:value});
                   }else{
                       if(etiquetas[i]=="f1"){
                           if($("#"+etiquetas[i]).length < 1){
                               let f = getCurrentDate(0);
                               Object.assign(etiq,{Fecha :f});
                           }else{
                              Object.assign(etiq,{Fecha:$("#"+etiquetas[i]).data('daterangepicker').startDate.format('DD/MM/YYYY')});
                           }       
                       }else if(etiquetas[i]=="f1f2"){
                           if($("#"+etiquetas[i]).length < 1 ){
                               let f = getCurrentDate(0);
                               Object.assign(etiq,{Fecha2 :f});
                           }else{
                              Object.assign(etiq,{Desde:$("#"+etiquetas[i]).data('daterangepicker').startDate.format('DD/MM/YYYY')});
                              Object.assign(etiq,{Hasta:$("#"+etiquetas[i]).data('daterangepicker').endtDate.format('DD/MM/YYYY')});
                           }
                       }else{
                           let str = etiquetas[i];
                           Object.assign(etiq,{[str.charAt(0).toUpperCase()+str.slice(1)]:$('#'+etiquetas[i]).selectpicker('val')});
                       } 
                   }
               }
           }
       }
       if(iscorrect){
           //Convierto para que se envien los parametros
           let algo=[];
           algo[0]=data;
           let keys = Object.getOwnPropertyNames(data).filter((x)=>{
               return x!="length"?x:"";
           });
           let valores= Object.values(data);
           let string="{";
           keys.forEach((key,index)=>{
               string+=`"${key}":"${valores[index]}",`;
           })
           string = string.slice(0, string.length - 1);
           string+="}";
           var info =  await ajax_peticion("/query/standard_query", {'data': string}, "POST");
           let set = Object.values(JSON.parse(info.settings.jsr));
           let invisibles = [];
           let sumatorias = [];
           etq.push(info.data.head);
           vtn.push(set);
           extra.push(info.datos_extra);
           if(set[0].length > 0){
               
                have_set.push(true);

                btns.push(set[0].filter(function(x){
                    return x.label == 'Anular';
                }));

               invisibles = set[0].find(function(x){    
                   return x.label == '96';
               });

               sumatorias = set[0].find(function(x){    
                   return x.label == '97';
               });
               
               dclick =[];
               dclick.push(set[0].filter(function(x){ 
                   if(x.label!='98' && x.label!='99' && x.label!='97' && x.label != '96'){
                       return x;
                   }else if(x.label=='98'){
                       return x;
                   }
                   
               }));
               rclick=[];
               rclick.push([0].find(function(x){    
                   return x.label == '99';
               }));

               if(dclick[0]!=undefined){
                   isdclick2=true;
               }

               if(rclick[0]!=undefined){
                   isrclick2=true;
               }

               if(invisibles !=undefined){
                  invisibles=invisibles.datos.c_invisible.split(",");
                  invisibles = invisibles.map(function(x){    
                    return parseInt(x);
                  });   
               }else{
                  invisibles = [];
               }
                
         
               if(sumatorias != undefined){
                  sumatorias=sumatorias.datos.c_sumatoria.split(",");
                  sumatorias = sumatorias.map(function(x){    
                    return parseInt(x);
                  });
               }else{
                  sumatorias = [];
               }

           }else{
                have_set.push(false);
               isdclick2=false;
               isrclick2=false;
           }

           if(emergente=="tabla"){
            let btn = btns[btns.length -1][0];
                
             let labels_extra = extra[extra.length -1 ];
               //Convierto para que se envien las etiquetas
               let algo=[];
               algo[0]=etiq;
               et = etiq;
               let keys = Object.getOwnPropertyNames(etiq).filter((x)=>{
                   return x!="length"?x:"";
               });
               let valores= Object.values(etiq);
               let string="{";
               keys.forEach((key,index)=>{
                   string+=`"${key}":"${valores[index]}",`;
               })
               string = string.slice(0, string.length - 1);
               string+="}";
               let labels_modal = JSON.parse(string);
               if($(base).children().length>1){
                   $(base).children().last().removeClass("show");
               }
               modal_id++;
               let modal = $(base).children().first().html().replaceAll("{}",modal_id);
               let modalsplit=modal.split("*");
               let string_divs="";
               keys.forEach((key,index)=>{
                   string_divs+=`<div class='col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6'><p><label>${key}</label>:<label>${valores[index]}</label></p></div>`;
               });
               let button = ``;
               if(btn!=undefined){
                    if(btn.datos.condicion=="1"){
                        button += `<div class='col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6'><button type="button" class="btn btn-lg btn-danger" id="`+btn.datos.id+`">`+btn.label+`</button></div>`;
                    }
               }
               if(labels_extra.length > 0){
                    let d=[];
                    d[0]=labels_extra[0];
                    let keys_extra = Object.getOwnPropertyNames(labels_extra[0]).filter((x)=>{
                        return x!="length"?x:"";
                    });
                    let valores_extra= Object.values(labels_extra[0]);
                    keys_extra.forEach((key,index)=>{
                        string_divs+=`<div class='col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6'><p><label>${key}</label>:<label>${valores_extra[index]}</label></p></div>`;
                    })
                }
               string_divs+=button;
               modalsplit[1]=string_divs;
               modal=modalsplit.join("");
               modal=modal.replaceAll("#",titulo.charAt(0).toUpperCase()+titulo.slice(1).replaceAll("_"," "));
               $(base).append(modal);

               $('#tabla'+modal_id).removeClass('invisible');
               crear_tabla(info.data,"#tabla"+modal_id,"#thead"+modal_id,"#tbody"+modal_id,isdclick2,dclick,isrclick2,invisibles,sumatorias,labels_modal,titulo,"#modal"+modal_id);
               
           }


       }
  

      
   }
   
}
);

$(document).on('click', '.btn-danger', async function () { 
    let btn = btns[btns.length -1 ];
    let data = [];
    let parametros = btn[0].datos.parametros.split(",");
    let comando2 = btn[0].datos.id;
    Object.assign(data,{"comando":comando2});
    for (let i = 0; i < parametros.length; i++) {
        Object.assign(data,{[parametros[i]]:et[parametros[i]]});
    }
    let keys = Object.getOwnPropertyNames(data).filter((x)=>{
        return x!="length"?x:"";
    });
    let valores= Object.values(data);
    let string="{";
    keys.forEach((key,index)=>{
        string+=`"${key}":"${valores[index]}",`;
    })
    string+=`"comando":"${this.id}"`
    string+="}";
    var info =  await ajax_peticion("/query/standard_query", {'data': string}, "POST");
    if (typeof info.data.mensaje !== 'undefined') {
        Swal.fire({
            title: '',
            text: info.data.mensaje,
            icon: 'info',
            confirmButtonText: 'Aceptar'
          })
      }
});

//Click Derecho

$(document).on('contextmenu', 'td', function (e) {
    let rclick = vtn[vtn.length -1 ];
    row = $(this).closest("tr"); 
    if(isrclick){
        for (let a = 0; a < rclick[0].length; a++) {
            if(rclick[0][a].label=='99'){
                var elementos=rclick[0][a].datos.items;
            }
        }
        let html = ``;

        for (let i = 0; i < elementos.length; i++) {
           html+=abrirMenu(elementos[i]);
            
        }
        $("#menuTabla").html(html);
        const bd = document.body.classList.contains(
            'sidebar-enable'
        );

        $('td').css('box-shadow', 'none');
        if(!bd){
            var top = e.pageY;
            var left = e.pageX;
        }else{
            var top = e.pageY - 200;
            var left = e.pageX-50;
        }

        $(this).css('box-shadow', 'inset 1px 1px 0px 0px red, inset -1px -1px 0px 0px red');
        $("#menuTabla").css({
            display: "block",
            top: top,
            left: left
        });

   
    
    }

    return false; 
  
});

function abrirMenu (elemento){
    let html = ``;
    html+=`<a class="dropdown-item ritem" id="rclick" data-id="`+elemento.id+`">`+elemento.titulo+`</a>`;
    return html;
    
}

$("table").on("click", function() {
	if ( $("#menuTabla").css('display') == 'block' ){
  	    $("#menuTabla").hide();
    }
    $('td').css('box-shadow', 'none');
});

$("#menuTabla a").on("click", function() {
  $(this).parent().hide();
});


$(document).on('click', '#rclick', async function () { 
    let rclick = vtn[vtn.length -1 ];
    let data = [];
    let etiq = [];
    let key;
    let value;
    for (let a = 0; a < rclick[0].length; a++) {
        if(rclick[0][a].label=='99'){
            var elementos=rclick[0][a].datos.items;
        }
    }
    let data_id = $("#rclick").attr( "data-id" )
    for (let i = 0; i < elementos.length; i++) {
        if(elementos[i].id==data_id){
            let comando = elementos[i].comando;
            let orden = elementos[i].orden;
            let parametros = elementos[i].parametros.split(",");
            let emergente = elementos[i].emergente;
            Object.assign(data,{"comando":comando});
            Object.assign(data,{"orden":orden});
            for (let i = 0; i < parametros.length; i++) {
                if(Number.isInteger(parseInt(parametros[i]))){
                    key = `c`+parametros[i];
                    value = row.find("td").eq(parseInt(parametros[i])).text();
                    Object.assign(data,{[key]:value});
                }else{
                    if(parametros[i]=="f1"){
                        if($("#"+parametros[i]).length < 1){
                            let f = getCurrentDate(1);
                            Object.assign(data,{[parametros[i]]:f});
                        }else{
                            Object.assign(data,{[parametros[i]]:$('#'+parametros[i]).data('daterangepicker').startDate.format('YYYYMMDD')});
                        }       
                    }else if(parametros[i]=="f1f2"){
                        if($("#"+parametros[i]).length < 1 ){
                            let f = getCurrentDate(1);
                            Object.assign(data,{[parametros[i]]:f});

                        }else{
                           Object.assign(data,{f1:$("#"+parametros[i]).data('daterangepicker').startDate.format('YYYYMMDD')});
                           Object.assign(data,{f2:$("#"+parametros[i]).data('daterangepicker').endtDate.format('YYYYMMDD')});
                        }
                    }else{
                        Object.assign(data,{[parametros[i]]:$('#'+parametros[i]).selectpicker('val')});
                    } 
                }
            }
            //Convierto para que se envien los parametros
            let algo=[];
            algo[0]=data;
            let keys = Object.getOwnPropertyNames(data).filter((x)=>{
                return x!="length"?x:"";
            });
            let valores= Object.values(data);
            let string="{";
            keys.forEach((key,index)=>{
                string+=`"${key}":"${valores[index]}",`;
            })
            string = string.slice(0, string.length - 1);
            string+="}";
            var info =  await ajax_peticion("/query/standard_query", {'data': string}, "POST");
            console.log(info);

        }
    }

});
