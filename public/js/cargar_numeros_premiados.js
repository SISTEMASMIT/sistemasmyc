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
var row_act;
var col_act;

$(document).ready(function () {
    
    //Se realiza la generación de la tabla invisible, enviandose el ID de la table
    monedas = gestor.consultar_monedas();
    ini_tabla('#moneda',monedas);
    moneda_actual = $("#moneda .tabs a.active").attr('id');
    window[moneda_actual] = new Stack(moneda_actual,1);
    
    //Se inicializan las fechas
    // fecha.rangeDate = #f1f2 antiguos
    // fecha.futuDate = #f1f2 futuros
    // fecha.oneDate = #f1 unica

    fecha.oneDate("#f1");
});


//Ocultar El modal
$(document).on('hidden.bs.modal', '#modal_edit', function() {
    $("#modal_edit").removeClass("show1");
  
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



$(document).on('click', '#cargar_numeros_premiados', function() {
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
    let parametros = ["f1","estado_loteria_premio","loteria_mix","producto"];
    let extras = {};
    //parametros,  extras, moneda, comando/id 
    if(window[moneda_actual].size()<1 || boton==true){
        window[moneda_actual].push(await gestor.consulta(parametros,extras, moneda_actual,"cargar_numeros_premiados"));
    }
    let tabla_info = {"stack":window[moneda_actual],
        "parametros":parametros,
        "moneda":moneda_actual,
        "titulo":"Cargar Números Premiados",
        "modal_id":window[moneda_actual].modal_id
    }
    gestor.montar_tabla(tabla_info,window[moneda_actual],"editable");
}


//Doble Click
$(document).on('dblclick', 'td', async function () {
    let column=$(this).parent().children().index(this);
    row = $(this).closest("tr"); 
    window[moneda_actual] = await gestor.event_dclick(window[moneda_actual],row,column,base);
});

//Boton de premiar

$(document).on('click','td', function(){
  
    var column = $(this).parent().children().index(this);
    var currentRow = $(this).closest("tr");
    col_act = column;
    row_act = $('#tabla1').DataTable().row( this ).index();
    
    if(column=="0"){
        $("#load_"+moneda_actual).addClass('spinner');
        let have_sig = $('#tabla_'+moneda_actual).DataTable().row(currentRow).data()[8];
        let html=`<label>Loteria: `+$('#tabla_'+moneda_actual).DataTable().row(currentRow).data()[2]+`</label>`;
        if(have_sig=="NO"){
            html +=`<input class="form-control form-control-lg espaciadoB" type="numeric" maxlength="4" id="num_prem" placeholder="Número a premiar" required>`;
        }else if(have_sig=="SI"){
            html +=`<input class="form-control form-control-lg espaciadoB" type="numeric" maxlength="4" id="num_prem" placeholder="Número a premiar" required>`;
        }else{
            html +=`<input class="form-control form-control-lg espaciadoB" type="numeric" maxlength="4" id="num_prem" placeholder="Número a premiar" required>`;
        }
        // html +=`<label>Signo:`+have_sig+`</label>`;
        if(have_sig=="SI"){
            html+=`<select class='selectpicker' data-live-search='true' id="signo">`
            html+=`
            <option value='' selected></option>
            <option value='ARI' >Aries</option>
            <option value='TAU' >Tauro</option>
            <option value='GEM' >Géminis</option>
            <option value='CAN' >Cáncer</option>
            <option value='LEO' >Leo</option>
            <option value='VIR' >Virgo</option>
            <option value='LIB' >Libra</option>
            <option value='ESC' >Escorpio</option>
            <option value='SAG' >Sagitario</option>
            <option value='CAP' >Capricornio</option>
            <option value='ACU' >Acuario</option>
            <option value='PIC' >Piscis</option>
            `
            html+=`</select>`;
        }
        $("#body_modal").html(html);
        $('#signo').selectpicker({noneSelectedText: 'Seleccione un Signo'});
        $('#signo').selectpicker('refresh');
        $("#modal_edit").modal('show');
        $("#modal_edit").addClass("show1"); 
        $("#load_"+moneda_actual).removeClass('spinner');
       
}

    
})


$(document).on('click','#modal_save', async function(){
    let num = $("#num_prem").val();
    let loteria = $('#tabla_'+moneda_actual).DataTable().row(row_act).data()[2];
    // $("#tabla1").DataTable().cell(row_act, 3).data(num);
    let have_sig = $('#tabla_'+moneda_actual).DataTable().row(row_act).data()[8];
    let signo='';
    if(have_sig=="SI"){
        signo = $('#signo').selectpicker('val');
        // $("#tabla1").DataTable().cell(row_act, 4).data(signo);
    }
    let f1 = $('#f1').data('daterangepicker').startDate.format('YYYYMMDD');
    let f1V = $('#f1').data('daterangepicker').startDate.format('DD/MM/YYYY');
    var $tr = $($('#tabla_'+moneda_actual).DataTable().row(row_act).node());
    var $checkbox = $tr.find('td:first-child');
   

    $("#modal_edit").modal('hide');
    $("#modal_edit").removeClass("show1"); 
    $("#load_"+moneda_actual).addClass('spinner');

    let data = {"loteria":loteria,"numero_vendido":num,"loteria":loteria,"f1":f1,"signo_unico":signo,"comando":"premiar"};
    var info =  await ajax_peticion("/query/standard_query", {'data': JSON.stringify(data)}, "POST");
    Swal.fire({
        title: '',
        text: info.data.mensaje,
        icon: 'warning',
        confirmButtonText: 'Aceptar'
      })
      
      let parametros = ["f1","estado_loteria_premio","loteria_mix","producto"];
      let extras = {};
      let tabla_info = {"stack":window[moneda_actual],
        "parametros":parametros,
        "moneda":moneda_actual,
        "titulo":"Cargar Números Premiados",
        "modal_id":window[moneda_actual].modal_id
    }
    gestor.montar_tabla(tabla_info,window[moneda_actual],"editable");

    $("#load_"+moneda_actual).removeClass('spinner');
    
});