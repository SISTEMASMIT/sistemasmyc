import {ajax_peticion} from "./Ajax-peticiones.js";
import * as imp from "./importer.js";
$(document).on("change","#receptores",async function(){
    let receptores=$(this).selectpicker().val();
    let data={"receptor":receptores,"comando":"age_rece"};
    var info =  await ajax_peticion("/query/standard_query", {'data': JSON.stringify(data)}, "POST");
    if(info.data.data.length ==  0){
        // aqui metemos su alerta jhoan
        let agencias=$("#agencias");
        agencias.html("");
        agencias.selectpicker("refresh");
    }else{
        let agencias=$("#agencias");
        agencias.html(generarHtml(info.data.data));
        agencias.selectpicker("refresh");
    }

});

$(document).on("click","#agregrar",async function(){
    let data={"comando":"","orden":"modalTaquillas"};
    let info =  await ajax_peticion("/query/standard_query", {'data': JSON.stringify(data)}, "POST");
    let formulario=JSON.parse(info.settings["jsr"]);
    let html="";
    if(formulario.filtros!=undefined){
        formulario.filtros.forEach((element,index)=>{
            if(element.tipo!="titulo"){
                if(imp[element.tipo]){
                    html+=imp[element.tipo](element.label,element.datos)
                }
            }
        })
        
    }
});

function generarHtml(list){
    let html=""
    list.forEach(function(element){
        html+=`<option value="${element.codigo_age}">${element.nombre_age}</option>`
    });
    return html;
}