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
// this var it's for the jstree
var receptor;
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
    // fecha.rangeDate("#f1f2");

    //Jstree
    pintarJstree("#folder_jstree");


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



$(document).on('click', '#desact_receptor', function() {
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
    let parametros = ["serial_rec"];
    let extras = {"receptor":receptor};
    //parametros,  extras, moneda, comando/id 
    if(window[moneda_actual].size()<1 || boton==true){
        window[moneda_actual].push(await gestor.consulta(parametros,extras, moneda_actual,"desact_receptor"));
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

//Funcion para ejecutar el OnChange de F3 cuando sea por meses
$(document).on("change","#f3",async function(){
    let ano = $(this).selectpicker("val");
    $("#load_"+moneda_actual).addClass('spinner');
    window[moneda_actual] = await gestor.event_change(window[moneda_actual],base,ano);

});


/// modificaciones


///jstree 


async function pintarJstree(id){
    let data = {"comando":"get_rec_tree"};
    let info =  await ajax_peticion("/query/standard_query", {'data': JSON.stringify(data)}, "POST"); 
    info.data.data=JSON.parse(JSON.stringify(info.data.data).replaceAll("\"#\"","\"Todos\""));
    info.data.data[0].parent="#"
    $(id).jstree({
        'core': {
            'check_callback': true,
            "themes": { "stripes": true },
            'data': info.data.data,
            'multiple': true
        },
        "types" : {
            "root" : {
              "icon" : "fa-regular fa-building-lock"
            },
            "child" : {
                "icon" : "fa-regular fa-circle-user"
            }
        },
        'search': {
            'case_insensitive': true,
            'show_only_matches' : true
        },
        'plugins': [ 'types' ,'search'],
        'themes': {
            'theme': 'apple',
            "dots": true,
            "icons": true
        },
        'plugins': [ 'search','types', 'html_data', 'themes', 'ui']
    }).on('search.jstree', function (nodes, str, res) {
        if (str.nodes.length===0) {
            try{
                $('#search').jstree(true).hide_all();
            }catch(e){
                Swal.fire({
                    title: '',
                    text: "No existen receptores con este nombre",
                    icon: 'error',
                    confirmButtonText: 'Aceptar'
                  });
            }
        }
    }).on("select_node.jstree", function (e, data) {
        $(id).jstree().close_node($("#Todos"));
        receptor=data.node.id;
        pintarOnChangeAnidado(receptor,"#serial_rec")
         });
}


async function pintarOnChangeAnidado(r,selector){
    let data={"receptor":r,"comando":"get_seriales_rec"};
    var info =  await ajax_peticion("/query/standard_query", {'data': JSON.stringify(data)}, "POST");
    if(info.data.data.length ==  0){
        Swal.fire({
            title: '',
            text: "Este receptor no tiene Seriales",
            icon: 'warning',
            confirmButtonText: 'Aceptar'
          });
        let agencias=$(selector);
        agencias.html("");
        agencias.selectpicker("refresh");
    }else{
        let agencias=$(selector);
        agencias.selectpicker({noneSelectedText: 'Seleccione una serial'});
        agencias.html(generarHtml(info.data.data));
        agencias.selectpicker("refresh");
    }
}
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
