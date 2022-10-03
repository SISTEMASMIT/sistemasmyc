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
    data = extraer_labels(parametros);
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
    return info;

}

export function montar_tabla(tabla_info){
    
    var settings = Object.values(JSON.parse(tabla_info["stack"].settings.jsr));
    
    let set=extraer_settings(settings);
    
    let etiquetas = extraer_labels(tabla_info["parametros"]);
    etiquetas = generar_string(etiquetas);

    let table = {
        "parametro":tabla_info["stack"].data,
        "tb":"#tabla_"+tabla_info["moneda"],
        "hd":"#thead_"+tabla_info["moneda"],
        "bd":"#tbody_"+tabla_info["moneda"],
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

function extraer_labels(parametros){
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
                Object.assign(data,{[parametro]:$("#"+parametro).data('daterangepicker').endDate.format('YYYYMMDD')});
            }
        }else if(tipo=='input'){
            Object.assign(data,{[parametro]:$.trim($(parametro).val())});
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

    if(settings[0].length > 0){

        invisibles = settings[0].find(function(x){    
            return x.label == '96';
        });

        sumatorias = settings[0].find(function(x){    
            return x.label == '97';
        });

        btns.push(settings[0].filter(function(x){
            return x.label == 'Anular';
        }));

        dclick.push(settings[0].filter(function(x){ 
            return x.tipo == 'dclick';
        }));

        rclick.push([0].find(function(x){    
            return x.tipo == 'rclick';
        }));   
        
        if(dclick[0]!=undefined)is_dclick=true;
        if(rclick[0]!=undefined)is_rclick=true;

        if(invisibles !=undefined){
            invisibles=invisibles.datos.c_invisible.split(",");
            invisibles = invisibles.map(function(x){    
              return parseInt(x);
            });   
        }

        if(sumatorias != undefined){
            sumatorias=sumatorias.datos.c_sumatoria.split(",");
            sumatorias = sumatorias.map(function(x){    
              return parseInt(x);
            });
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

export async function event_dclick(stack_global,row){
    let parametros;
    let emergente;
    let etiquetas;
    let comando;
    let titulo;

    let stack = stack_global.peek();
    let is_correct=false;
    let data=[];
    let labels=[];
    var settings = Object.values(JSON.parse(stack.settings.jsr));
    let set = extraer_settings(settings);
    let moneda = $("#moneda .tabs a.active");
    moneda=moneda.attr('id');
    console.log(set["dclick"][0]);
    if(set["is_dclick"]){
        var column = $(this).parent().children().index(this);
        $("#load_"+moneda).addClass('spinner');
        //Recorremos Dclick para comprobar si es en varios click o toda la row
        for (let a = 0; a < set["dclick"][0].length; a++) {
            //Si es alguna otra columna
            if(set["dclick"][0][a].label!='98'){
            
            }else{
                //Es el dclick en toda la row
                is_correct=true;
                parametros = set["dclick"][0][a].datos["parametros"].split(",")
                emergente = set["dclick"][0][a].datos["emergente"];
                etiquetas = set["dclick"][0][a].datos["etiquetas"].split(",")
                comando = set["dclick"][0][a].datos["id"];
                titulo = set["dclick"][0][a].datos["titulo_emergente"];
                Object.assign(data,{"comando":set["dclick"][0][a].datos["id"]});

                //Recorremos los parametros para sacar la data
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

                //Saco las Etiquetas

                for (let i = 0; i < etiquetas.length; i++) {

                    if(Number.isInteger(parseInt(etiquetas[i]))){
                        let key = [etiquetas[i]];
                        let value = row.find("td").eq(parseInt(etiquetas[i])).text();
                        Object.assign(labels,{[key]:value});
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
            }
        }
        //Verificamos y probamos la tabla
        if(is_correct){
            let consulta_query = generar_string(data);
            var info =  await ajax_peticion("/query/standard_query", {'data': consulta_query}, "POST");
            return info;
        }
    }
}

export async function mostrar_modal(stack_global){

    let stack = await stack_global.peek();
    var settings = Object.values(JSON.parse(stack.settings.jsr));
    let set = extraer_settings(settings);
    let emergente = set["dclick"][0][a].datos["emergente"];

}