
$('#formLogin').submit(function(e) {
    e.preventDefault(); 

    var usuario =[];

    user = $.trim($('#usuario').val());
    clave = $.trim($('#clave').val());
    token = $.trim($('#token').val());

    usuario = {"username":user, "clave":clave,"jwt":token};
    console.log(usuario);

    var info;
    $.ajax({
        url: "queryLogin/",
        dataType: "json",
        method: "POST",
        async: false,
        data: {'usuario': JSON.stringify(usuario)},
        success: function(data) {
            info = data;
            console.log(info[0]["mensaje"]);
        }
        
        
    })

    if(info[0]["e"]=="0"){
        if(info[0]["mensaje"]=="Usuario Desactivado"){
            $('#invalido').html('<p>¡Usuario Desactivado por múltiples fallos de sesión!</p><button type="button" class="btn btn-secondary waves-effect" onclick="reactivar()">Reactivar Usuario</button>');
        }else if(info[0]["mensaje"]=="Usuario Suspendido"){
            $('#invalido').html('<p>¡Usuario Suspendido!</p><a href="#">Reactivar Usuario</a>');
        }else if(info[0]["mensaje"]=="Banca Inactiva"){
            $('#invalido').html('<p>¡Esta Banca se encuentra inactiva!</p><a href="#">Reactivar Usuario</a>');
        }else{
            $('#invalido').html('<p>¡Su usuario o clave son inválidos, intente nuevamente!</p>');
        }
        
        
        console.log("Error "+info[0]["mensaje"]);
    }else if(info[0]["e"]=="2"){
        console.log("Registre equipo");

    }

    /* 
    if(clave=='1234'){
        $('#modalNav').modal("show");
    }else{
        $('#invalido').html('<p>Usuario o Clave Inválido</p>');
    }*/
    

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


function reactivar(){
    alert("Solicitar Reactivación");
}
