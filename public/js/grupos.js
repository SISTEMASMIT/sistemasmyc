import {ajax_peticion} from './Ajax-peticiones.js';

$('#search').keyup(function(){
    $('#folder_jstree').jstree(true).show_all();
    $('#folder_jstree').jstree('search', $(this).val());
});


// Funcion para limpiar el jstree

//Guardar los permisos seleccionados
function guardarPermisos(){
    var tree = $('#folder_jstree').jstree();
    var permisos = tree.get_selected(); 
    $("#niveles").val(permisos);
}


//guardar grupos de seguridad
$('#formGrupos').submit( async function(e) {
    e.preventDefault(); 
    var nombre = $.trim($('#nombre').val());
    var descripcion = $.trim($('#descripcion').val());
    var tree = $('#folder_jstree').jstree();
    var permisos = tree.get_selected(); 
    permisos = permisos.toString();
    let grupo = {"nombre":nombre,"descripcion":descripcion,"permisos":permisos};
    var info =  await ajax_peticion("/query/grupos/guardarGrupos", {'usuario': JSON.stringify(grupo)}, "POST");
    if(info.e=="1"){
        $('#alertaModal').modal("show");
        $('#msgGrupo').html("<p>Se registró el grupo correctamente.</p>");
        recargarTablaGrupos();
    }else if(info.e=="0"){
        $('#alertaModal').modal("show");
        $('#msgGrupo').html("<p>Ocurrió un error, el nombre del grupo ya existe.</p>");
    }
});


//eliminar grupos de seguridad

$(document).on('click', '.eliminarGrupo', async function() {
    var grupo = this.id.split("-");
    let datos = {"nombre":grupo[1]}
    var info =  await ajax_peticion("/query/grupos/eliminarGrupo", {'datos': JSON.stringify(datos)}, "POST");
    recargarTablaGrupos();
});

$(document).on('click', '#limpiar', function() {
    $('#folder_jstree').jstree().deselect_all();
    $('#folder_jstree').jstree('close_all');
});

$(document).on('click', '#expandir', function() {
    $('#folder_jstree').jstree('open_all');
});



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


async function recargarTablaGrupos(){
    var grupos =  await ajax_peticion("/query/grupos/grupos_permisos", "", "POST");
    console.log(grupos);
    let html='';
    for(var i in grupos){
        if(grupos[i].grupo!="SUPER"){
            html+=`<tr>`;
            html+=`<td>`+grupos[i].grupo+`</td><td>`+grupos[i].descripcion+`</td><td><a class="btn btn-outline-secondary btn-sm editarGrupo" id="editar-`+grupos[i].grupo+`" title="Editar Permisos">
            <i class="fas fa-pencil-alt"></i>
        </a></td>
        <td><a class="btn btn-outline-secondary btn-sm eliminarGrupo" id="eliminar-`+grupos[i].grupo+`" title="Eliminar Grupo">
            <i class="fas fa-trash-alt"></i>
        </a></td>
        </tr>`;
        }  
    }
    $("#gruposExistentes").html(html);
}


$( document ).ready(async function() {
    recargarTablaGrupos();
    var grupos;

    var grupos =  await ajax_peticion("/query/grupos/mostrarGrupos", "", "POST");
    var html2='<option selected id="">Seleccione un Grupo</option>';
    for(var i in grupos){
        if(grupos[i].grupo == "SUPER"){
        }else{
            html2+='<option id="'+i+'" value="'+grupos[i].niveles+'">'+grupos[i].descripcion+'</option>';
        }
    }
    $("#grupo").html(html2);

    //Jstree

    var folder_jsondata;
        $.ajax({
            url: "/query/",
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

    
});


//Por si se necesita el popover
$(function () {
    $('.examplePop').popover({
      container: 'body'
    })
  })