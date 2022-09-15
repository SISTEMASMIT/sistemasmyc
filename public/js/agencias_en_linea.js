import {ajax_peticion} from "./Ajax-peticiones.js";
import {crear_tabla} from "./table.js";
var intervalo;

var id='';
var isdclick = false;
var isrclick = false;
var dclick = [];
var dclickN = [];
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

    if(set.length > 0){
        console.log(set);



        invisibles = set[0].find(function(x){    
            return x.label == '96';
        });

        sumatorias = set[0].find(function(x){    
            return x.label == '97';
        });
        
        dclickN = set[0].find(function(x){    
            return x.label != '98';
        });

        dclick.push(set[0].filter(function(x){ 
            if(x.label!='98' && x.label!='99' && x.label!='97' && x.label != '96'){
                return x;
            }else if(x.label=='98'){
                return x;
            }
            
        }));

        rclick = set[0].find(function(x){    
            return x.label == '99';
        });

        if(dclick!=undefined){
            isdclick=true;
            
            console.log(dclick);
            // comando = dclick.datos["comando"];
            // orden = dclick.datos["orden"];
            // etiquetas = dclick.datos["etiquetas"].split(",");
            // parametros = dclick.datos["parametros"].split(",");
            // emergente = dclick.datos["emergente"];
            // dclick = dclick.label;
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

// $('td').dblclick(function() {
//     alert($(this).text());
// });

$('#tabla1 tbody').on('dblclick', 'td', async function () {
    let data = [];
    let iscorrect = false;
    var column = $(this).parent().children().index(this);
    if(isdclick){  
        for (let a = 0; a < dclick[0].length; a++) {
            if(dclick[0][a].label!='98'){
                if (column==dclick[0][a].label){
                    iscorrect=true;
                    parametros = dclick[0][a].datos["parametros"].split(",")

                    for (let i = 0; i < parametros.length; i++) {
                        if(Number.isInteger(parseInt(parametros[i]))){
                            data[`c`+parametros[i]]=$(this).parent().find("td").eq(parseInt(parametros[i])).text();
                            data[`comando`] = column ;
                            console.log($(this).parent().find("td").eq(parseInt(parametros[i])).text());
                        }
                    }
                }
            }else{
                iscorrect=true;
                parametros = dclick[0][0].datos["parametros"].split(",")
                for (let i = 0; i < parametros.length; i++) {
                    if(Number.isInteger(parseInt(parametros[i]))){
                        console.log($(this).parent().find("td").eq(parseInt(parametros[i])).text());
                    }else{
                        if(dclick[0][a].parametros[i]=="f1"){
                            if($("#"+parametros[i]).length < 1){
                                let f = getCurrentDate();
                                console.log(console.log(parametros[i]+ ": "+f));
                            }else{
                                console.log(parametros[i]+ ": "+$("#"+parametros[i]).daterangepicker());
                            }       
                        }else if(parametros[i]=="f2"){
                            if($("#"+parametros[i]).length < 1 ){
                                let f = getCurrentDate();
                                console.log(console.log(parametros[i]+ ": "+f));
                            }else{
                                console.log(parametros[i]+ ": "+$("#"+parametros[i]).daterangepicker());
                            }
                        }else{
                            console.log(parametros[i]+ ": "+$('#'+parametros[i]).selectpicker('val'));
                        } 
                    }
                }
            }
        }
        if(iscorrect){
            var info =  await ajax_peticion("/query/equipos", {'data': JSON.stringify(data)}, "POST");
        }
   
        // data = {"receptor":receptores,"grupo_agencias":grupos,"accion":"agencias_en_linea"};

        // var info =  await ajax_peticion("/query/agencias_en_linea", {'data': JSON.stringify(data)}, "POST");
       
    }
    
}
);

