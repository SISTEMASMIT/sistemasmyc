import {ajax_peticion} from './Ajax-peticiones.js';

$('#searchEditar').keyup(function(){
    $('#editar_folder_jstree').jstree(true).show_all();
    $('#editar_folder_jstree').jstree('search', $(this).val());
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
        $('#agregarGrupo').modal("hide");
        $('#alertaModal').modal("show");
        $('#msgGrupo').html("<p>Se registró el grupo correctamente.</p>");
        recargarTablaGrupos();
    }else if(info.e=="0"){
        $('#agregarGrupo').modal("hide");
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

$(document).on('click', '#editarLimpiar', function() {
    $('#editar_folder_jstree').jstree().deselect_all();
    $('#editar_folder_jstree').jstree('close_all');
});

$(document).on('click', '#editarExpandir', function() {
    $('#editar_folder_jstree').jstree('open_all');
});

$(document).on('click', '#limpiar', function() {
    $('#folder_jstree').jstree().deselect_all();
    $('#folder_jstree').jstree('close_all');
});

$(document).on('click', '#expandir', function() {
    $('#folder_jstree').jstree('open_all');
});


$(document).on('change', '#grupoEditar', function() {
    marcarPermisos($(this).val(),"#editar_folder_jstree");
});

$(document).on('change', '#grupo', function() {
    marcarPermisos($(this).val(),"#folder_jstree");
});

//Funcion para pintar los permisos según el grupo
function marcarPermisos(permisos,id){
    var tree = $(id).jstree();
    var permiso = permisos.split(',');
    var i;
            for (i = 0; i < permiso.length; i++) {
                tree.enable_node(parseInt(permiso[i]));
                tree.check_node(parseInt(permiso[i]));
               // tree.open_node(parseInt(permiso[i]));
               $(id).jstree("_open_to", parseInt(permiso[i]));
            }
}




async function recargarTablaGrupos(){
    let grupos =  await ajax_peticion("/query/grupos/grupos_permisos", "", "POST");
    let html='';
    for(var i in grupos){
        if(grupos[i].grupo!="SUPER"){
            html+=`<tr tabindex="0">`;
            html+=`<td class="nombre" data-info="`+grupos[i].niveles+`">`+grupos[i].grupo+`</td><td class="descripcion">`+grupos[i].descripcion+`</td>
        </tr>`;
        }  
    }
    $("#gruposExistentes").html(html);
    $("#loading").addClass('invisible');
}


$( document ).ready(async function() {
    recargarTablaGrupos();
    pintarJstree("#editar_folder_jstree");
    pintarJstree("#folder_jstree");
    let grupos =  await ajax_peticion("/query/grupos/mostrarGrupos", "", "POST");
    var html2='<option selected id="">Seleccione un Grupo</option>';
    for(var i in grupos){
        if(grupos[i].grupo == "SUPER"){
        }else{
            html2+='<option id="'+i+'" value="'+grupos[i].niveles+'">'+grupos[i].descripcion+'</option>';
        }
    }
    $("#grupoEditar").html(html2);
    $("#grupo").html(html2);

    //Jstree
});


//Por si se necesita el popover
$(function () {
    $('.examplePop').popover({
      container: 'body'
    })
  })


$('#tablaGrupos').on("click", "tr", function(){
    let niveles= $(this).find("td:first").attr("data-info");
    consultar_permisos($(this).find("td:first").text(),niveles,$(this).find("td:eq(1)").text());

});

//Consultar los permisos del grupo clickado

$(".tab").on("click", function () {
    var categoryId = $(this).data("id");
    $(".tab, .tab-pane").removeClass("active");
    $(this).addClass("active");
    $("#" + categoryId).addClass("active");
  });

  
async function consultar_permisos(grupo,niveles,descripcion){
    $("#editarNombre").val(grupo);
    $("#editarDescripcion").val(descripcion);
    $("#editarPermisos").val(niveles);
    $('#editar_folder_jstree').jstree().deselect_all();
    $('#editar_folder_jstree').jstree('close_all');
    marcarPermisos($("#editarPermisos").val(),"#editar_folder_jstree");
    let datos = {"grupo":grupo,"niveles":niveles};
    let permisos =  await ajax_peticion("/query/grupos/permisos_nombres", {'datos': JSON.stringify(datos)}, "POST");
    let html=``;
    let head = `<h6><span class="fas fa-user-secret"></span> Nombre: `+permisos.nombre+`</h6><h6> Descripción: `+descripcion+`</h6><h6><span class="fas fa-shield"></span> Permisos Disponibles</h6>`;
    let body = ``;
    for(var i in permisos.permisos){
        head+=`<li>`+permisos.permisos[i]+`</li>`;
    }
    html+=head+body;
    $("#panelGrupo").removeClass('invisible');
    $("#infoGrupo").removeClass('invisible');
    $("#infoGrupo").html(html);
    var ancho = screen.width;
    if (ancho<420){
        $("#p2").removeClass('col-md-3');
        $("#p2").addClass('col-md-9');
        $("#p1").removeClass('col-md-9');
        $("#p1").addClass('col-md-3');
    }else{
        $("#p2").removeClass('col-md-3');
        $("#p2").addClass('col-md-6');
        $("#p1").removeClass('col-md-9');
        $("#p1").addClass('col-md-6');
    }

    

    $("#infoGrupo").html(html);
}

//guardar grupos de seguridad
$('#formEditarGrupos').submit( async function(e) {
    e.preventDefault(); 

    var nombre = $.trim($('#editarNombre').val());
    var descripcion = $.trim($('#editarDescripcion').val());
    var tree = $('#editar_folder_jstree').jstree();
    var permisos = tree.get_selected(); 
    permisos = permisos.toString();
    let grupo = {"nombre":nombre,"descripcion":descripcion,"permisos":permisos};
    var info =  await ajax_peticion("/query/grupos/editarGrupos", {'usuario': JSON.stringify(grupo)}, "POST");
    if(info.e=="1"){
        $('#alertaModalEditarGrupo').modal("show");
        $('#msgGrupoEditar').html("<p>Se guardó el grupo correctamente.</p>");
        recargarTablaGrupos();
    }else if(info.e=="0"){
        $('#alertaModalEditarGrupo').modal("show");
        $('#msgGrupoEditar').html("<p>Ocurrió un error.</p>");
        recargarTablaGrupos();
    }
});



function pintarJstree(id){
    var folder_jsondata;
        $.ajax({
            url: "/query/",
            dataType: "json",
            method: "POST",
            async: false,
            data: {},
            success: function(data) {
                folder_jsondata = data;
                $(id).jstree({
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
                    'plugins': ['types' ,'search'],
                    'themes': {
                        'theme': 'apple',
                        "dots": true,
                        "icons": true
                    },
                    'plugins': [ 'search','types', 'html_data', 'themes', 'ui']
                }).on('search.jstree', function (nodes, str, res) {
                    if (str.nodes.length===0) {
                        $('#search').jstree(true).hide_all();
                    }
                })
                
                $('#deliverable_search').keyup(function(){
                    $(id).jstree(true).show_all();
                    $(id).jstree('search', $(this).val());
                });

            }
        })


}


$('#agregarGrupo').on("click", async function(){

});


