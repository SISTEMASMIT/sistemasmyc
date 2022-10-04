import {ajax_peticion} from "./Ajax-peticiones.js";
import {crear_tabla} from "./table2.js";
import {Stack} from './stack.js';

export async function consulta(parametros,extras,moneda,comando){
    var w = document.getElementById("tabla_res_"+moneda).clientWidth;
    var h = document.getElementById("tabla_res_"+moneda).clientHeight;
    h = h+500;
    $('#f_'+moneda).html('');
    $("#carga_"+moneda).addClass('carga');
    $("#carga_"+moneda).width( w );
    $("#carga_"+moneda).height( h );
    $("#load_"+moneda).addClass('spinner');
    let data = [];

    //Recorrremos los Id's que se encuentran en el DOM para sacar su data
    data = extraer_parametros(parametros);
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

    //Procesamos los datos para que puedan ser enviados
    let consulta_query = generar_string(data);
    

    var info =  await ajax_peticion("/query/standard_query", {'data': consulta_query}, "POST");
    Object.assign(info,{"settings":extraer_settings(Object.values(JSON.parse(info.settings.jsr))[0])})
    return info;

}

export function montar_tabla(tabla_info,stack_global){;

    let stack=stack_global.peek();
    let set=stack.settings;
    
    let etiquetas = extraer_parametros(tabla_info["parametros"]);

    etiquetas = generar_string(etiquetas);

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
        crear_tabla(table);
}

function extraer_parametros(parametros){
    let data =[];
    parametros.forEach((parametro,index) => {
        let tipo = $("#"+parametro).attr('data-type');
        if(tipo=='select_search_shadow' || tipo == 'select'){
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
        }else if(tipo=='input'){
            Object.assign(data,{[parametro]:$.trim($(parametro).val())});
        }
    });

    return data;
}

function extraer_labels(stack){

    let data =[];
    let labels=stack.etiquetas;
    labels.forEach((label,index) => {
        let tipo = $("#"+label).attr('data-type');
        if(tipo=='select_search_shadow' || tipo == 'select'){
            Object.assign(data,{[label]:$("#"+label).selectpicker('val')});
        }else if(tipo=='select_multiple'){
            Object.assign(data,{[parametro]:$("#"+label).selectpicker('val').join(',')});
        }else if(tipo=='date'){
            if(label=='f1'){
                Object.assign(data,{[label]:$("#"+label).data('daterangepicker').startDate.format('YYYYMMDD')});
            }else if(label=='f1f2'){
                Object.assign(data,{[label]:$("#"+label).data('daterangepicker').endDate.format('YYYYMMDD')});
            }
        }else if(tipo=='input'){
            Object.assign(data,{[label]:$.trim($(label).val())});
        }
    });

    return data;
}

function extraer_settings(settings){
    let invisibles = [];
    let sumatorias = [];
    let dclick = [];
    let rclick = [];
    let btns = [];
    let is_dclick=false;
    let is_rclick=false;

    if(settings.length > 0){

        invisibles = settings.find(function(x){    
            return x.label == '96';
        });

        sumatorias = settings.find(function(x){    
            return x.label == '97';
        });

        btns.push(settings.find(function(x){
            return x.label == 'Anular';
        }));

        dclick.push(settings.find(function(x){ 
            return x.tipo == 'dclick';
        }));

        rclick.push(settings.find(function(x){    
            return x.tipo == 'rclick';
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
        "invisibles":invisibles,
        "sumatorias":sumatorias,
        "botones":btns,
        "dclick":dclick,
        "rclick":rclick,
        "is_dclick":is_dclick,
        "is_rclick":is_rclick
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

function tabla_parametros(parametros,row){
    let data=[];
    for (let i = 0; i < parametros.length; i++) {
        if(Number.isInteger(parseInt(parametros[i]))){
            let key = `c`+parametros[i];
            let value = row.find("td").eq(parseInt(parametros[i])).text();
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
                Object.assign(data,{[parametros[i]]:$('#'+parametros[i]).selectpicker('val')});
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
                let str = etiquetas[i];
                Object.assign(labels,{[str.charAt(0).toUpperCase()+str.slice(1)]:$('#'+etiquetas[i]).selectpicker('val')});
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
export async function event_dclick(stack_global,row,column,base){
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
            $("#load_"+moneda).addClass('spinner');
            //Recorremos Dclick para comprobar si es en varios click o toda la row
            for (let a = 0; a < stack.settings.dclick.length; a++) {
                //Si es alguna otra columna
                if(stack.settings.dclick[a].label!='98'){
                
                }else{
                    //Es el dclick en toda la row
                    is_correct=true;
                    parametros = stack.settings.dclick[a].datos["parametros"].split(",")
                    emergente = stack.settings.dclick[a].datos["emergente"];
                    etiquetas = stack.settings.dclick[a].datos["etiquetas"].split(",")
                    comando = stack.settings.dclick[a].datos["id"];
                    titulo = stack.settings.dclick[a].datos["titulo_emergente"];
                   
                    //Recorremos los parametros para sacar la data

                    data=tabla_parametros(parametros,row);

                    Object.assign(data,{"comando":stack.settings.dclick[a].datos["id"]});
                    //Saco las Etiquetas

                    labels = tabla_labels(etiquetas,row,stack);
                   
                }
            }

            //Verificamos y probamos la tabla
            if(is_correct){
                let consulta_query = generar_string(data);
                var info =  await ajax_peticion("/query/standard_query", {'data': consulta_query}, "POST");
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
            let emergente = elementos[i].emergente;
            let etiquetas = elementos[i].etiquetas;
                        //Sacamos los parametros de la tabla
            data=tabla_parametros(parametros,row);
            Object.assign(data,{"comando":comando,"orden":orden});
            
            //sacamos las etiquetas de la tabla
            if(etiquetas!=undefined){
                labels=tabla_labels(etiquetas,row,stack);
            }
        }
    }


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
    if(stack.emergente=="tabla"){
        let botones = stack.settings.botones[0];
        let labels_extra = html_labels(stack.datos_extra[0]);
        let labels_modal = html_labels(stack.labels);
        if($(base).children().length>1){
            $(base).children().last().removeClass("show");
        }
        stack_global.modal = stack_global.modal+1;
        let modal = $(base).children().first().html().replaceAll("{}",stack_global.modal);
        let modalsplit=modal.split("*");
        let html=labels_modal+labels_extra;
        modalsplit[1] = html;
        modal=modalsplit.join("");
        modal=modal.replaceAll("#",stack.titulo.charAt(0).toUpperCase()+stack.titulo.slice(1).replaceAll("_"," "));
        $(base).append(modal);
        $('#tabla_'+stack_global.modal).removeClass('invisible');
        let tabla_info = {"stack":stack_global,
        "parametros":stack.parametros,
        "moneda":moneda,
        "titulo":stack.titulo,
        "modal_id":stack_global.modal
    }
        montar_tabla(tabla_info,stack_global);
               
    }
}