import * as fecha from "./date.js";
import {ajax_peticion} from "./Ajax-peticiones.js";
import {ini_tabla} from "./table_ini.js";
import {Stack} from './stack.js';
import * as gestor from "./gestor.js";
import {crear_tabla} from "./table2.js";

var monedas=[];
var moneda_actual;
var stack = new Stack();
var base="#base";
var modal_id = 1;
var boton=false;
var row;
var id_menu;
var prev_data=[];

$(document).ready(function () {
    
    //Se realiza la generación de la tabla invisible, enviandose el ID de la table
    monedas = gestor.consultar_monedas();
    ini_tabla('#moneda',monedas);
    moneda_actual = $("#moneda .tabs a.active").attr('id');
    window[moneda_actual] = new Stack(moneda_actual,1);
    
    //Se inicializan las fechas
    // fecha.rangeDate = f1f2 antiguos
    // fecha.futuDate = f1f2 futuros
    // fecha.oneDate = f1 unica

    fecha.oneDate('#f1');
});


//Detectamos el cambio de moneda en el tab
$(document).on("click", "#moneda .tabs .tab-list .tab", function(event) {
	event.preventDefault();

    boton=false;
    $(".tab").removeClass("active");
	$(".tab-content").removeClass("show");
	$(this).addClass("active");
	$($(this).attr('href')).addClass("show");
    moneda_actual = $("#moneda .tabs a.active").attr('id');

    var w = document.getElementById("tab-"+moneda_actual).clientWidth;
    var h = document.getElementById("tab-"+moneda_actual).clientHeight;
    h = h+500;
    
    
    //Este if es para comprobar si ya existe una pila de esa moneda
    if (window[moneda_actual].moneda != undefined) { 
    }else{
        window[moneda_actual] =  new Stack(moneda_actual,1)
    }
    if($('#nro_ticket').val()!=''){

        if($('#cod_agencia').selectpicker('val')!='Todos'){
            $("#carga_"+moneda_actual).addClass('carga');
            $("#carga_"+moneda_actual).width( w );
            $("#carga_"+moneda_actual).height( h );
            $("#load_"+moneda_actual).addClass('spinner');

            traer_data();

            $("#carga_"+moneda_actual).removeClass('carga');
            $("#load_"+moneda_actual).removeClass('spinner');
        }else{
            gestor.alerta('Seleccione una agencia','warning');
        }   
    }else{
        gestor.alerta('Introduzca un número','warning');
    }
});



