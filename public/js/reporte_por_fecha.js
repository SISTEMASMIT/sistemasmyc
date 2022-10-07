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

    fecha.rangeDate("#f1f2");
    cargaAdicional();
});


function cargaAdicional(){
    let productos = $('#producto_loteria');
    productos.prepend(`<option value="todos">Todos</option>`)
    productos.selectpicker("refresh");
    productos.val("todos");
    productos.selectpicker("render")
    let loterias = $('#loteria');
    loterias.prepend(`<option value="todas">Todas</option>`)
    loterias.selectpicker("refresh");
    loterias.val("todas");
    loterias.selectpicker("render")
    let grupos = $('#grupo_agencias');
    grupos.prepend(`<option value="todos">Todos</option>`);
    grupos.selectpicker("refresh");
    grupos.val("todos");
    grupos.selectpicker("render")
    $("#agencia").val($("#agencia option:first").val("todas"));
    $("#agencia").val($("#agencia option:first").html("Todas"));
    $("#agencia").val("todas");
    $("#agencia").selectpicker("render")
    $("#agencia").selectpicker("refresh");

 }

 

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
    $("#carga_"+moneda_actual).addClass('carga');
    $("#carga_"+moneda_actual).width( w );
    $("#carga_"+moneda_actual).height( h );
    $("#load_"+moneda_actual).addClass('spinner');

    
    //Este if es para comprobar si ya existe una pila de esa moneda
    if (window[moneda_actual].moneda != undefined) { 
    }else{
        window[moneda_actual] =  new Stack(moneda_actual,1)
    }
    traer_data();

    $("#carga_"+moneda_actual).removeClass('carga');
    $("#load_"+moneda_actual).removeClass('spinner');
});



$(document).on('click', '#reporte_por_fecha', function() {
    boton=true;
    traer_data();
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
    $('#aceptar').prop('disabled', true);
    //Se llama al método de crear la tabla, se le envían dos arreglos, parametros y etiquetas.
    let parametros = ["receptor","agencia","loteria","grupo_agencias","producto_loteria","f1f2"];
    let extras = {};
    //parametros,  extras, moneda, comando/id 
    if(window[moneda_actual].size()<1 || boton==true){
        window[moneda_actual].push(await gestor.consulta(parametros,extras, moneda_actual,"reporte_por_fecha"));
    }
    let tabla_info = {"stack":window[moneda_actual],
        "parametros":parametros,
        "moneda":moneda_actual,
        "titulo":"Reporte por Fecha",
        "modal_id":window[moneda_actual].modal_id
    }
    gestor.montar_tabla(tabla_info,window[moneda_actual]);
}


//Doble Click
$(document).on('dblclick', 'td', async function () {
    let column=$(this).parent().children().index(this);
    row = $(this).closest("tr"); 
    window[moneda_actual] = await gestor.event_dclick(window[moneda_actual],row,column,base);
    prev_data.push(row.find("td").eq(2).text());
    prev_data.push(row.find("td").eq(4).text());
});


//Click Derecho

$(document).on('contextmenu', 'td', function (e) {
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

// aqui se agrega este metodo debido a que la agencia es dependiente de receptor
$(document).on("change","#receptor",async function(){
    let receptores=$(this).selectpicker().val();
    let data={"receptor":receptores,"comando":"age_rece"};
    var info =  await ajax_peticion("/query/standard_query", {'data': JSON.stringify(data)}, "POST");
    if(info.data.data.length ==  0){
        gestor.alerta('Este receptor no tiene agencias','warning');
        let agencias=$("#agencia");
        agencias.html("");
        agencias.selectpicker("refresh");
    }else{
        let agencias=$("#agencia");
        agencias.html(generarHtml(info.data.data));
        agencias.selectpicker("refresh");
        agencias.val("todas");
        agencias.selectpicker("render")
    }
});


// funcion para generar el html del select 
function generarHtml(list){
    let html=""
    list.forEach(function(element,index){
        if(index==0){
            html+=`<option value="todas">Todas</option>`;
            html+=`<option value="${element.codigo_age}">${element.nombre_age}</option>`;
        }else{
            html+=`<option value="${element.codigo_age}">${element.nombre_age}</option>`;
        }
    });
    return html;
}


$(document).on('click', '.btn-danger', async function () {
    let stack_global = window[moneda_actual];
    let stack = stack_global.peek();
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
        }else if(mensaje.includes("no puede")){
            gestor.alerta(mensaje,'error');
        }else{
            igestor.alerta(mensaje,'success');
        }
        $("#load_"+stack_global.moneda).removeClass('spinner');
      }
});
