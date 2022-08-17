function guardarCambios(){
    $('#guardar').on("click", function() {
        alert("CLICKADOS");
    });
}
$(document).ready(function() {
    var opcion;

    opcion = 4;
    tablaUsuarios = $('#tablaUsuarios').DataTable({
        "ajax": {
            "url": "bd/crud.php",
            "method": 'POST', //usamos el metodo POST
            "data": { opcion: opcion }, //enviamos opcion 4 para que haga un SELECT
            "dataSrc": "",
        },
        "columns": [
            { "data": "id" },
            { "data": "codigo_ban" },
            { "data": "nombre_user" },
            { "data": "usuario_ban" },
            { "data": "estado_user" },
            { "data": "dia_con" },
            { "data": "dia_cargo" },
            { "data": "telefono" },
            { "data": "dias_cla" },
            { "data": "fecha_cla" },
            { "defaultContent": "<div class='text-center'><div class='btn-group'><button \
                 class='btn btn-primary btn-sm btnEditar'><i class='material-icons'>edit</i> \
                 </button><button class='btn btn-danger btn-sm btnBorrar'><i class='material-icons'>\
                 delete</i></button></div></div>" }
            //{ "data": "clave_ban" },
            //{ "data": "permisos" },
        ]
    });
    $('#tablaUsuarios').dataTable(); //cambia color de fila junto con ccs de index

    var fila; //captura la fila, para editar o eliminar
    //submit para el Alta y Actualización
    $('#formUsuarios').submit(function(e) {
        e.preventDefault(); //evita el comportambiento normal del submit, es decir, recarga total de la página
        var xban = $.trim($('#codigo_ban').val());
        let indice = xban.indexOf(" ");
        var xban2 = xban.substring(0, indice);
        codigo_ban = xban2;
        nombre_user = $.trim($('#nombre_user').val());
        usuario_ban = $.trim($('#usuario_ban').val());
        clave_ban = $.trim($('#clave_ban').val());
        permisos = $("#btnNivel").val();
        alert($("#btnNivel").val());
        nivel_ban = '';
        estado_user = $.trim($('#estado').val());
        dia_con = $.trim($('#dia_con').val());
        intentos = '';
        dia_cargo = $.trim($('#dia_cargo').val());
        telefono = $.trim($('#telefono').val());
        /////////////////// para configura ///////////
        var dnd = document.querySelector('#config2');
        var logSelected = function() {
            console.log(dnd.selectedIndex);
            $('#config2').val(dnd.selectedIndex)
        };
        logSelected();
        dnd.addEventListener('change', logSelected);
        ///////////////////////////////////////////////
        configura = ($('#config2').val() + $('#monitoreo').val());
        dias_cla = '';
        fecha_cla = '';
        $.ajax({
            url: "bd/crud.php",
            type: "POST",
            datatype: "json",
            data: {
                id: id,
                codigo_ban: codigo_ban,
                nombre_user: nombre_user,
                usuario_ban: usuario_ban,
                clave_ban: clave_ban,
                permisos: permisos,
                nivel_ban: nivel_ban,
                estado_user: estado_user,
                dia_con: dia_con,
                intentos: intentos,
                dia_cargo: dia_cargo,
                telefono: telefono,
                configura: configura,
                dias_cla: dias_cla,
                fecha_cla: fecha_cla,
                usu_lote: usu_lote,
                opcion: opcion
            },
            success: function(data) {
                tablaUsuarios.ajax.reload(null, false);
            }
        });
        $('#modalCRUD').modal('hide');
    });

    //para limpiar los campos antes de dar de Alta una Persona
    $("#btnNuevo").click(function() {
        opcion = 1; //alta           
        user_id = null;
        $("#myModal").trigger("reset");
        $("#formUsuarios").trigger("reset");
        $(".modal-header").css("background-color", "#17a2b8");
        $(".modal-header").css("color", "white");
        $(".modal-title").text("Alta de Usuario");
        $('#modalCRUD').modal('show');
    });
    //Editar        
    $(document).on("click", ".btnEditar", function() {
        //$("#folder_jstree").jstree().uncheck_all(true);
        opcion = 2; //editar
        fila = $(this).closest("tr");
        id = parseInt(fila.find('td:eq(0)').text()); //capturo el ID
        var xclave_ban;
        ///// Nuevo 30-05-2022  /////
        $.ajax({
                url: "bd/crud.php",
                dataType: "json",
                method: "POST",
                data: { opcion: 5, id: id },
                success: function(data) {
                    xclave_ban = data[0].clave_ban;
                    xcodigo_ban = data[0].codigo_ban;
                    xconfigura = data[0].configura.substring(0, 1);
                    xmonitoreo = data[0].configura.substring(2, 1);
                    xestado = data[0].estado_user;
                    console.log(data[0].configura + '    ' + xmonitoreo);
                    xpermisos = data[0].permisos;
                    $("#btnNivel").val(xpermisos);
                    $("#config2").val(xconfigura);
                    $("#clave_ban").val(xclave_ban);
                    $('#codigo_ban option:contains(' + xcodigo_ban + ')').prop({ selected: true });
                    document.getElementById("config2").options.item(xconfigura).selected = 'selected';
                    if (xestado == 'A') {
                        $('#estado').val('A');
                        $('#estado').prop('checked', true);
                    }
                    if (xestado == 'D') {
                        $('#estado').val('D');
                        $('#estado').prop('checked', false);
                    }
                    if (xmonitoreo == '0') {
                        $('#monitoreo').val('0');
                        $('#monitoreo').prop('checked', false);
                        $('#target').hide();
                    } else {
                        $('#monitoreo').val('1');
                        $('#monitoreo').prop('checked', true);
                        $('#target').show();
                    }
                }
            })
            ///////////////////////////// 
        var xban = fila.find('td:eq(1)').text();
        let indice = xban.indexOf(" ");
        var xban2 = xban.substring(0, indice);
        codigo_ban = xban2;
        nombre_user = fila.find('td:eq(2)').text();
        usuario_ban = fila.find('td:eq(3)').text();
        estado_user = $('#estado').val();
        dia_con = fila.find('td:eq(5)').text();
        dia_cargo = fila.find('td:eq(6)').text();
        telefono = fila.find('td:eq(7)').text();
        dias_cla = fila.find('td:eq(8)').text();
        fecha_cla = fila.find('td:eq(9)').text();
        configura = $("#config2").val();
        usu_lote = $("#btnNivel").val();
        clave_ban = xclave_ban;
        $("#nombre_user").val(nombre_user);
        $("#usuario_ban").val(usuario_ban);
        $("#codigo_ban").val(codigo_ban);
        $("#telefono").val(telefono);
        $("#dia_con").val(dia_con);
        $("#dia_cargo").val(dia_cargo);
        $("#estado_user").val(estado_user);
        //alert(estado_user);
        $("#monitoreo").val(monitoreo);
        $(".modal-header").css("background-color", "#007bff");
        $(".modal-header").css("color", "white");
        $(".modal-title").text("Editar Usuario");
        $('#modalCRUD').modal('show');



    });
    //Borrar
    $(document).on("click", ".btnBorrar", function() {
        fila = $(this);
        id = parseInt($(this).closest('tr').find('td:eq(0)').text());
        opcion = 3; //eliminar        
        var respuesta = confirm("¿Está seguro de borrar el registro " + id + "?");
        if (respuesta) {
            $.ajax({
                url: "bd/crud.php",
                type: "POST",
                datatype: "json",
                data: { opcion: opcion, id: id },
                success: function() {
                    tablaUsuarios.row(fila.parents('tr')).remove().draw();
                }
            });
        }
    });

    $("#nova").click(function() {
        //var tree = $('#folder_jstree').jstree();
        //tree.refresh();
        //$('#folder_jstree').reload;
    })

    $("#btnGuardar").click(function() {
        //location.reload();
        //return true;
    })

    $('#estado').on('change', function() {
        var isChecked = $(this).is(':checked');
        if (isChecked == true) {
            $('#estado').val('A');
        } else {
            $('#estado').val('D');
        }
        console.log('edo ' + $('#estado').val());
    })
    $('#monitoreo').on('change', function() {
        var isChecked = $(this).is(':checked');
        if (isChecked == true) {
            $('#monitoreo').val('1');
            $('#target').show();
        } else {
            $('#monitoreo').val('0');
            $('#target').hide();
        }
        console.log('moni' + $('#monitoreo').val());
    })

    //////////////////////// New funcion 31-05-2022  ///////////////////////////
    $("#nivel").click(function() {
        var folder_jsondata;
        $.ajax({
            url: "bd/nivel.php",
            dataType: "json",
            method: "POST",
            async: false,
            data: {},
            success: function(data) {
                console.log(data);
                folder_jsondata = data;

                $('#folder_jstree').jstree({
                    'core': {
                        'check_callback': true,
                        "themes": { "stripes": true },
                        'data': folder_jsondata,
                        'multiple': true
                    },
                    'checkbox': { 'keep_selected_style': false },
                    'plugins': ['checkbox', 'types'],
                    'themes': {
                        'theme': 'apple',
                        "dots": true,
                        "icons": true
                    },
                    'plugins': ['checkbox', 'html_data', 'themes', 'ui']
                });
            }
        })


        console.log($("#btnNivel").val());
        $("input").trigger(anda2($("#btnNivel").val()));
    })

});

