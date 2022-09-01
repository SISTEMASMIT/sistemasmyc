import {ajax_peticion} from './Ajax-peticiones.js';

$( document ).ready(function() {
    $('#modalInactividad').modal("show");
});


$(document).on("submit","#confirmacion", async function(e) {
    e.preventDefault(); 

    var clave =  $('#clave').val();
    var datos = {"clave":clave};
    var receive =  await ajax_peticion("/inactividad/comprobacion", {'datos': JSON.stringify(datos)}, "POST");
    if(receive=="1"){
        window.location.href=window.location.origin+"/home";
    }else{
        $('#msgReg').html('<p>¡Clave Invalida!</p>');
        setTimeout(function(){
            window.location.href=window.location.origin+"/logout/logout";
        }, 2000);
        
    }

});