
    import {ajax_peticion} from "./Ajax-peticiones.js";
    import {nav_data} from "./info.js";

var strong = 0;
var strongN = 0;
$(document).on('click', '#reactivarUsuario', function() {
    $('#modalActivar').modal("show");
    $('#usuarioA').html('<label id="usuario">'+$('#usuario').val()+'</label>');    
});

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
    var token_google = $.trim($('#token_gen').val());
    let ls = nav_data();
    usuario = {"username":user, "clave":clave,"token_google":token_google,"ls":ls};
 
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
            $('#invalido').html('<p>¡Usuario Desactivado por múltiples fallos de sesión!</p><button type="button" id="reactivarUsuario" class="btn btn-secondary waves-effect">Reactivar Usuario</button><br>');
        }else if(info.mensaje=="Usuario Suspendido"){
            $('#invalido').html('<p>¡Usuario Suspendido!</p><a href="#">Reactivar Usuario</a>');
        }else if(info.mensaje=="Banca Inactiva"){
            $('#invalido').html('<p>¡Esta Banca se encuentra inactiva!</p><a href="#">Reactivar Usuario</a>');
        }else if(info.mensaje=="Eres un bot"){
            $('#invalido').html('<p>BOT ALERTA</p>');
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
                    $('#msgSesion').html("<p>Se han validado todos los datos, en breve podrás iniciar sesion con tu nueva clave.</p>");
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
            $('#modalNav').modal("hide");
            $('#alertaModal').modal("show");
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


$(document).on('click', '#recuperarC', function() {
    $('#modalClave').modal("show"); 
});

//RecuperarClave
async function recuperarClave(){
    var usuario =[];
    let ls = nav_data();
    var user = $.trim($('#nombreUser').val());
    usuario = {"username":user,"ls":ls};
    
    var info =  await ajax_peticion("/login/validarUsuario", {'usuario': JSON.stringify(usuario)}, "POST");

    console.log(info);

    if(info.e=="1"){
        $("#mostrarCl").removeClass("invisible");
    }else{
        console.log("el usuario no existe");
        $("#mostrarCl").removeClass("invisible");
    }
}

$(document).on('click', '#validarUser', function() {
    $('.validarUser').addClass("invisible");
    recuperarClave();
});



$('#recuperarCl').submit(async function(e) {
    e.preventDefault(); 
    let usuario =[];
    let c1 = $('#claveN1').val();
    let ls = nav_data();
    let user = $.trim($('#nombreUser').val());
    let codigo = $.trim($('#codigoClave').val());
    usuario = {"username":user,"clave":c1,"codigo":codigo,"ls":ls};
    
    var info =  await ajax_peticion("/login/recuperarClave", {'usuario': JSON.stringify(usuario)}, "POST");

    console.log(info);

    if(info.e=="1"){
        $("#modalClave").modal("hide");
        $('#msgClaveCard').html("<p>Su clave se cambió correctamente, en breve podrá iniciar sesión de nuevo.</p>");
        $("#claveAlerta").modal("show");
        setTimeout(function(){
            window.location.href = "/";
        }, 3000);
    }else{
        $("#msgClave").html("<p>El código no es válido.</p>");
    }

});


$('#nuevaClave').keyup(function(e) {
    var strongRegex = new RegExp("^(?=.{8,})(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*\\W).*$", "g");
    var mediumRegex = new RegExp("^(?=.{5,})(((?=.*[A-Z])(?=.*[a-z]))|((?=.*[A-Z])(?=.*[0-9]))|((?=.*[a-z])(?=.*[0-9]))).*$", "g");
    var enoughRegex = new RegExp("(?=.{3,}).*", "g");
    if (false == enoughRegex.test($(this).val())) {
        document.getElementById("txt-clave2").innerHTML ='';
        document.getElementById("progresoClave2").style.width="10%";
        document.getElementById("progresoClave2").style.background="#9fd0fa";
        document.getElementById("txt-clave2").style.color="#ff0000";
    } else if (strongRegex.test($(this).val())) {
            strongN=1;
            document.getElementById("progresoClave2").style.width="100%";
            document.getElementById("progresoClave2").style.background="#49ba32";
            document.getElementById("txt-clave2").style.color="#ffffff";
            document.getElementById("txt-clave2").innerHTML ='Fuerte';
    } else if (mediumRegex.test($(this).val())) {
            strongN=1;
            document.getElementById("progresoClave2").style.width="50%";
            document.getElementById("progresoClave2").style.background="#e0a85e";
            document.getElementById("txt-clave2").style.color="#ffffff";
            document.getElementById("txt-clave2").innerHTML ='Media';
    } else {
        document.getElementById("progresoClave2").style.width="20%";
        document.getElementById("progresoClave2").style.background="#ff0000";
        document.getElementById("txt-clave2").style.color="#ffffff";
        document.getElementById("txt-clave2").innerHTML ='Debil';
    }
    return true;
});


$('#nuevaClave2').keyup(function(e) {
    $('#passstrengthN').html('');
    let c1 = $('#nuevaClave').val();
    let c2 = $('#nuevaClave2').val();
    if(c1!=c2){
        $('#passstrengthN2').html('Las contraseñas no son iguales');
        $('#primerInicio').addClass("invisible");
    }else{
        $('#passstrengthN2').html('');
        if(strongN==0){
            $('#msgClaveNueva').html('No puede continuar con una clave Débil');
            $('#primerInicio').addClass("invisible");
            $('#mostrarQr').addClass("invisible");
        }else{
            $('#msgClaveNueva').html('');
            $('#primerInicio').removeClass("invisible");
            $('#mostrarQr').removeClass("invisible");
        }
    }
    
});



$('#claveN1').keyup(function(e) {
    var strongRegex = new RegExp("^(?=.{8,})(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*\\W).*$", "g");
    var mediumRegex = new RegExp("^(?=.{5,})(((?=.*[A-Z])(?=.*[a-z]))|((?=.*[A-Z])(?=.*[0-9]))|((?=.*[a-z])(?=.*[0-9]))).*$", "g");
    var enoughRegex = new RegExp("(?=.{3,}).*", "g");
    if (false == enoughRegex.test($(this).val())) {
            document.getElementById("txt-clave").innerHTML ='';
            document.getElementById("progresoClave").style.width="10%";
            document.getElementById("progresoClave").style.background="#9fd0fa";
            document.getElementById("txt-clave").style.color="#ff0000";
    } else if (strongRegex.test($(this).val())) {
            document.getElementById("progresoClave").style.width="100%";
            document.getElementById("progresoClave").style.background="#49ba32";
            document.getElementById("txt-clave").style.color="#ffffff";
            document.getElementById("txt-clave").innerHTML ='Fuerte';
            strong=1;
    } else if (mediumRegex.test($(this).val())) {
            document.getElementById("progresoClave").style.width="50%";
            document.getElementById("progresoClave").style.background="#e0a85e";
            document.getElementById("txt-clave").style.color="#ffffff";
            document.getElementById("txt-clave").innerHTML ='Media';
            strong=1;
    } else {
        document.getElementById("progresoClave").style.width="20%";
        document.getElementById("progresoClave").style.background="#ff0000";
        document.getElementById("txt-clave").style.color="#ffffff";
        document.getElementById("txt-clave").innerHTML ='Debil';
    }
    return true;
});

$('#claveN2').keyup(function(e) {
    $('#passstrength').html('');
    let c1 = $('#claveN1').val();
    let c2 = $('#claveN2').val();
    if(c1!= c2){
        $('#passstrength2').html('Las contraseñas no son iguales');
    }else{
        $('#passstrength2').html('');
        if(strong==0){
            $('#msgClave').html('No puede continuar con una clave Débil');
        }else{
            $('#msgClave').html('');
            $('#passstrength2').html('');
            $('#recuperarClave').removeClass("invisible");
        }
    }
    
});


grecaptcha.ready(function() {
    grecaptcha.execute('6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI', {action: 'submit'}).then(function(token) {
    var response = document.getElementById("token_gen");
    response.vale = token;
    });
});


