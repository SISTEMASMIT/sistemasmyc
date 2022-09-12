

    $(document).ready(function(){

        let id= localStorage.getItem("Id");
        $("#idEq").html('<label> Id: '+id+'</label>');

        $('#tech-companies-1').DataTable({
            "pageLength": 10,
            "lengthMenu": [ 10, 25, 50, 75, 100 ],
            "autoFill": true
         });
});



$('#search').keyup(function(){
    $('#folder_jstree').jstree(true).show_all();
    $('#folder_jstree').jstree('search', $(this).val());
});

// Funcion para limpiar el jstree

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
    $("#niveles").val(permisos);
}


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
});

// //Funcion para desplegar los permisos
// $(document).on("click","#abrirPermisos",function(){
//     let grupos;
//     let peticion=ajax_peticion("query/grupos/mostrarGrupos",{},"POST");
//     peticion.done(function(data){
//         grupos=data;
//     });
//     var html='<option selected id="">Seleccione un Grupo</option>';
//     for(var i in grupos){
//         html+='<option id="'+i+'" value="'+grupos[i].niveles+'">'+grupos[i].descripcion+'</option>';
//     }
//     $("#grupo").html(html);
//         var folder_jsondata;
//         $.ajax({
//             url: "query/",
//             dataType: "json",
//             method: "POST",
//             async: false,
//             data: {},
//             success: function(data) {
//                 folder_jsondata = data;
//                 $('#folder_jstree').jstree({
//                     'core': {
//                         'check_callback': true,
//                         "themes": { "stripes": true },
//                         'data': folder_jsondata,
//                         'multiple': true
//                     },
//                     "types" : {
//                         "root" : {
//                           "icon" : "fa-regular fa-building-lock"
//                         },
//                         "child" : {
//                             "icon" : "fa-regular fa-circle-user"
//                         }
//                     },
//                     'search': {
//                         'case_insensitive': true,
//                         'show_only_matches' : true
//                     },
//                     'checkbox': { 'keep_selected_style': false },
//                     'plugins': ['checkbox', 'types' ,'search'],
//                     'themes': {
//                         'theme': 'apple',
//                         "dots": true,
//                         "icons": true
//                     },
//                     'plugins': ['checkbox', 'search','types', 'html_data', 'themes', 'ui']
//                 }).on('search.jstree', function (nodes, str, res) {
//                     if (str.nodes.length===0) {
//                         $('#search').jstree(true).hide_all();
//                     }
//                 })
                
//                 $('#deliverable_search').keyup(function(){
//                     $('#folder_jstree').jstree(true).show_all();
//                     $('#folder_jstree').jstree('search', $(this).val());
//                 });

//             }
//         })

// });




$(document).on("click","#redirect",function(e){
    e.preventDefault();
    let url=this.getAttribute("data-url");

    window.location.href=window.location.origin+"/"+url;
})
//Funcion para pintar los permisos según el grupo

/*
$('th').dblclick(function() {
    alert($(this).text());
});
*/


$("th").on('contextmenu', function(e) {
    var elementos=[];
    elementos  =  {"item":"abrir enlace,/home","item2":"abrir reporte,/inactividad"};
  let html = abrirMenu(elementos);
  console.log(html);
  $("#menuTabla").html(html);


    const bd = document.body.classList.contains(
        'sidebar-enable'
       );


 $('th').css('box-shadow', 'none');
 if(!bd){
    var top = e.pageY - 200;
    var left = e.pageX - 220;
 }else{
    var top = e.pageY - 200;
    var left = e.pageX-50;
 }

  $(this).css('box-shadow', 'inset 1px 1px 0px 0px red, inset -1px -1px 0px 0px red');
  $("#menuTabla").css({
    display: "block",
    top: top,
    left: left
  });

   
  return false; 
  
});

function abrirMenu (elementos){
    let html = ``;
    for(var i in elementos){
        var elemento = elementos[i].split(","); 
        html+=`<a class="dropdown-item" href="`+elemento[1]+`">`+elemento[0]+`</a>`;
    }
    return html;
    
}

$(".table").on("click", function() {
	if ( $("#menuTabla").css('display') == 'block' ){
  	    $("#menuTabla").hide();
    }
    $('th').css('box-shadow', 'none');
});

$("#menuTabla a").on("click", function() {
  $(this).parent().hide();
});


function pintarTabla(elementos){
        let html=``;
        var elemento = elementos[0];
        let head =`
            <table id="tech-companies-1" class="table table-striped">
            <thead><tr>`;
            let body =``;

        let foot = `</tbody>
        </table>`;
        

}