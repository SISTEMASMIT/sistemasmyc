import {ajax_peticion} from "./Ajax-peticiones.js";
import {crear_tabla} from "./table.js";
var intervalo;

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


$(document).on('click', '#detener', async function() {
    clearInterval(intervalo);
});



$(document).on('click', '#aceptar', async function() {
    $('#tabla1').removeClass('invisible');
    // $('#aceptar').prop('disabled', true);
    montar_tabla();
    // intervalo = setInterval(montar_tabla, 50000);
    
});


async function montar_tabla(){
    var w = document.getElementById("tabla_res").clientWidth;
    var h = document.getElementById("tabla_res").clientHeight;
    h = h+500;
    $('#f').html('');
    $("#carga").addClass('carga');
    $("#carga").width( w );
    $("#carga").height( h );
    $("#load").addClass('spinner');
    let data = [];
    let receptores = $('#receptores').selectpicker('val');
    let loterias = $('#loterias').selectpicker('val').join(',');
    let cifras = $('#cifras').selectpicker('val');
    let signo = $('#signo').selectpicker('val');

    data = {"receptor":receptores,"signo":signo,"seleccion":loterias,"cifras":cifras,"monto":"0","limite":"1000","accion":"aceptar"};


    var info =  await ajax_peticion("/query/monitoreo", {'data': JSON.stringify(data)}, "POST");
    let set = Object.values(JSON.parse(info.settings.jsr));

    let invisibles = [];
    let sumatorias = [];
    invisibles = set[0].find(function(x){    
        return x.label == 'c96';
    });

    sumatorias = set[0].find(function(x){    
        return x.label == 'c97';
    });

    invisibles=invisibles.datos.c_invisible.split(",");
    invisibles = invisibles.map(function(x){    
        return parseInt(x);
    });   

    sumatorias=sumatorias.datos.c_sumatoria.split(",");
    sumatorias = sumatorias.map(function(x){    
        return parseInt(x);
    });  


    let labels = {"Receptores":receptores,"Loterias":loterias,"Signo":signo,"Cifras":cifras};
    
    let total = [4];
    crear_tabla(info.data,"#tabla1","#thead1","#tbody1",invisibles,sumatorias,labels);
    
}



$('#tabla1 tbody').on('click', 'tr', function () {
    var table = $('#tabla1').DataTable();

    if ($(this).hasClass('selected')) {
        $(this).removeClass('selected');
    } else {
        table.$('tr.selected').removeClass('selected');
        $(this).addClass('selected');
    }
});