$(document).on('click', '#anular_ticket', function() {
    if($('#nro_ticket').val()!=''){
        if($('#cod_agencia').selectpicker('val')!='Todos'){
            boton=true;
            traer_data();
        }else{
            gestor.alerta('Seleccione una agencia','warning');
        }
    }else{
        gestor.alerta('Introduzca un número','warning');
    }
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

 //Trae la data de acuerdo a los parametros iniciales
async function traer_data(){
    moneda_actual = $("#moneda .tabs a.active").attr('id');
    $('#tabla1').removeClass('invisible');
    $('#tabla_'+moneda_actual).removeClass('invisible');
    //Se llama al método de crear la tabla, se le envían dos arreglos, parametros y etiquetas.
    let parametros = ["cod_agencia","nro_ticket"];
    let extras = {};
    let datos_manuales = ['c1','c2'];
    //parametros,  extras, moneda, comando/id 
    if(window[moneda_actual].size()<1 || boton==true){
        window[moneda_actual].push(await gestor.consulta(parametros,extras, moneda_actual,"anular_ticket",datos_manuales));
    }
    //Caso único para Anular Ticket
    modal_emergente(window[moneda_actual]);
}

function modal_emergente(stack_global){
    let titulo='Anular Ticket';
    let stack = stack_global.peek();
    prev_data.push($('#cod_agencia').selectpicker('val'));
    prev_data.push($.trim($('#nro_ticket').val()));
    let labels = {"Agencia":$('#cod_agencia').selectpicker('val'),"Ticket":$.trim($('#nro_ticket').val())}
    
    let btn = stack.settings.botones;
    let extra = stack.datos_extra;
    let keys = Object.getOwnPropertyNames(extra[0]).filter((x)=>{
        return x!="length"?x:"";
    });
    let valores= Object.values(extra[0]);
    stack_global.modal = stack_global.modal+1;
    let modal = $(base).children().first().html().replaceAll("{}",stack_global.modal);
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
    $('#tabla_'+stack_global.modal).removeClass('invisible');
    stack_global.push(stack);
    let stack2=gestor.extraer_settings(stack.settings);

    let table = {
        "parametro":stack.data,
        "tb":"#tabla_"+stack_global.modal,
        "hd":"#thead_"+stack_global.modal,
        "bd":"#tbody_"+stack_global.modal,
        "isd":stack2.is_dclick,
        "dc":stack2.dclick,
        "isr":stack2.is_rclick,
        "inv":[4],
        "sum":[2],
        "labels":[],
        "titulo":titulo,
        "modal":"#modal"+stack_global.modal,
        "moneda":stack_global.moneda
    }

    crear_tabla(table);
        
}

$(document).on('click', '.btn-danger', async function () {
    let stack_global = window[moneda_actual];
    let stack = stack_global.previous();
    $("#load_"+stack_global.moneda).addClass('spinner');
    let btn = stack.settings.botones;

    let data = [];
    let parametros = btn[0].datos.parametros.split(",");
    let comando2 = btn[0].datos.id;
    Object.assign(data,{"comando":comando2});
    for (let i = 0; i < parametros.length; i++) {
        Object.assign(data,{[parametros[i]]:prev_data[i]});
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
            gestor.alerta(mensaje,'error');
        }else{
            gestor.alerta(mensaje,'success');
        }
        $("#load_"+stack_global.moneda).removeClass('spinner');
      }
});


//Doble Click
$(document).on('dblclick', 'td', async function () {
    let column=$(this).parent().children().index(this);
    row = $(this).closest("tr"); 
    window[moneda_actual] = await gestor.event_dclick(window[moneda_actual],row,column,base);
});


//Click Derecho

$(document).on('contextmenu', 'td', function (e) {
    console.log(e.pageY);
    console.log(e.pageX);
    row = $(this).closest("tr"); 
    let stack = window[moneda_actual].peek();
    if(stack.settings.is_rclick){
        let rclick = stack.settings.rclick;
        let row = $(this).closest("tr"); 
        var elementos=rclick[0].datos.items;
        let html = ``;

        for (let i = 0; i < elementos.length; i++) {
           html+=gestor.abrirMenu(elementos[i]);
            
        }
        if($(base).children().length>1){
            id_menu=window[moneda_actual].modal;
        }else{
            id_menu=moneda_actual;
        }
        $("#menuTabla_"+id_menu).html(html);
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
        if(window[moneda_actual].modal>1){
            var top = e.pageY-100;
            var left = e.pageX-200;
        }

        $(this).css('box-shadow', 'inset 1px 1px 0px 0px red, inset -1px -1px 0px 0px red');
        $("#menuTabla_"+id_menu).css({
            display: "block",
            top: top,
            left: left
        });
    }
    return false; 
});

//Funcion para ocultar el menu cuando no se de click en el
$(document).click(function() {
    var obj = $("#menuTabla_"+id_menu);
    if (!obj.is(event.target) && !obj.has(event.target).length) {
        if ( $("#menuTabla_"+id_menu).css('display') == 'block' ){
            $("#menuTabla_"+id_menu).hide();
        }
        $('td').css('box-shadow', 'none');
    }else{
        $("#menuTabla_"+id_menu).hide();
        $('td').css('box-shadow', 'none');
    }
});

//Funcion para ocultar el menu cuando se clickee en un elemento

$("#menuTabla_"+id_menu+" a").on("click", function() {
    $(this).parent().hide();
});


//Funcion para ejecutar el click derecho seleccionado
$(document).on('click', '#rclick', async function () { 
    let data_id = $(this).attr("data-id");
    $("#load_"+moneda_actual).addClass('spinner');
    let column=$(this).parent().children().index(this);
    window[moneda_actual] = await gestor.event_rclick(window[moneda_actual],row,column,base,data_id);
});

//Funcion para ejecutar el OnChange de F3 cuando sea por meses
$(document).on("change","#f3",async function(){
    let ano = $(this).selectpicker("val");
    $("#load_"+moneda_actual).addClass('spinner');
    window[moneda_actual] = await gestor.event_change(window[moneda_actual],base,ano);

});


