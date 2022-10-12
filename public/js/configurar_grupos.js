
import {ini_tabla} from "./table_ini.js";
import {Stack} from './stack.js';
import * as gestor from "./gestor.js";  
import { construir_modal,crear } from "./contruir_peticion_formularios_emergentes.js";
import {ajax_peticion} from "./Ajax-peticiones.js";
var monedas=[];
var moneda_actual;
var stack = new Stack();
var base="#base";
var modal_id = 1;
var boton=false;
var row;
var id_menu;

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



$(document).on('click', '#configurar_grupos_agencias', function() {
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
    let parametros = ["receptor","f1f2","ventas_a_mostrar"];
    let extras = {};
    //parametros,  extras, moneda, comando/id 
    if(window[moneda_actual].size()<1 || boton==true){
        window[moneda_actual].push(await gestor.consulta(parametros,extras, moneda_actual,"configurar_grupos_agencias"));
    }
    let tabla_info = {"stack":window[moneda_actual],
        "parametros":parametros,
        "moneda":moneda_actual,
        "titulo":"Reporte de Ventas Global",
        "modal_id":window[moneda_actual].modal_id
    }
    gestor.montar_tabla(tabla_info,window[moneda_actual],"elimitable");
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

//Funcion para ejecutar el OnChange de F3 cuando sea por meses
$(document).on("change","#f3",async function(){
    let ano = $(this).selectpicker("val");
    $("#load_"+moneda_actual).addClass('spinner');
    window[moneda_actual] = await gestor.event_change(window[moneda_actual],base,ano);

});


/// modificaciones

//agregar
$(document).on("click", "#agregar", async function () {
    let data = { "comando": "", "orden": $(this).attr("data-orden") };
    let info = await ajax_peticion("/query/standard_query", { 'data': JSON.stringify(data) }, "POST");
    let formulario = JSON.parse(info.settings["jsr"]);
    let html="";
    modal_id++;
    let modal = $(base).children().first().html().replaceAll("{}", modal_id);
    let modalsplit = modal.split("*");
    let titulo = '';
    let jstree = false;
//modales anidados
    // if ($(base).children().length > 1) {
    //     if(botones_emergente.length>0){
    //             let info = await ajax_peticion("/query/standard_query", { 'data': contruir(botones_emergente) }, "POST");
    //             if(info.data.mensaje=="ok"){
    //                 Swal.fire({
    //                     title: titulo_ventana,
    //                     text: info.data.mensaje,
    //                     icon: 'success',
    //                     confirmButtonText: 'Aceptar'
    //                   });
    //             }else{
    //                 Swal.fire({
    //                     title: titulo_ventana,
    //                     text: info.data.mensaje,
    //                     icon: 'error',
    //                     confirmButtonText: 'Aceptar'
    //                   });
    //             }
                
    //     }
    //     $(base).children().last().removeClass("show");
    // }
    if (formulario.filtros != undefined) {
        ({html,botones_emergente,titulo_ventana,titulo} =await construir_modal(formulario,botones_emergente,titulo_ventana,titulo));
        modalsplit[1] = html
        modal = modalsplit.join("");
        modal = modal.replaceAll("#", titulo);
        $(base).append(modal);
        if (jstree) {
            pintarJstree("#base #modal" + modal_id + " #folder_jstree")
        }
        formulario.filtros.forEach((element, index) => {
            if(element.tipo.includes("select")){
                element.datos.id=element.datos.id==undefined?element.label.toLowerCase().replaceAll(" ","_"):element.datos.id;
                $("#"+ element.datos.id).selectpicker("refresh");
            }
        })
        
        if ($(base).children().length > 1) {
            $(base).children().last().modal("show");
            $(base).children().last().addClass("fade");
            $(base).children().last().addClass("show1");
        }
    }
});

$(document).on("click","#agregar_grupo", function(){
    crear(botones_emergente,titulo_ventana);
});


//Botones

$(document).on('click','td',async function(){
  
    var column = $(this).parent().children().index(this);
    var currentRow = $(this).closest("tr");
    let col_act = column;
    let row_act = $('#tabla_'+moneda_actual).DataTable().row( this ).index();
    let grupo= $('#tabla_'+moneda_actual).DataTable().row(currentRow).data()[2];
    let grupos_list=window[moneda_actual].peek();
    grupos_list=grupos_list.data.data;
    let html_select = `<div style="height: 300px;"><select class='selectpicker' id='n_grupo'>`
    grupos_list.forEach((grupo,i)=>{
        html_select+=`<option value='`+grupo.grupo+`' >`+grupo.grupo+`</option>`;
    })
    html_select+=`</select></div>`;
    if(column=="0"){
        Swal.fire({
            title: '<strong>Grupo: '+grupo+'</strong>',
            icon: 'info',
            html:
              `Seleccione un grupo para reemplazar en las agencias que pertenecían a `+grupo+` <br>`+html_select,
            showCloseButton: true,
            showCancelButton: true,
            focusConfirm: false,
            confirmButtonText:
              ' Eliminar',
            cancelButtonText:
              '<i class="fa fa-thumbs-down">Cancelar</i>',
          }).then(async (result)  =>{
            let grupo_new = $('#n_grupo').selectpicker('val');
            if (result.isConfirmed) {
                let data = {"comando":"cfg_grup_eli","c0":grupo,"grupo":grupo_new}
                let info = await ajax_peticion("/query/standard_query", { 'data': JSON.stringify(data) }, "POST");
                if(info.data.mensaje=='ok'){
                    Swal.fire('Eliminado!', '', 'success')
                    traer_data();
                }
            }

          })
          $('#n_grupo').selectpicker({noneSelectedText : 'Seleccione'});

          

    }else if(column==1){
        let data = { "comando": "", "orden": $(this).attr("data-orden") };
        let info = await ajax_peticion("/query/standard_query", { 'data': JSON.stringify(data) }, "POST");
        let grupo = $('#tabla_'+moneda_actual).DataTable().row(currentRow).data()[2];
        let rec = $('#tabla_'+moneda_actual).DataTable().row(currentRow).data()[4];
        let detalle = $('#tabla_'+moneda_actual).DataTable().row(currentRow).data()[3];
        let html=""
        html+=`
        <div class='col-12 col-sm-6 col-md-4 col-lg-3 col-xl-3'><label class='form-label'>Grupo</label>
    <input type='text' class='form-control form-control-lg' id='grupo_input' value='`+grupo+`'>
    </div>`;
    html+=`<div class='col-12 col-sm-6 col-md-4 col-lg-3 col-xl-3'><label class='form-label'>Detalle</label>
    <input type='text' class='form-control-lg' id='detalle_input' value='`+detalle+`'>
    </div>
    `;
    Swal.fire({
        title: '<strong>Receptor: '+rec+'</strong>',
        icon: 'info',
        html: html,
        showCloseButton: true,
        showCancelButton: true,
        focusConfirm: false,
        confirmButtonText:
          ' Guardar',
        cancelButtonText:
          '<i class="fa fa-thumbs-down">Cancelar</i>',
      }).then(async (result)  =>{
        let grupo_new = $('#grupo_input').val();
        let detalle = $('#detalle_input').val();
        if (result.isConfirmed) {
            let data = {"comando":"cfg_grup_modi","c0":grupo,"grupo":grupo_new,"c1":detalle,"c2":rec}
            let info = await ajax_peticion("/query/standard_query", { 'data': JSON.stringify(data) }, "POST");
            if(info.data.mensaje=='Datos Actualizados'){
                Swal.fire('Editado!', '', 'success')
                traer_data();
            }
        }

      })
      
        

    
}
    
})


