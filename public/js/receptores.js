$(document).ready(function() {
    var grupos;
    $.ajax({
        url: "query/grupos/mostrarGrupos",
        dataType: "json",
        method: "POST",
        async: false,
        data: {},
        success: function(data) {         
            grupos = data;
        }
    })
    var html='<option selected id="">Seleccione un Grupo</option>';
    for(var i in grupos){
        html+='<option id="'+i+'" value="'+grupos[i].niveles+'">'+grupos[i].descripcion+'</option>';
    }
    $("#grupo").html(html);
})