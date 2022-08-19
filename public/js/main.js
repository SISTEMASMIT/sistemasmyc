function guardarCambios(){
    $('#guardar').on("click", function() {
        alert("CLICKADOS");
    });
}

$('#search').keyup(function(){
    $('#folder_jstree').jstree(true).show_all();
    $('#folder_jstree').jstree('search', $(this).val());
});


// Funcion para limpiar el jstree

function limpiarJstree(){
    $('#folder_jstree').jstree().deselect_all();
    $('#folder_jstree').jstree('close_all');
}


function limpiarJstree(){
    $('#folder_jstree').jstree().deselect_all();
    $('#folder_jstree').jstree('close_all');
}

function expandirJstree(){
    $('#folder_jstree').jstree('open_all');
}
//Guardar los permisos seleccionados
function guardarPermisos(){
    var tree = $('#folder_jstree').jstree();
    var permisos = tree.get_selected(); 
    console.log(permisos);
    $("#niveles").val(permisos);
}


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
    console.log(usuario);

});


//Funcion para desplegar los permisos
function abrirPermisos(){
    var grupos;
    $.ajax({
        url: "queryGrupos/",
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
        var folder_jsondata;
        $.ajax({
            url: "query/",
            dataType: "json",
            method: "POST",
            async: false,
            data: {},
            success: function(data) {
                folder_jsondata = data;
                $('#folder_jstree').jstree({
                    'core': {
                        'check_callback': true,
                        "themes": { "stripes": true },
                        'data': folder_jsondata,
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
                    'checkbox': { 'keep_selected_style': false },
                    'plugins': ['checkbox', 'types' ,'search'],
                    'themes': {
                        'theme': 'apple',
                        "dots": true,
                        "icons": true
                    },
                    'plugins': ['checkbox', 'search','types', 'html_data', 'themes', 'ui']
                }).on('search.jstree', function (nodes, str, res) {
                    if (str.nodes.length===0) {
                        $('#search').jstree(true).hide_all();
                    }
                })
                
                $('#deliverable_search').keyup(function(){
                    $('#folder_jstree').jstree(true).show_all();
                    $('#folder_jstree').jstree('search', $(this).val());
                });

            }
        })

}


$(document).on('change', '#grupo', function() {
    marcarPermisos($(this).val());
});



//Funcion para pintar los permisos según el grupo

function marcarPermisos(permisos){
    var tree = $('#folder_jstree').jstree();
    var permiso = permisos.split(',');
    var i;
            for (i = 0; i < permiso.length; i++) {
                tree.enable_node(parseInt(permiso[i]));
                tree.check_node(parseInt(permiso[i]));
               // tree.open_node(parseInt(permiso[i]));
               $("#folder_jstree").jstree("_open_to", parseInt(permiso[i]));
            }
}
