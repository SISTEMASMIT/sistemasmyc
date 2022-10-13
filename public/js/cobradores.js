
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



$(document).on('click', '#cobradores', function() {
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
    let parametros = ['receptor'];
    let extras = {};
    //parametros,  extras, moneda, comando/id 
    if(window[moneda_actual].size()<1 || boton==true){
        window[moneda_actual].push(await gestor.consulta(parametros,extras, moneda_actual,"cobradores"));
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
    window[moneda_actual].modal = window[moneda_actual].modal + 1;
    let modal = $(base).children().first().html().replaceAll("{}", window[moneda_actual].modal);
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
            pintarJstree("#base #modal" + window[moneda_actual].modal + " #folder_jstree")
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

$(document).on("click","#agregar_cobrador", function(){
    crear(botones_emergente,titulo_ventana);
    traer_data();
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
            title: '¿Estas seguro?',
            text: "Que deseas Eliminar este cobrador!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si!',
            cancelButtonText: 'No!'
          }).then(async (result) => {
            if (result.isConfirmed) {
                let data={"c1":$('#tabla_'+moneda_actual).DataTable().row(currentRow).data()[3],"comando":"cfg_cobradore"}
                let info =await ajax_peticion("/query/standard_query", {'data': JSON.stringify(data)}, "POST");
                if(info.data.mensaje.includes("ok")){
                    gestor.alerta(info.data.mensaje,"success");
                }else{
                    gestor.alerta(info.data.mensaje,"error");
                }
            }
          })
    }else if(column==1){
        let data = { "comando": "", "orden":"modalEditarCobrador"};
        let info = await ajax_peticion("/query/standard_query", { 'data': JSON.stringify(data) }, "POST");
        let formulario = JSON.parse(info.settings["jsr"]);
        let html="";
        let titulo;
        let titulo_ventana;
        ({html,botones_emergente,titulo_ventana,titulo} =await construir_modal(formulario,botones_emergente,"Editar Cobrador","Editar"));
    Swal.fire({
        title: '<strong> Receptor : '+$('#tabla_'+moneda_actual).DataTable().row(currentRow).data()[2]+'</strong>',
        icon: 'info',
        html: html,
        willOpen:()=>{
            $("#c1").val($('#tabla_'+moneda_actual).DataTable().row(currentRow).data()[3])
            $("#nombre_co").val($('#tabla_'+moneda_actual).DataTable().row(currentRow).data()[4])
            $("#apellido_co").val($('#tabla_'+moneda_actual).DataTable().row(currentRow).data()[5])
            $("#direccion_co").val($('#tabla_'+moneda_actual).DataTable().row(currentRow).data()[6])
            $("#telefono_co").val($('#tabla_'+moneda_actual).DataTable().row(currentRow).data()[7])
        },
        showCloseButton: true,
        showCancelButton: true,
        focusConfirm: false,
        confirmButtonText:
          ' Guardar',
        cancelButtonText:
          '<i class="fa fa-thumbs-down">Cancelar</i>',
      }).then(async (result)  =>{
        if (result.isConfirmed) {
            let data = {"comando":"cfg_cobradorm","c0":$('#tabla_'+moneda_actual).DataTable().row(currentRow).data()[2],"c1":$("#c1").val(),"nombre_co":$("#nombre_co").val(),"apellido_co":$("#apellido_co").val(),"direccion_co":$("#direccion_co").val(),"telefono_co":$("#telefono_co").val()}
            let info = await ajax_peticion("/query/standard_query", { 'data': JSON.stringify(data) }, "POST");
            if(info.data.mensaje=='ok'){
                Swal.fire('Editado!', '', 'success')
                traer_data();
            }
        }

      })
      
        

    
}
    
})


