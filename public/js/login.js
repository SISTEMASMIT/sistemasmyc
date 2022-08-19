
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
            console.log(info);
            info = info.split('"');
            console.log(info[1]);
            console.log(info[1]);
            console.log(info[2]);
            console.log(info[5]);
        }
        
    })

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
