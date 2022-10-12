import * as fecha from "./date.js";
import {ajax_peticion} from "./Ajax-peticiones.js";
import {ini_tabla} from "./table_ini.js";
import {Stack} from './stack.js';
import * as gestor from "./gestor.js";

var monedas=[];
var moneda_actual;
var stack = new Stack();
var base="#base";
var modal_id = 1;
var boton=false;
var row;
var id_menu;

$(document).ready(function () {
    
    //Se realiza la generación de la tabla invisible, enviandose el ID de la table
    monedas = gestor.consultar_monedas();
    ini_tabla('#moneda',monedas,0);

    
    //Se inicializan las fechas
    // fecha.rangeDate = f1f2 antiguos
    // fecha.futuDate = f1f2 futuros
    // fecha.oneDate = f1 unica
    // fecha.rangeDate("#f1f2");
});


//Agregando codigo para select anidados

$(document).on("change","#agencia",async function(){
    let receptores=$(this).selectpicker().val();
    let data={"agencia":receptores,"comando":"get_seriales"};
    var info =  await ajax_peticion("/query/standard_query", {'data': JSON.stringify(data)}, "POST");
    if(info.data.data.length ==  0){
        gestor.alerta('Este receptor no tiene seriales','warning');
        let agencias=$("#cod_serial");
        agencias.selectpicker({noneSelectedText: 'Seleccione un serial'});
        agencias.html("");
        agencias.selectpicker("refresh");
    }else{
        let agencias=$("#cod_serial");
        agencias.selectpicker({noneSelectedText: 'Seleccione un serial'});
        agencias.html(generarHtml(info.data.data));
        agencias.selectpicker("refresh");
    }

});

function generarHtml(list){
    let html=""
    list.forEach(function(element,index){
        if(index==0){
            html+=`<option value="${element.label}" data-subtext='${element.id}' > ${element.label}</option>`;
        }else{
            html+=`<option value="${element.label}" data-subtext='${element.id}' >${element.label}</option>`;
        }
    });
    return html;
}




$(document).on('click', '#agencias_agencias', function() {
    traer_data();
});


 //Trae la data de acuerdo a los parametros iniciales
async function traer_data(){
  
    //Se llama al método de crear la tabla, se le envían dos arreglos, parametros y etiquetas.
    let parametros = ["agencia","codigo_secu"];
    let extras = {};
    //parametros,  extras, moneda, comando/id 

    let mensaje = await gestor.consulta(parametros,extras, 0,"agencias_agencias",0);

    gestor.alerta(mensaje.data.mensaje,'error');

}

