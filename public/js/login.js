

function reactivar(){
    $('#modalActivar').modal("show");
    $('#usuarioA').html('<label id="usuario">'+$('#usuario').val()+'</label>');    
}

$('#reactivar').submit(function(e){
    e.preventDefault();
    var usuario = [];
    user = $.trim($('#usuario').val());
    clave = $.trim($('#clave').val());
    codigo = $.trim($('#codigo').val());
    token = $.trim($('#token').val());
    host = $.trim($('#host').val());
    usuario = {"username":user, "clave":clave, "codigo":codigo,"token":token,"host":host};
    console.log(usuario);

    $.ajax({
        url: "query/login/activarUsuario",
        dataType: "json",
        method: "POST",
        async: false,
        data: {'usuario': JSON.stringify(usuario)},
        success: function(data) {
            info = data;
            console.log(info);
        }
    })
    if(info.e == '1'){
        $('#activarUser').addClass('invisible');
        $('#cancelarActivarUser').html('Cerrar');
        $('#msgAct').html('<p>¡Usuario Activado Correctamente, intente iniciar sesión de nuevo!</p>');
    }else{
        $('#msgAct').html('<p class="invalido">¡Código inválido, intente después!</p>');
    }


    }
);



$('#formLogin').submit(function(e) {
    e.preventDefault(); 
    var usuario =[];
    user = $.trim($('#usuario').val());
    clave = $.trim($('#clave').val());

    usuario = {"username":user, "clave":clave};
    console.log(usuario);
    var info;
    $.ajax({
        url: "query/login/iniciarSesion",
        dataType: "json",
        method: "POST",
        async: false,
        data: {'usuario': JSON.stringify(usuario)},
        success: function(data) {
            info = data;
            console.log(info);
        }
    })
    if(info.e == 'undefined'){
        window.location.href = "/home"; 
    }else if(info.e =='1'){
        window.location.href = "/home"; 
    }else if(info.e=="0"){
        if(info.mensaje=="Usuario Desactivado"){
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
        alert("Registre equipo");
    }else{
        
       

    }

});

$('#navegador').submit(function(e) {
    e.preventDefault(); 

    recordarNavegador = document.querySelector('#recordar').checked;
    if(recordarNavegador==''){
        recordarNavegador='Off';
    }else{
        recordarNavegador='On';
    }

    console.log(recordarNavegador);

    if(clave=='1234'){
        $('#modalNav').modal("show");
    }else{
        $('#invalido').html('<p>Usuario o Clave Inválido</p>');
    }
    

});



function cookie(){
    let setCookie = (name, value, days) => {
        let expires = "";
        if (days) {
         let date = new Date();
         date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
         expires = "; expires=" + date.toUTCString();
        }
       document.cookie = name + "=" + (value || "") + expires + "; path=/";
       };
}