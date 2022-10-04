import {oneDate} from "./date.js";
import {ajax_peticion} from "./Ajax-peticiones.js";
import {ini_tabla} from "./table_ini.js";
import {Stack} from './stack.js';
import * as gestor from "./gestor.js";

var monedas=[];
var moneda_actual;
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
    moneda_actual = $("#moneda .tabs a.active").attr('id');
    //Este if es para comprobar si ya existe una pila de esa moneda
    if (window[moneda_actual].moneda != undefined) { 
    }else{
        window[moneda_actual] =  new Stack(moneda_actual,1)
    }
    traer_data();

    
    
});

$(document).ready(function () {
    //Se realiza la generación de la tabla invisible, enviandose el ID de la table
    monedas = ["COP","BS","USD","REA"];
    ini_tabla('#moneda',monedas);
    moneda_actual = $("#moneda .tabs a.active").attr('id');
    window[moneda_actual] = new Stack(moneda_actual,1);
    console.log(window[moneda_actual]);
});

//Funcion para detener el monitoreo
$(document).on('click', '#detener', async function() {
    clearInterval(intervalo);
});

$(document).on('click', '#monitoreo_de_loterias', function() {
    traer_data();
    // intervalo = setInterval( gestor.montar_tabla(tabla_info), 50000);
});


//Ocultar El modal
$(document).on('hidden.bs.modal', '#base', function() {
    $(base).children().last().remove();
    if($(base).children().length>1){
        $('.modal-backdrop').addClass('show');
        $(base).children().last().addClass("fade");
        $(base).children().last().addClass("show");
    }
    window[moneda_actual].modal=window[moneda_actual].modal-1;
    window[moneda_actual].pop();
 });

async function traer_data(){
    moneda_actual = $("#moneda .tabs a.active").attr('id');
    $('#tabla1').removeClass('invisible');
    $('#tabla_'+moneda_actual).removeClass('invisible');
    $('#aceptar').prop('disabled', true);
    //Se llama al método de crear la tabla, se le envían dos arreglos, parametros y etiquetas.
    let parametros = ["receptor","seleccion","cifras","signo"];
    let extras = {"monto":0,"limite":1000};
    //parametros,  extras, moneda, comando/id 
    console.log(window[moneda_actual].size());
    console.log(COP.size());
    if(window[moneda_actual].size()<1){
        window[moneda_actual].push(await gestor.consulta(parametros,extras, moneda_actual,"monitoreo_de_loterias"));
    }
    console.log("test de peek()");
    let tabla_info = {"stack":window[moneda_actual],
        "parametros":parametros,
        "moneda":moneda_actual,
        "titulo":"Monitoreo de Loterias",
        "modal_id":window[moneda_actual].modal_id
    }
    console.log(window[moneda_actual]);
    gestor.montar_tabla(tabla_info,window[moneda_actual]);
    console.log(window[moneda_actual]);
}

//Doble Click
$(document).on('dblclick', 'td', async function () {
    let column=$(this).parent().children().index(this);
    let row = $(this).closest("tr"); 
    window[moneda_actual] = await gestor.event_dclick(window[moneda_actual],row,column,base);
});
$(document).on('contextmenu', 'td', function (e) {

    let stack = window[moneda_actual].peek();
    if(stack.settings.is_rclick){
        let rclick = stack.settings.rclick;
        let row = $(this).closest("tr"); 
        var elementos=rclick[0].datos.items;
        let html = ``;

        for (let i = 0; i < elementos.length; i++) {
           html+=gestor.abrirMenu(elementos[i]);
            
        }
        $("#menuTabla_"+moneda_actual).html(html);
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
        $("#menuTabla_"+moneda_actual).css({
            display: "block",
            top: top,
            left: left
        });

        // window[moneda_actual] = await gestor.event_dclick(window[moneda_actual],row,column,base);
    }

    return false; 

});