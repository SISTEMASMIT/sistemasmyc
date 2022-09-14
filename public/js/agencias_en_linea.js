import {ajax_peticion} from "./Ajax-peticiones.js";
import {crear_tabla} from "./table.js";
var intervalo;

var id='';
var isdclick = false;
var isrclick = false;
var dclick = [];
var rclick = [];
var emergente = '';
var parametros = [];
var etiquetas = [];
var comando = '';
var orden = '';
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



$(document).on('click', '#agencias_en_linea', async function() {
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
    let grupos = $('#grupos').selectpicker('val');

    data = {"receptor":receptores,"grupo_agencias":grupos,"accion":"agencias_en_linea"};

    var info =  await ajax_peticion("/query/agencias_en_linea", {'data': JSON.stringify(data)}, "POST");
    let set = Object.values(JSON.parse(info.settings.jsr));
    let invisibles = [];
    let sumatorias = [];

    if(set.length > 1){
        

        invisibles = set[0].find(function(x){    
            return x.label == '96';
        });

        sumatorias = set[0].find(function(x){    
            return x.label == '97';
        });

        
        dclick = set[0].find(function(x){    
            return x.label == '98';
        });

        rclick = set[0].find(function(x){    
            return x.label == '99';
        });

        if(dclick!=undefined){
            isdclick=true;
            comando = dclick.datos["comando"];
            orden = dclick.datos["orden"];
            etiquetas = dclick.datos["etiquetas"].split(",");
            parametros = dclick.datos["parametros"];
            emergente = dclick.datos["emergente"];
            dclick = dclick.label;
        }

        if(rclick!=undefined){
            isrclick=true;
        }
        

        invisibles=invisibles.datos.c_invisible.split(",");
        invisibles = invisibles.map(function(x){    
            return parseInt(x);
        });   

        
        sumatorias=sumatorias.datos.c_sumatoria.split(",");
        sumatorias = sumatorias.map(function(x){    
            return parseInt(x);
        });  

    }

    
    let labels = {"Receptores":receptores,"Grupos":grupos};
    crear_tabla(info.data,"#tabla1","#thead1","#tbody1",isdclick,dclick,isrclick,invisibles,sumatorias,labels);
}



// $('#tabla1 tbody').on('click', 'tr', function () {
//     var table = $('#tabla1').DataTable();

//     if ($(this).hasClass('selected')) {
//         $(this).removeClass('selected');
//     } else {
//         table.$('tr.selected').removeClass('selected');
//         $(this).addClass('selected');
//     }
// });

function getCurrentDate(){
    const date = new Date();
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    let f = `${day}/${month}/${year}`;
    return f;
}
$('#tabla1 tbody').on('dblclick', 'tr', function () {
    if(isdclick){
        for (let i = 0; i < etiquetas.length; i++) {
            if(Number.isInteger(parseInt(etiquetas[i]))){
                console.log($(this).find("td").eq(parseInt(etiquetas[i])).text());
            }else{
                if(etiquetas[i]=="f1"){
                    if($("#"+etiquetas[i]).length < 1){
                        let f = getCurrentDate();
                        console.log(console.log(etiquetas[i]+ ": "+f));
                    }else{
                        console.log(etiquetas[i]+ ": "+$("#"+etiquetas[i]).daterangepicker());
                    }       
                }else if(etiquetas[i]=="f2"){
                    if($("#"+etiquetas[i]).length < 1 ){
                        let f = getCurrentDate();
                        console.log(console.log(etiquetas[i]+ ": "+f));
                    }else{
                        console.log(etiquetas[i]+ ": "+$("#"+etiquetas[i]).daterangepicker());
                    }
                }else{
                    console.log(etiquetas[i]+ ": "+$("#"+etiquetas[i]).selectpicker('val'));
                } 
            }
        }
    }
    
}
);

