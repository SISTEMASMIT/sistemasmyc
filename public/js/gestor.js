import {ajax_peticion} from "./Ajax-peticiones.js";
import {crear_tabla} from "./table2.js";
import {crear_tabla_editable} from "./editable2.js";
import {Stack} from './stack.js';
import * as imp from "./importer.js";

var previous_data=[];
export async function consulta(parametros,extras,moneda,comando,manual){
    let data=[];
    if(manual==0){

        //Recorrremos los Id's que se encuentran en el DOM para sacar su data
        
        data = extraer_parametros(parametros);
        //Agregamos el Comando
        Object.assign(data,{comando:comando})

        //Sacamos Datos Extras Si hay
        let keys = Object.getOwnPropertyNames(extras).filter((x)=>{
            return x!="length"?x:"";
        });
        let valores= Object.values(extras);
        keys.forEach((key,i)=>{
            Object.assign(data,{[key]:valores[i]})
        })


    }else{
        if(comando!="anular_ticket"){
            var w = document.getElementById("tabla_res_"+moneda).clientWidth;
            var h = document.getElementById("tabla_res_"+moneda).clientHeight;
            h = h+500;
            $('#f_'+moneda).html('');
            $("#carga_"+moneda).addClass('carga');
            $("#carga_"+moneda).width( w );
            $("#carga_"+moneda).height( h );
        }
        $("#load_"+moneda).addClass('spinner');
        

        //Recorrremos los Id's que se encuentran en el DOM para sacar su data
        
        data = extraer_parametros(parametros);
        
        if(manual!=undefined){
            let val_manual= Object.values(data);
            manual.forEach((param,i)=>{
                Object.assign(data,{[param]:val_manual[i]})
            })
        }
   
        //Sacamos Datos Extras Si hay
        let keys = Object.getOwnPropertyNames(extras).filter((x)=>{
            return x!="length"?x:"";
        });
        let valores= Object.values(extras);
        keys.forEach((key,i)=>{
            Object.assign(data,{[key]:valores[i]})
        })

        //Agregamos el Comando
        Object.assign(data,{comando:comando})

        //Agregamos la moneda
        Object.assign(data,{moneda:moneda})
    }
    //Procesamos los datos para que puedan ser enviados
    let consulta_query = generar_string(data);
    

    var info =  await ajax_peticion("/query/standard_query", {'data': consulta_query}, "POST");
    Object.assign(info,{"settings":extraer_settings(Object.values(JSON.parse(info.settings.jsr))[0])})
    return info;

}

export function montar_tabla(tabla_info,stack_global,tipo_tabla){

    let stack=stack_global.peek();
    let set=stack.settings;
    let etiquetas;
    if(stack_global.modal>1){
        etiquetas = tabla_info["parametros"];
    }else{
        etiquetas = extraer_labels(tabla_info["parametros"]);
    }

    let id_tabla;
    if(stack_global.modal!=1){
        id_tabla=stack_global.modal;
    }else{
        id_tabla= tabla_info["moneda"];
    }


    let table = {
        "parametro":stack.data,
        "tb":"#tabla_"+id_tabla,
        "hd":"#thead_"+id_tabla,
        "bd":"#tbody_"+id_tabla,
        "isd":set["is_dclick"],
        "dc":set["dclick"],
        "isr":set["is_rclick"],
        "inv":set["invisibles"],
        "sum":set["sumatorias"],
        "labels":etiquetas,
        "titulo":tabla_info["titulo"],
        "modal":"#modal"+tabla_info["modal_id"],
        "moneda":tabla_info["moneda"]
    }
    if(tipo_tabla!=undefined){
        if(tipo_tabla=="editable"){
            crear_tabla_editable(table);
        }
    }else{
        crear_tabla(table);
    }
}

function extraer_parametros(parametros){
    let data =[];
    parametros.forEach((parametro,index) => {
        let tipo = $("#"+parametro).attr('data-type');
        if(tipo=='select_search_shadow' || tipo == 'select' || tipo == 'select_search'){
            Object.assign(data,{[parametro]:$("#"+parametro).selectpicker('val')});
        }else if(tipo=='select_multiple'){
            Object.assign(data,{[parametro]:$("#"+parametro).selectpicker('val').join(',')});
        }else if(tipo=='date'){
            if(parametro=='f1'){
                Object.assign(data,{[parametro]:$("#"+parametro).data('daterangepicker').startDate.format('YYYYMMDD')});
            }else if(parametro=='f1f2'){
                Object.assign(data,{["f1"]:$("#"+parametro).data('daterangepicker').startDate.format('YYYYMMDD')});
                Object.assign(data,{["f2"]:$("#"+parametro).data('daterangepicker').endDate.format('YYYYMMDD')});
            }
        }else if(tipo=='input_text'){
            Object.assign(data,{[parametro]:$.trim($("#"+parametro).val())});
        }else if(tipo=='input_int'){
            if($("#"+parametro).val()!=''){
                Object.assign(data,{[parametro]:$.trim($("#"+parametro).val())});
            }else{
                console.log('Campo Vacio');
            }
        }
    });

    return data;
}

