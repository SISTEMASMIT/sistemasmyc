import {oneDate} from "./date.js";
import {ajax_peticion} from "./Ajax-peticiones.js";
import {crear_tabla} from "./table.js";

var id='';
var base="#base";
var titulo ="";
var tck = [];
var vtn = [];
var etq = [];
var extra = [];
var btns = [];
var have_set = [];
var et;
var modal_id=1;
var row;
var info2;

$(document).ready(function(){
   oneDate("#f1");
   var columns = 6;
    var rows = 10;
    var head = crear_head(columns);
    var body = crear_body(columns,rows);
    var html=head+body;
    $('#tablaf').html(html);
    $('#tablaf').DataTable();
})


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


//Ocultar El modal
$(document).on('hidden.bs.modal', '#base', function() {
    modal_id--;
    $(base).children().last().remove();
    if($(base).children().length>1){
        $('.modal-backdrop').addClass('show');
        $(base).children().last().addClass("fade");
        $(base).children().last().addClass("show");
    }
    vtn.pop();
    etq.pop();
    extra.pop();
    let ss=have_set[have_set.length-1];
    if(ss){
        btns.pop();
    }
 });

$(document).on('click', '#anular_ticket', async function() {
   $('#tabla1').removeClass('invisible');
   if($('#nro_ticket').val()!=''){
        montar_tabla();
   }else{
    $('#nro_ticket').attr("placeholder", "Ingrese un Número");
   }
});

async function montar_tabla(){
   var w = document.getElementById("tabla_res").clientWidth;
   var h = document.getElementById("tabla_res").clientHeight;
   h = h+500;
//    $('#f').html('');
   $("#carga").addClass('carga');
   $("#carga").width( w );
   $("#carga").height( h );
   $("#load").addClass('spinner');
   let data = [];
   let numero_ticket =$.trim($('#nro_ticket').val());
   let agencias = $('#cod_agencia').selectpicker('val');
   data = {"c2":numero_ticket,"c1":agencias,"comando":"anular_ticket"};
   var info =  await ajax_peticion("/query/standard_query", {'data': JSON.stringify(data)}, "POST");
   info2=info;
   let set = Object.values(JSON.parse(info.settings.jsr));
   if(info.data.data<1){
    Swal.fire({
        title: 'Error!',
        text: 'Ticket o Agencia Erroneos',
        icon: 'error',
        confirmButtonText: 'Aceptar'
      })
        $("#carga").removeClass('carga');
        $("#load").removeClass('spinner');
   }else{
    let labels = {"Numero Ticket":numero_ticket,"Agencias":agencias};
    modal_emergente(info);
   
}

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


async function modal_emergente(info){
    tck.push($('#cod_agencia').selectpicker('val'));
    tck.push($.trim($('#nro_ticket').val()));
    let labels = {"Agencia":$('#cod_agencia').selectpicker('val'),"Ticket":$.trim($('#nro_ticket').val())}
    let set = Object.values(JSON.parse(info.settings.jsr));
    let btn = set[0].filter(function(x){
        return x.label == 'Anular';
    });
    let extra = info.datos_extra;
    let keys = Object.getOwnPropertyNames(extra[0]).filter((x)=>{
        return x!="length"?x:"";
    });
    let valores= Object.values(extra[0]);
    modal_id++;
    let modal = $(base).children().first().html().replaceAll("{}",modal_id);
    let modalsplit=modal.split("*");
    let string_divs="";
    keys.forEach((key,index)=>{
        Object.assign(labels,{[key]:valores[index]});
    });


    keys = Object.getOwnPropertyNames(labels).filter((x)=>{
        return x!="length"?x:"";
    });
    valores= Object.values(labels);
    let string="{";

    keys.forEach((key,index)=>{
        string+=`"${key}":"${valores[index]}",`;
        string_divs+=`<div class='col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6'><p><label>${key}</label>:<label>${valores[index]}</label></p></div>`;
    });
    string = string.slice(0, string.length - 1);
    string+="}";

    let button = ``;
    if(btn!=undefined){
        if(btn[0].datos.condicion=="1"){
            button += `<div class='col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6'><button type="button" class="btn btn-lg btn-danger" id="`+btn[0].datos.id+`">`+btn[0].label+`</button></div>`;
        }
    }
    string_divs+=button;
    modalsplit[1]=string_divs;
    modal=modalsplit.join("");
    modal=modal.replaceAll("#",titulo.charAt(0).toUpperCase()+titulo.slice(1).replaceAll("_"," "));
    $(base).append(modal);
    $('#tabla'+modal_id).removeClass('invisible');

    crear_tabla(info.data,"#tabla"+modal_id,"#thead"+modal_id,"#tbody"+modal_id,false,0,false,[],[],string,titulo,"#modal"+modal_id);
        
}


$(document).on('click', '.btn-danger', async function () {
    $("#load").addClass('spinner');
    let set = Object.values(JSON.parse(info2.settings.jsr));
    let btn = set[0].filter(function(x){
        return x.label == 'Anular';
    });
    let data = [];
    let parametros = btn[0].datos.parametros.split(",");
    let comando2 = btn[0].datos.id;
    Object.assign(data,{"comando":comando2});
    for (let i = 0; i < parametros.length; i++) {
        Object.assign(data,{[parametros[i]]:tck[i]});
    }
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
    if (typeof info.data.mensaje !== 'undefined') {
        let mensaje = info.data.mensaje;
        if(mensaje.includes("ya esta")){
            Swal.fire({
                title: '',
                text: mensaje,
                icon: 'error',
                confirmButtonText: 'Aceptar'
              });
        }else{
            Swal.fire({
                title: '',
                text: mensaje,
                icon: 'success',
                confirmButtonText: 'Aceptar'
              });
        }
        $("#load").removeClass('spinner');
      }
});