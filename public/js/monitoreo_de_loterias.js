import {oneDate} from "./date.js";
import {ajax_peticion} from "./Ajax-peticiones.js";
import {crear_tabla} from "./table.js";
import {ini_tabla} from "./table_ini.js";
import {Stack} from './stack.js';
import { montar_tabla } from "./gestor.js";

const stack = new Stack();
var intervalo;
var base="#base";

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
    $('#tabla1').removeClass('invisible');
    $('#aceptar').prop('disabled', true);
    //Se llama al método de crear la tabla, se le envían dos arreglos, parametros y etiquetas.
    let parametros = ["receptores","loterias","cifras","signo"];
    let extras = {};
    let labels = {};

    stack.push(montar_tabla(parametros));
    intervalo = setInterval(montar_tabla, 50000);
});