///////////////  Funciones del JSTree ////////////////////////////////////
$("#myModal").click(function() {
})

function ejecuto() {
    $('#folder_jstree').jstree('open_all');
    otra();
    changeStatus($("#btnNivel").val());
}

/////////////////////////////////////////////////////////////////////////   
function anda() {
    var tree = $('#folder_jstree').jstree();
    var selectedNodeIds = tree.get_selected(); // gets the selected nodes
    $("#btnNivel").val(selectedNodeIds);
}
//////////////////////////////////////////////////////////////////////////
function anda2(arra) {
//    $("#folder_jstree").jstree().uncheck_all(true);
    var tree = $('#folder_jstree').jstree();
    var arr = arra.split(',');
    var i;
    for (i = 0; i < arr.length; i++) {
        //tree.enable_node(parseInt(arr[i]));
        //tree.check_node(parseInt(arr[i]));
        console.log(parseInt(arr[i]));
    }
}
////////////////////////////////////////////////////////////////////////////
$(function() {
        $('#expan').change(function() {
            if ($('#expan').is(":checked")) {
                $('#folder_jstree').jstree('open_all');
            } else {
                $('#folder_jstree').jstree('close_all');
            }
        });
    })
    ///////////////////////////////////////////////////////////////////////////////
function changeStatus(arra) {
    var arr = arra.split(',');
    var i;
    for (i = 0; i < arr.length; i++) {
        $('#folder_jstree').jstree("enable_node", "#" + arr[i]);
    }
}
///////////////////////////////////////////////////////////////////////////////
function otra() {
    var test = $('#folder_jstree').jstree(true).get_json('#', { 'flat': true });
    $.each(test, function(key, value) {
        $('#folder_jstree').jstree('disable_node', value.id);
    });
}
///////////////////////////////////////////////////////////////////////////////