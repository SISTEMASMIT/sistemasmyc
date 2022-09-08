

    $(document).ready(function(){
        $('#tech-companies-1').DataTable({
            "pageLength": 10,
            "lengthMenu": [ 10, 25, 50, 75, 100 ],
            "autoFill": true
         });
        var elementos=[];
    elementos = `{"Datos":[{"Agno":1990,"Periodo":"Enero","Parametro":"1990","Valor":64.1,"Estado":null,"Notas":null},{"Agno":1990,"Periodo":"Febrero","Parametro":"Febrero","Valor":64.4,"Estado":null,"Notas":null},{"Agno":1990,"Periodo":"Marzo","Parametro":"Marzo","Valor":63.8,"Estado":null,"Notas":null},{"Agno":1990,"Periodo":"Abril","Parametro":"Abril","Valor":65.8,"Estado":null,"Notas":null},{"Agno":1990,"Periodo":"Mayo","Parametro":"Mayo","Valor":64.4,"Estado":null,"Notas":null},{"Agno":1990,"Periodo":"Junio","Parametro":"Junio","Valor":63.7,"Estado":null,"Notas":null},{"Agno":1990,"Periodo":"Julio","Parametro":"Julio","Valor":62.5,"Estado":null,"Notas":null},{"Agno":1990,"Periodo":"Agosto","Parametro":"Agosto","Valor":61.5,"Estado":null,"Notas":null},{"Agno":1990,"Periodo":"Septiembre","Parametro":"Septiembre","Valor":61,"Estado":null,"Notas":null},{"Agno":1990,"Periodo":"Octubre","Parametro":"Octubre","Valor":61.1,"Estado":null,"Notas":null},{"Agno":1990,"Periodo":"Noviembre","Parametro":"Noviembre","Valor":61.9,"Estado":null,"Notas":null},{"Agno":1990,"Periodo":"Diciembre","Parametro":"Diciembre","Valor":61.9,"Estado":null,"Notas":null},{"Agno":1991,"Periodo":"Enero","Parametro":"1991","Valor":60.8,"Estado":null,"Notas":null},{"Agno":1991,"Periodo":"Febrero","Parametro":"Febrero","Valor":61.5,"Estado":null,"Notas":null},{"Agno":1991,"Periodo":"Marzo","Parametro":"Marzo","Valor":62,"Estado":null,"Notas":null},{"Agno":1991,"Periodo":"Abril","Parametro":"Abril","Valor":60.7,"Estado":null,"Notas":null},{"Agno":1991,"Periodo":"Mayo","Parametro":"Mayo","Valor":60.6,"Estado":null,"Notas":null},{"Agno":1991,"Periodo":"Junio","Parametro":"Junio","Valor":61,"Estado":null,"Notas":null},{"Agno":1991,"Periodo":"Julio","Parametro":"Julio","Valor":61.8,"Estado":null,"Notas":null},{"Agno":1991,"Periodo":"Agosto","Parametro":"Agosto","Valor":61.4,"Estado":null,"Notas":null},{"Agno":1991,"Periodo":"Septiembre","Parametro":"Septiembre","Valor":62.1,"Estado":null,"Notas":null},{"Agno":1991,"Periodo":"Octubre","Parametro":"Octubre","Valor":64.3,"Estado":null,"Notas":null},{"Agno":1991,"Periodo":"Noviembre","Parametro":"Noviembre","Valor":64.4,"Estado":null,"Notas":null},{"Agno":1991,"Periodo":"Diciembre","Parametro":"Diciembre","Valor":64,"Estado":null,"Notas":null},{"Agno":1992,"Periodo":"Enero","Parametro":"1992","Valor":64.8,"Estado":null,"Notas":null},{"Agno":1992,"Periodo":"Febrero","Parametro":"Febrero","Valor":65.7,"Estado":null,"Notas":null}]}`;
    
        pintarTabla(elementos);
    $(".mm-active").removeClass("mm-active");
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