import * as fecha from "./date.js";
import {ini_tabla} from "./table_ini.js";
import {Stack} from './stack.js';
import * as gestor from "./gestor.js";  

import {ajax_peticion} from "./Ajax-peticiones.js";

var monedas=[];
var moneda_actual;
var stack = new Stack();
var base="#base";
var modal_id = 1;
var boton=false;
var row;
var id_menu;
var seleccionados=[];



window["receptor"] ="";
var botones_emergente=[];
var parametros_emergentes=[];
var titulo_ventana="";

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
    $("#act-desc-multiple").addClass('invisible');
    
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


$(document).on('click', '#act-desc-multiple', function() {
    boton=true;

      // Iterate over all checkboxes in the table
      var rows_selected = $('#tabla_COP').DataTable().column(0).checkboxes.selected();

      // Iterate over all selected checkboxes
      $.each(rows_selected, function(index, rowId){
        console.log(rowId);
      });
});

 //Trae la data de acuerdo a los parametros iniciales
// async function traer_data(){
//     moneda_actual = $("#moneda .tabs a.active").attr('id');
//     $('#tabla1').removeClass('invisible');
//     $('#tabla_'+moneda_actual).removeClass('invisible');
//     $('#aceptar').prop('disabled', true);
//     Se llama al método de crear la tabla, se le envían dos arreglos, parametros y etiquetas.
//     let parametros = ["receptor","f1f2","ventas_a_mostrar"];
//     let extras = {};
//     //parametros,  extras, moneda, comando/id 
//     if(window[moneda_actual].size()<1 || boton==true){
//         window[moneda_actual].push(await gestor.consulta(parametros,extras, moneda_actual,"act-desc-multiple_acepta"));
//     }
//     let tabla_info = {"stack":window[moneda_actual],
//         "parametros":parametros,
//         "moneda":moneda_actual,
//         "titulo":"Reporte de Ventas Global",
//         "modal_id":window[moneda_actual].modal_id
//     }
//     gestor.montar_tabla(tabla_info,window[moneda_actual]);
// }


//Doble Click
$(document).on('click', 'td', async function () {
    let column=$(this).parent().children().index(this);
    row = $(this).closest("tr"); 
    
    let item=row.find("td").eq(1).text();
    if(row.hasClass('selected')){
        seleccionados = seleccionados.filter(function(x) {
            return x !== item
            
        })
        row.removeClass('selected');
    }else{
        row.addClass('selected');
        seleccionados.push(row.find("td").eq(1).text());
    }
    console.log(seleccionados);
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



//Seleccionar todos
$(document).on('click',  '#select-all', function(){
    // Check/uncheck all checkboxes in the table
    var rows = $('#tabla_'+moneda_actual).rows({ 'search': 'applied' }).nodes();
    $('input[type="checkbox"]', rows).prop('checked', this.checked);
 });


/// modificaciones
$(document).on("change","#operacion",function(){
    if($(this).selectpicker("val")=="max_deu"){
        $("#monto").attr("style","display:block")
    }else{
        $("#monto").attr("style","display:none")
    }
})

$(document).on("change","#receptor",async function(){
    let receptores=$(this).selectpicker().val();
    let data={"receptor":receptores,"comando":"get_age_multi"};
    var info =  await ajax_peticion("/query/standard_query", {'data': JSON.stringify(data)}, "POST");
    if(info.data.data.length ==  0){
        Swal.fire({
            title: '',
            text: "Este receptor no tiene Agencias",
            icon: 'warning',
            confirmButtonText: 'Aceptar'
          });
    }else{

    moneda_actual = $("#moneda .tabs a.active").attr('id');
    $('#tabla1').removeClass('invisible');
    $('#tabla_'+moneda_actual).removeClass('invisible');
    $('#aceptar').prop('disabled', true);
    let parametros = ["receptor"];
    let extras = {};
    //parametros,  extras, moneda, comando/id 
    if(window[moneda_actual].size()<1 || boton==true){
        window[moneda_actual].push(await gestor.consulta(parametros,extras, moneda_actual,"get_age_multi"));
    }
    let tabla_info = {"stack":window[moneda_actual],
        "parametros":parametros,
        "moneda":moneda_actual,
        "titulo":"Reporte de Ventas Global",
        "modal_id":window[moneda_actual].modal_id
    }
    gestor.montar_tabla(tabla_info,window[moneda_actual],"checkeable");
    $("#act-desc-multiple").removeClass('invisible');
    }
});
