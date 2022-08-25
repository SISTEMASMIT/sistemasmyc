// imports
import {ajax_peticion} from './Ajax-peticiones.js';
import {info} from "./info.js";


//Guardar Usuario
$('#formUsuarios').submit(function(e) {
    e.preventDefault(); 

    var usuario =[];

    nombre = $.trim($('#nombre_user').val());
    username = $.trim($('#usuario_ban').val());
    clave = $.trim($('#clave_ban').val());
    var xban = $.trim($('#codigo_ban').val());
    let indice = xban.indexOf(" ");
    var receptor = xban.substring(0, indice);
    telefono = $.trim($('#telefono').val());
    dias_consulta = $.trim($('#dia_con').val());
    dias_cargo = $.trim($('#dia_cargo').val());
    pagos_ajustes = $.trim($('#config2').val());
    estado_usuario = document.querySelector('#estado').checked;
    monitoreo = document.querySelector('#monitoreo').checked;
    permisos = $.trim($('#niveles').val());
    if(monitoreo==''){
        monitoreo='Off';
    }else{
        monitoreo='On';
    }
    if(estado_usuario==''){
        estado_usuario='Off';
    }else{
        estado_usuario='On';
    }
    usuario.push(nombre,username,clave,receptor,telefono,dias_consulta, dias_cargo, pagos_ajustes,estado_usuario,monitoreo,permisos);
});


$(document).on("click","#redirect",function(e){
    e.preventDefault();
    let url=this.getAttribute("data-url");
    window.location.href = url;
})
//Funcion para pintar los permisos según el grupo

$('th').dblclick(function() {
    alert($(this).text());
  });



$("th").on('contextmenu', function(e) {
	$('th').css('box-shadow', 'none');
  var top = e.pageY - 220;
  var left = e.pageX - 220;
  $(this).css('box-shadow', 'inset 1px 1px 0px 0px red, inset -1px -1px 0px 0px red');
  $("#menuTabla").css({
    display: "block",
    top: top,
    left: left
  });
  return false; 
  
});

$(".table").on("click", function() {
	if ( $("#menuTabla").css('display') == 'block' ){
  	    $("#menuTabla").hide();
    }
    $('th').css('box-shadow', 'none');
});

$("#menuTabla a").on("click", function() {
  $(this).parent().hide();
});