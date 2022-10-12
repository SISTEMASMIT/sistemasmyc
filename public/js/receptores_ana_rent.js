import * as fecha from "./date.js";
import {ajax_peticion} from "./Ajax-peticiones.js";
import {ini_tabla} from "./table_ini.js";
import {Stack} from './stack.js';
import * as gestor from "./gestor.js";
import * as g from "./graficos.js";


var monedas=[];
var moneda_actual;
var stack = new Stack();
var base="#base";
var modal_id = 1;
var boton=false;
var row;
var id_menu;
var modal_grafos = "#modal_graficos";
var graf_activo=false;

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



$(document).on('click', '#receptores_analisis_de_rentabilidad', function() {
    boton=true;
    traer_data();
});


//Ocultar El modal
$(document).on('hidden.bs.modal', '#base', function() {
    if(graf_activo){
    }else{
        $(base).children().last().remove();
        if($(base).children().length>1){
            $('.modal-backdrop').addClass('show');
            $(base).children().last().addClass("fade");
            $(base).children().last().addClass("show");
        }
        window[moneda_actual].modal=window[moneda_actual].modal-1;
        window[moneda_actual].pop();
    }
 });


 $(document).on('hidden.bs.modal', '#modal_graficos', function () {

    $(modal_grafos).removeClass("show1");
    graf_activo=false;
    $('#graficos').html('');
    if ($(base).children().length > 1) {
        $(base).children().last().modal("show");
        $('.modal-backdrop').addClass('show');
    }
});


 //Trae la data de acuerdo a los parametros iniciales
async function traer_data(){
    moneda_actual = $("#moneda .tabs a.active").attr('id');
    $('#tabla1').removeClass('invisible');
    $('#tabla_'+moneda_actual).removeClass('invisible');
    $('#aceptar').prop('disabled', true);
    //Se llama al método de crear la tabla, se le envían dos arreglos, parametros y etiquetas.
    let parametros = ["receptor","f1f2","orden"];
    let extras = {};
    //parametros,  extras, moneda, comando/id 
    if(window[moneda_actual].size()<1 || boton==true){
        window[moneda_actual].push(await gestor.consulta(parametros,extras, moneda_actual,"receptores_analisis_de_rentabilidad"));
    }
    let tabla_info = {"stack":window[moneda_actual],
        "parametros":parametros,
        "moneda":moneda_actual,
        "titulo":"Reporte de Ventas Global",
        "modal_id":window[moneda_actual].modal_id
    }
    gestor.montar_tabla(tabla_info,window[moneda_actual]);
}


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


$(document).on("click", "#graficos_analisis_de_rentabilidad", function () {
   
    if(window[moneda_actual].size()<1){
        gestor.alerta('Primero debe generar información en la tabla','warning');
    }else{
        let data_actual = window[moneda_actual].peek();
        let graficos = data_actual.settings.graficos;
        data_actual = data_actual.data.data;
        if (data_actual != undefined && data_actual.length > 0) {
            let datos_graficos = data_actual.map(elemento => Object.values(elemento))
            let columnas_graficos = graficos.datos.c_graficos.split(",");
            let columnas_tipos = graficos.datos.tipos.split(",");
            let title=graficos.datos.etiquetas.split(",");
            //aqui empiezo el tratamiento de datos para tener los datos de cada grafica y eliminar los que no me interesan
            datos_graficos = datos_graficos.map((d) => {
                d = d.filter((elemento, index) => {
                    if (columnas_graficos.find(f => parseInt(f) == index) != undefined) {
                        return elemento;
                    }
                })
                if (d.length < columnas_graficos.length) {
                    let lleno = Array(columnas_graficos.length)
                    lleno.fill(0)
                    lleno = lleno.map((l, i) => {
                        if (d[i] != undefined) {
                            return d[i]
                        } else {
                            return l
                        }
                    })
                    d = lleno;
                }
                return d;
            })
            let datos_finales=Array(columnas_graficos.length);
            datos_finales.fill(0)
        datos_finales=datos_finales.map((e,i) => {
                return datos_graficos.map(k => k[i])
            })
            let lab=datos_finales.shift();
            let div_graficos=$("#graficos");
            columnas_tipos.forEach(async (e,i)=>{
                div_graficos.append(`<div class="col-12 col-sm-6 col-md-4 col-lg-4 col-xl-4 grafo" ><canvas id='${e+i.toString()}'></canvas></div>`)
                let config={
                    "type":e,
                    "data": await g[e](lab,datos_finales[i],title[i],title[i],e)
                }
                new Chart(
                    $("#graficos #"+e+i.toString()),
                    config
                );
            }) 
            if ($(base).children().length > 1) {
                $(base).children().last().modal("hide");
            }
            $(modal_grafos).modal("show");
            $(modal_grafos).addClass("show1");
            graf_activo=true;
        } else {
            gestor.alerta('No existen datos','error');
        }
    }
})

