import {ajax_peticion} from "./Ajax-peticiones.js";
import {crear_tabla} from "./table.js";


$(document).ready(function () {
    var columns = 6;
    var rows = 10;
    var head = crear_head(columns);
    var body = crear_body(columns,rows);
    var html=head+body;
    $('#tablaf').html(html);
    $('#tablaf').DataTable();
});

function crear_head(data){
    let head = `<thead><tr>`;
    for(var i=0; i<data;i++){
        head+=`<th>-</th>`;
    }
    head+=`</tr></thead>`;
    return head;
}

function crear_body(columns, rows){
    let body = `<tbody>`;
    for(var a =0; a< rows; a++){
        body+=`<tr>`;
        for(var i=0; i<columns;i++){
            body+=`<td>-</td>`;
        }
        body+=`</tr>`
    }
    
    
    body+=`</tbody>`;
    return body;
}


$(document).on('click', '#monitorear', async function() {

    $('#f').html('');

    let data = [];
    let receptores = $('#receptores').selectpicker('val');
    let loterias = $('#loterias').selectpicker('val').join(',');;
    let signo = $('#signo').selectpicker('val');
    let cifras = $('#cifras').selectpicker('val');

    data = {"comando":"monitoreo_linea","receptor":receptores,"signo":signo,"seleccion":loterias,"cifras":cifras,"monto":"0","limite":"1000"};

    $("#tabla_res").append(`<div id="preloader" style="display: none;">
    <div id="status" style="display: none;">
        <div class="spinner"></div>
    </div>
</div>`);
    var info =  await ajax_peticion("/query/monitoreo", {'data': JSON.stringify(data)}, "POST");
 
    crear_tabla(info,"#tabla1","#thead1","#tbody1");

});



$('#tabla1 tbody').on('click', 'tr', function () {
    var table = $('#tabla1').DataTable();

    if ($(this).hasClass('selected')) {
        $(this).removeClass('selected');
    } else {
        table.$('tr.selected').removeClass('selected');
        $(this).addClass('selected');
    }
});