function extraer_labels(labels){

    let data =[];
    labels.forEach((label,index) => {
        let tipo = $("#"+label).attr('data-type');
        if(tipo=='select_search_shadow' || tipo == 'select'){
            Object.assign(data,{[label]:$("#"+label).selectpicker('val')});
        }else if(tipo=='select_multiple'){
            Object.assign(data,{[label]:$("#"+label).selectpicker('val').join(',')});
        }else if(tipo=='date'){
            if(label=='f1'){
                Object.assign(data,{"Fecha":$("#"+label).data('daterangepicker').startDate.format('DD/MM/YYYY')});
            }else if(label=='f1f2'){
                Object.assign(data,{["Desde "]:$("#"+label).data('daterangepicker').startDate.format('DD/MM/YYYY')});
                Object.assign(data,{["Hasta "]:$("#"+label).data('daterangepicker').endDate.format('DD/MM/YYYY')});
            }
        }else if(tipo=='input'){
            Object.assign(data,{[label]:$.trim($(label).val())});
        }else if(tipo=='input_int'){
            if($("#"+label).val()!=''){
                Object.assign(data,{[label]:$.trim($("#"+label).val())});
            }else{
                console.log('Campo Vacio');
            }
        }
    });

    return data;
}

export function extraer_settings(settings){
    let graficos = [];
    let invisibles = [];
    let sumatorias = [];
    let dclick = [];
    let rclick = [];
    let btns = [];
    let formulario_emergente = [];
    let is_dclick=false;
    let is_rclick=false;

    if(settings.length > 0){

        graficos = settings.find(function(x){
            return x.label=='94';
        })

        invisibles = settings.find(function(x){    
            return x.label == '96';
        });

        sumatorias = settings.find(function(x){    
            return x.label == '97';
        });

        btns.push(settings.find(function(x){
            return x.label == 'Anular';
        }));
        dclick.push(settings.filter(function(x){ 
            return x.tipo == 'dclick';
        }));

        rclick.push(settings.find(function(x){    
            return x.tipo == 'rclick';
        }));   

        formulario_emergente.push(settings.find(function(x){
            return x.tipo=='formulario_emergente_date_year';
        }));
        
        if(dclick[0]!=undefined){
            is_dclick=true;
        }
        if(rclick[0]!=undefined){
            is_rclick=true;
        }

        if(invisibles !=undefined){
            invisibles=invisibles.datos.c_invisible.split(",");
            invisibles = invisibles.map(function(x){    
              return parseInt(x);
            });   
        }else{
            invisibles=[];
        }

        if(sumatorias != undefined){
            sumatorias=sumatorias.datos.c_sumatoria.split(",");
            sumatorias = sumatorias.map(function(x){    
              return parseInt(x);
            });
        }
        else{
            sumatorias=[];
        }
    return {
        "graficos":graficos,
        "invisibles":invisibles,
        "sumatorias":sumatorias,
        "botones":btns,
        "dclick":dclick,
        "rclick":rclick,
        "formulario_emergente":formulario_emergente,
        "is_dclick":is_dclick,
        "is_rclick":is_rclick
        }
    }else{
        return {
            "invisibles":[],
            "sumatorias":[],
            "botones":[],
            "dclick":[],
            "rclick":[],
            "formulario_emergente":[],
            "is_dclick":false,
            "is_rclick":false
            }
    }
}

function generar_string(data){
    let keys = Object.getOwnPropertyNames(data).filter((x)=>{
        return x!="length"?x:"";
    });
    let valores= Object.values(data);
    let str="{";
    keys.forEach((key,index)=>{
        str+=`"${key}":"${valores[index]}",`;
    })
    str = str.slice(0, str.length - 1);
    str+="}";
    return  str;
}

function html_labels(data){
    let str='';
    if(data!=undefined){
        let keys = Object.getOwnPropertyNames(data).filter((x)=>{
            return x!="length"?x:"";
        });
        str='';
        let valores= Object.values(data);
        if(keys.length>0){
        keys.forEach((key,index)=>{
            str+=`<div class='col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6'><p><label>${key}</label>:<label>${valores[index]}</label></p></div>`;
        })
        }
    }else{
        str=''
    }
    return  str;
}

