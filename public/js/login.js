
    import {ajax_peticion} from "./Ajax-peticiones.js";
    import {nav_data} from "./info.js";


function reactivar(){
    $('#modalActivar').modal("show");
    $('#usuarioA').html('<label id="usuario">'+$('#usuario').val()+'</label>');    
}

$('#reactivar').submit(async function(e){
    e.preventDefault();
    var usuario = [];
    var user = $.trim($('#usuario').val());
    var codigo = $.trim($('#codigoActivar').val());
    let ls = nav_data();
    usuario = {"username":user, "codigo":codigo,"ls":ls};
    var info =  await ajax_peticion("/login/activarUsuario", {'usuario': JSON.stringify(usuario)}, "POST");

    if(info.e == '1'){
        $('#activarUser').addClass('invisible');
        $('#cancelarActivarUser').html('Cerrar');
        $('#msgAct').html('<p>¡Usuario Activado Correctamente, en segundos podrás intentar nuevamente!</p>');
        setTimeout(function(){
            window.location.href = "/";
        }, 5000);
    }else if(info.e=="0"){
        $('#msgAct').html('<p class="invalido">¡Código inválido, intente después!</p>');
    }else{
        console.log(info.e);
    }
});


$('#formLogin').submit(async function(e) {
    e.preventDefault(); 
    var usuario =[];
    var user = $.trim($('#usuario').val());
    var clave = $.trim($('#clave').val());

    let ls = nav_data();
    usuario = {"username":user, "clave":clave,"ls":ls};
 
    var info =  await ajax_peticion("/login/iniciarSesion", {'usuario': JSON.stringify(usuario)}, "POST");
    if(info.e == 'undefined'){
       window.location.href = "/home"; 
    }else if(info.e =='1'){
       window.location.href = "/home"; 
    }else if(info.e=="0"){
        if(info.mensaje=="Google Aut"){
            document.getElementById("imgQr").src = info.url;
            $('#modalQR').modal("show");
        }
        else if(info.mensaje=="Usuario Desactivado"){
            $('#invalido').html('<p>¡Usuario Desactivado por múltiples fallos de sesión!</p><button type="button" id="reactiva" class="btn btn-secondary waves-effect" onclick="reactivar()">Reactivar Usuario</button><br>');
        }else if(info.mensaje=="Usuario Suspendido"){
            $('#invalido').html('<p>¡Usuario Suspendido!</p><a href="#">Reactivar Usuario</a>');
        }else if(info.mensaje=="Banca Inactiva"){
            $('#invalido').html('<p>¡Esta Banca se encuentra inactiva!</p><a href="#">Reactivar Usuario</a>');
        }else{
            $('#invalido').html('<p>¡Su usuario o clave son inválidos, intente nuevamente!</p>');
        }   
        console.log("Error "+info.mensaje);
    }else if(info.e="2"){
        $('#modalNav').modal("show");
    }else{
    }

});


$(document).on('click', '#mostrarQr', function() {
    $('.labelCodeQr').removeClass("labelCodeQr");
    $('.inputCodeQr').removeClass("inputCodeQr");
    $('#imgQr').removeClass("imgQr");
    $('.labelQr').addClass('invisible');
    $('#mostrarQr').addClass('invisible');

});


//Primer Login Pasó
$('#registroP').submit(async function(e) {
    e.preventDefault(); 
    var recordarNavegador = document.querySelector('#recordar2').checked;
    if(recordarNavegador==''){
        recordarNavegador='Off';
    }else{
        recordarNavegador='On';
    }
    var usuario =[];
    var userP = $.trim($('#usuario').val());
    var clave = $.trim($('#clave').val());
    var equipo = $.trim($('#nombreEquipo1').val());
    var temporalidad = recordarNavegador;
    var codigo = $.trim($('#inputCodeQr').val());
    var claveNueva = $.trim($('#nuevaClave').val());
    let partes = [];
    for(var i=0; i< equipo.length; i = fin){
        var inicio = i;
        var fin = i+ equipo.length/3;
        partes.push(equipo.substring(inicio,fin));
    }
    localStorage.setItem('UserAgent',  btoa(partes[0]));
    localStorage.setItem('Local',  btoa(partes[1]));
    localStorage.setItem('Net',  btoa(partes[2]));

    if (localStorage.getItem("UserAgent") !== null) {
        let ls = [];
        ls.push(localStorage.getItem('UserAgent'));
        ls.push(localStorage.getItem('Local'));
        ls.push(localStorage.getItem('Net'));

        usuario = {"username":userP, "clave":clave, "claveNueva":claveNueva, "equipo":equipo, "temporalidad":temporalidad,"codigo":codigo,"ls":ls};
        console.log(usuario);
        var confirmar =  await ajax_peticion("/login/confirmarQr", {'usuario': JSON.stringify(usuario)}, "POST");

        if(confirmar.google.charAt(0)=="1"){
            if(confirmar.clave.charAt(0)=="1"){
                if(confirmar.equipo.charAt(0)=="1"){
                    $('#sesionAlerta').modal("show");
                    $('#modalQR').modal("hide");
                    $('#msgSesion').html("<p>Se han validado todos los datos, en breve puedes iniciar sesion con tu nueva clave.</p>");
                    setTimeout(function(){
                        window.location.href = "/home";
                    }, 5000);
                }else{
                    $('#msgQr').html("<p>Equipo Inválido.</p>");
                }
            }else{
                $('#msgQr').html("<p>Clave Inválida.</p>");
            }
        }else{
            $('#msgQr').html("<p>Código Inválido.</p>");
        }

    }
});



$('#navegador').submit(async function(e) {
    e.preventDefault(); 

    var recordarNavegador = document.querySelector('#recordar').checked;
    if(recordarNavegador==''){
        recordarNavegador='Off';
    }else{
        recordarNavegador='On';
    }
    var usuario =[];
    var user = $.trim($('#usuario').val());
    var clave = $.trim($('#clave').val());
    var equipo = $.trim($('#nombreEquipo').val());
    var temporalidad = recordarNavegador;
    var codigo = $.trim($('#codigo').val());
    let partes = [];
    for(var i=0; i< equipo.length; i = fin){
        var inicio = i;
        var fin = i+ equipo.length/3;
        partes.push(equipo.substring(inicio,fin));
    }
    localStorage.setItem('UserAgent',  btoa(partes[0]));
    localStorage.setItem('Local',  btoa(partes[1]));
    localStorage.setItem('Net',  btoa(partes[2]));

    if (localStorage.getItem("UserAgent") !== null) {
        let ls = [];
        ls.push(localStorage.getItem('UserAgent'));
        ls.push(localStorage.getItem('Local'));
        ls.push(localStorage.getItem('Net'));

        usuario = {"username":user, "clave":clave , "equipo":equipo, "temporalidad":temporalidad,"codigo":codigo,"ls":ls};

        var info =  await ajax_peticion("/login/registrarEquipo", {'usuario': JSON.stringify(usuario)}, "POST");

        if(info.e=='0'){
            $('#msgReg').html('<p>¡Código Inválido, intente nuevamente</p><br>');
        }else if(info.e=="3"){
            $('#alertaModal').modal("show");
            $('#modalNav').modal("hide");
            if(recordarNavegador=="On"){
                $('#msgRegNav').html("<p>Su navegador se registró Permanentemente.</p>");
            }else{
                $('#msgRegNav').html("<p>Su navegador se registró Temporalmente.</p>");
            }
            setTimeout(function(){
                window.location.href = "/home";
            }, 3000);
        }
    }
});

