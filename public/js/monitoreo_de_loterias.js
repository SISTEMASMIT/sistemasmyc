import {oneDate} from "./date.js";
import {ajax_peticion} from "./Ajax-peticiones.js";
import {ini_tabla} from "./table_ini.js";
import {Stack} from './stack.js';
import * as gestor from "./gestor.js";

var stack = new Stack();
var intervalo;
var base="#base";
var modal_id = 1;

$(document).on("click", "#moneda .tabs .tab-list .tab", function(event) {
	event.preventDefault();

  $(".tab").removeClass("active");
	$(".tab-content").removeClass("show");

	$(this).addClass("active");
	$($(this).attr('href')).addClass("show");	
});

$(document).ready(function () {
    //Se realiza la generación de la tabla invisible, enviandose el ID de la table
    let monedas = ["COP","BS","USD"];
    ini_tabla('#moneda',monedas);
});

//Funcion para detener el monitoreo
$(document).on('click', '#detener', async function() {
    clearInterval(intervalo);
});

$(document).on('click', '#monitoreo_de_loterias', async function() {
    let moneda = $("#moneda .tabs a.active");
    moneda=moneda.attr('id');
    $('#tabla1').removeClass('invisible');
    $('#tabla_'+moneda).removeClass('invisible');
    $('#aceptar').prop('disabled', true);
    //Se llama al método de crear la tabla, se le envían dos arreglos, parametros y etiquetas.
    let parametros = ["receptor","seleccion","cifras","signo"];
    let extras = {"monto":0,"limite":1000};
    //parametros,  extras, moneda, comando/id 
    stack.push( await gestor.consulta(parametros,extras, moneda,"monitoreo_de_loterias"));
    let tabla_info = {"stack":stack.peek(),
        "parametros":parametros,
        "moneda":moneda,
        "titulo":"Monitoreo de Loterias",
        "modal_id":modal_id
    }
    gestor.montar_tabla(tabla_info);

    // intervalo = setInterval( gestor.montar_tabla(tabla_info), 50000);
});


//Doble Click
$(document).on('dblclick', 'td', async function () {
    let row = $(this).closest("tr"); 
    console.log(stack.size());
    stack.push(gestor.event_dclick(stack,row));
    console.log(stack.size());
    gestor.mostrar_modal(stack,modal_id);
});