function tabla_parametros(parametros,row,emergente){
    let data=[];
        for (let i = 0; i < parametros.length; i++) {
            if(Number.isInteger(parseInt(parametros[i]))){
                let key = `c`+parametros[i];
                let value;
                value= row.find("td").eq(parseInt(parametros[i])).text();
                if(emergente!="formulario"){
                    Object.assign(previous_data,{[key]:value});
                }
                if(emergente=="formulario"){
                    value = Object.values(previous_data)[0];
                    Object.assign(data,{'mes':row.find("td").eq(parseInt(parametros[i])).text()});

                }
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
                    Object.assign(data,{f2:$("#"+parametros[i]).data('daterangepicker').endDate.format('YYYYMMDD')});
                    }
                }else{
                    if(emergente!="formulario"){
                        if(parametros[i]=='numero'){
                            Object.assign(data,{[parametros[i]]:$('#'+parametros[i]).val()});
                        }else{
                            Object.assign(data,{[parametros[i]]:$('#'+parametros[i]).selectpicker('val')});
                        }
                    }
                } 
            }
        }
    return data;
}

function tabla_labels(etiquetas,row,stack){
    let labels=[];
    for (let i = 0; i < etiquetas.length; i++) {
        if(Number.isInteger(parseInt(etiquetas[i]))){
            let key = [etiquetas[i]];
            let value = row.find("td").eq(parseInt(etiquetas[i])).text();
            Object.assign(labels,{[stack.data.head[parseInt(key)]]:value});
        }else{
            if(etiquetas[i]=="f1"){
                if($("#"+etiquetas[i]).length < 1){
                    let f = getCurrentDate(0);
                    Object.assign(labels,{Fecha :f});
                }else{
                Object.assign(labels,{Fecha:$("#"+etiquetas[i]).data('daterangepicker').startDate.format('DD/MM/YYYY')});
                }       
            }else if(etiquetas[i]=="f1f2"){
                if($("#"+etiquetas[i]).length < 1 ){
                    let f = getCurrentDate(0);
                    Object.assign(labels,{Fecha2 :f});
                }else{
                Object.assign(labels,{Desde:$("#"+etiquetas[i]).data('daterangepicker').startDate.format('DD/MM/YYYY')});
                Object.assign(labels,{Hasta:$("#"+etiquetas[i]).data('daterangepicker').endDate.format('DD/MM/YYYY')});
                }
            }else{
                if(etiquetas[i]=='numero'){
                    Object.assign(labels,{[etiquetas[i]]:$('#'+etiquetas[i]).val()});
                }else{
                    let str = etiquetas[i];
                    Object.assign(labels,{[str.charAt(0).toUpperCase()+str.slice(1)]:$('#'+etiquetas[i]).selectpicker('val')});
                }
            } 
        }
    }
    return labels;
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
//Metodo del Doble Click
export async function event_dclick(stack_global,row,column,base,estado){
    let parametros;
    let emergente;
    let etiquetas;
    let comando;
    let titulo;
    let stack = stack_global.peek();
    let is_correct=false;
    let data=[];
    let labels=[];
    let moneda = stack_global.moneda;
    if(stack.settings.is_dclick){
        if(stack.data.data.length>0){
            
            //Recorremos Dclick para comprobar si es en varios click o toda la row
            for (let a = 0; a < stack.settings.dclick.length; a++) {
                //Si es alguna otra columna
                if(stack.settings.dclick[0][a].label!='98'){
                    if(column==stack.settings.dclick[0][a].label){
                        $("#load_"+moneda).addClass('spinner');
                        is_correct=true;
                        parametros = stack.settings.dclick[0][a].datos["parametros"].split(",")
                        emergente = stack.settings.dclick[0][a].datos["emergente"];
                        etiquetas = stack.settings.dclick[0][a].datos["etiquetas"].split(",")
                        comando = stack.settings.dclick[0][a].datos["id"];
                        titulo = stack.settings.dclick[0][a].datos["titulo_emergente"];

                        //Recorremos los parametros para sacar la data
                        if(stack.settings.formulario_emergente[0]!=undefined){
                            data=tabla_parametros(parametros,row,"formulario");
                        }else{
                            data=tabla_parametros(parametros,row,emergente);
                        }
                        if(estado=="estado"){
                            if(column=='3'){
                                Object.assign(data,{"estado":"n"});
                            }else if(column=='5'){
                                Object.assign(data,{"estado":"c"});
                            }
                        }
                        Object.assign(data,{"comando":stack.settings.dclick[0][a].datos["id"]});
                        
                        //La moneda que se está usando

                        Object.assign(data,{"moneda":stack_global.moneda});
                        //Saco las Etiquetas

                        labels = tabla_labels(etiquetas,row,stack);
                    }
                }else{
                    //Es el dclick en toda la row
                    is_correct=true;
                    $("#load_"+moneda).addClass('spinner');
                    parametros = stack.settings.dclick[0][a].datos["parametros"].split(",")
                    emergente = stack.settings.dclick[0][a].datos["emergente"];
                    etiquetas = stack.settings.dclick[0][a].datos["etiquetas"].split(",")
                    comando = stack.settings.dclick[0][a].datos["id"];
                    titulo = stack.settings.dclick[0][a].datos["titulo_emergente"];
                   
                    //Recorremos los parametros para sacar la data
                    if(stack.settings.formulario_emergente[0]!=undefined){
                        data=tabla_parametros(parametros,row,"formulario");
                    }else{
                        data=tabla_parametros(parametros,row,emergente);
                    }

                    Object.assign(data,{"comando":stack.settings.dclick[0][a].datos["id"]});
                    
                    //La moneda que se está usando

                    Object.assign(data,{"moneda":stack_global.moneda});
                    //Saco las Etiquetas

                    labels = tabla_labels(etiquetas,row,stack);
                   
                }
            }

            //Verificamos y probamos la tabla
            if(is_correct){
                let codigo_rec =row.find("td").eq(0);
                if(codigo_rec.css('background-color')=='rgb(139, 202, 66)'){
                        Object.assign(data,{"comando":"csl_vtas_globales2"});
                        Object.assign(data,{"orden":"list"});
                }
                let consulta_query = generar_string(data);
                var info =  await ajax_peticion("/query/standard_query", {'data': consulta_query}, "POST");
                let settings=Object.values(JSON.parse(info.settings.jsr))[0];

                Object.assign(info,{"settings":extraer_settings(Object.values(JSON.parse(info.settings.jsr))[0])})
                Object.assign(info,{"parametros":parametros})
                Object.assign(info,{"labels":labels})
                Object.assign(info,{"titulo":titulo})
                Object.assign(info,{"comando":comando})
                Object.assign(info,{"emergente":emergente})
                Object.assign(info,{"correcto":1})
                stack_global.push(info);
                mostrar_modal(stack_global,base);
                return stack_global;
            }else{
                return stack_global;
            }
        }else{
            return stack_global;
        }
    }else{
        return stack_global;
    }
}

//funcion para el click derecho
export async function event_rclick(stack_global,row,column,base,data_id){

    let stack = stack_global.peek();
    let data=[];
    let labels=[];
    let elementos=stack.settings.rclick[0].datos.items;

    //Reviso en cual item hizo click
    for (let i = 0; i < elementos.length; i++) {
        if(elementos[i].id==data_id){
            let comando = elementos[i].comando;
            let orden = elementos[i].orden;
            let parametros = elementos[i].parametros.split(",");
            let titulo = elementos[i].titulo;
            let emergente = elementos[i].emergente;
            let etiquetas=[];
            if(elementos[i].etiquetas!=undefined){
                etiquetas =elementos[i].etiquetas.split(",");
            }

            //Sacamos los parametros de la tabla
            data=tabla_parametros(parametros,row);
            Object.assign(data,{"comando":comando,"orden":orden});
            
            //Reviso si existe f4 en este click

            if(elementos[i].id=="f4"){
                Object.assign(data,{"comando":"csl_vtas_globalesf4a"});
                Object.assign(data,{"orden":"modalReporteGlobalf4"});
                let y = new Date().getFullYear();
                Object.assign(data,{"ano":y});
            }

            //sacamos las etiquetas de la tabla
            if(etiquetas[0]!=undefined){
                labels=tabla_labels(etiquetas,row,stack);
            }

            //Convertimos los datos para que se envíen por ajax
            data=generar_string(data);
            var info =  await ajax_peticion("/query/standard_query", {'data': data}, "POST");
            Object.assign(info,{"settings":extraer_settings(Object.values(JSON.parse(info.settings.jsr))[0])})
            Object.assign(info,{"parametros":parametros})
            Object.assign(info,{"labels":labels})
            Object.assign(info,{"titulo":titulo})
            Object.assign(info,{"comando":comando})
            Object.assign(info,{"emergente":emergente})
            Object.assign(info,{"correcto":1})
            stack_global.push(info);
            mostrar_modal(stack_global,base);
        }
    }


    return stack_global;
}


//funcion para el On Change
export async function event_change(stack_global,base,ano){
    let data = previous_data;
    Object.assign(data,{"ano":ano});
    Object.assign(data,{"comando":"csl_vtas_globalesf4a"});
    Object.assign(data,{"orden":"modalReporteGlobalf4"});
    data=generar_string(data);
    var info =  await ajax_peticion("/query/standard_query", {'data':data}, "POST");
    Object.assign(info,{"settings":extraer_settings(Object.values(JSON.parse(info.settings.jsr))[0])})
    stack_global.pop();
    stack_global.push(info);
    
    recargar_tabla(stack_global,base);

    return stack_global;
}



export function abrirMenu (elemento){
    let html = ``;
    html+=`<a class="dropdown-item ritem" id="rclick" data-id="`+elemento.id+`">`+elemento.titulo+`</a>`;
    return html;
}

//Funcion para mostrar el modal
export function mostrar_modal(stack_global,base){
    let moneda = stack_global.moneda;
    let stack = stack_global.peek();
    let botones = stack.settings.botones[0];
    let button=``;
    if(botones!=undefined){
        if(botones.datos.condicion=="1"){
            button += `<div class='col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6'><button type="button" class="btn btn-lg btn-danger" id="`+botones.datos.id+`">`+botones.label+`</button></div>`;
        }
    }
    let labels_modal = $.extend({}, stack.datos_extra[0], stack.labels);
    let labels_print = generar_string(labels_modal);
    labels_print = JSON.parse(labels_print);
    labels_modal = html_labels(labels_modal);
    if($(base).children().length>1){
        $(base).children().last().removeClass("show");
    }
    stack_global.modal = stack_global.modal+1;
    let modal = $(base).children().first().html().replaceAll("{}",stack_global.modal);
    let modalsplit=modal.split("*");

    if(stack.emergente=="tabla"){
        let html=labels_modal+button;
        modalsplit[1] = html;
        modal=modalsplit.join("");
        modal=modal.replaceAll("#",stack.titulo.charAt(0).toUpperCase()+stack.titulo.slice(1).replaceAll("_"," "));
        $(base).append(modal);
        $('#tabla_'+stack_global.modal).removeClass('invisible');
        let tabla_info = {"stack":stack_global,
        "parametros":labels_print,
        "moneda":moneda,
        "titulo":stack.titulo,
        "modal_id":stack_global.modal
    }
        montar_tabla(tabla_info,stack_global);
               
    }else if(stack.emergente=="formulario"){
        let html=``;
        if(imp[stack.settings.formulario_emergente[0].tipo]){
            html+=imp[stack.settings.formulario_emergente[0].tipo](stack.settings.formulario_emergente[0].label,stack.settings.formulario_emergente[0].datos)
        }
        modalsplit[1] = html;
        modal=modalsplit.join("");
        modal=modal.replaceAll("#",stack.titulo.charAt(0).toUpperCase()+stack.titulo.slice(1).replaceAll("_"," "));
        $(base).append(modal);
        $('#'+stack.settings.formulario_emergente[0].datos.id).selectpicker("refresh");
        $('#tabla_'+stack_global.modal).removeClass('invisible');
        let tabla_info = {"stack":stack_global,
        "parametros":stack.parametros,
        "moneda":moneda,
        "titulo":stack.titulo,
        "modal_id":stack_global.modal
        };
        montar_tabla(tabla_info,stack_global);
    }
    
}



//Funcion para recargar la tabla
export function recargar_tabla(stack_global,base){
    let moneda = stack_global.moneda;
    let stack = stack_global.peek();
    let set = stack.settings;
    let id_tabla=stack_global.modal;
    let table = {
        "parametro":stack.data,
        "tb":"#tabla_"+id_tabla,
        "hd":"#thead_"+id_tabla,
        "bd":"#tbody_"+id_tabla,
        "isd":set["is_dclick"],
        "dc":set["dclick"],
        "isr":set["is_rclick"],
        "inv":set["invisibles"],
        "sum":set["sumatorias"],
        "labels":[],
        "titulo":'',
        "modal":"#modal"+stack_global.modal,
        "moneda":moneda
    }

    
    $("#f3").selectpicker("refresh");
    crear_tabla(table);

    
    
}

export function consultar_monedas(){
    var monedas = ["COP","BS","USD","REA"];
    return monedas;
}

export function alerta(mensaje,tipo){
    Swal.fire({
        title: '',
        text: mensaje,
        icon: tipo,
        confirmButtonText: 'Aceptar'
      })
}