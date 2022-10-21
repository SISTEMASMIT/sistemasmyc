import {futuDate} from "./date.js";
import {ajax_peticion} from "./Ajax-peticiones.js";
var tb = "#tabla1";
var hd = "#thead1";
var bd = "#tbody1";
var head;
var datos;
var con=0;
var sin=0;
var cifras=0;
var figuras=0;
var salvar = [];
var selected = [];

$(document).ready(async function () {
    $("#load").addClass('spinner');
    let data= {"comando":"cfg_loterias_list"};
    var info =  await ajax_peticion("/query/standard_query", {'data': JSON.stringify(data)}, "POST");
    head = info.data.head;
    datos = info.data.data;
    crear_tabla(info.data);
    $('#contador').html(`<h5><b>Lot: Sin Signo: `+sin+`</b></h5><h5><b>Lot: Con Signo: `+con+`</b></h5><h5><b>Lot: 4 Cifras: `+cifras+`</b></h5><h5><b>Lot: Figuras: `+figuras+`</b></h5><h5><b>Total: `+datos.length+`</b></h5>`);
});

$('#tipo').on('change', function() {
    let info  = {"data":filtrar(this.value),"head":head};
    crear_tabla(info);
});



function filtrar(tipo){
    // var indexes = $('#tabla1').DataTable().rows().indexes().filter(function(value,index){
    //     if(tipo === $('#tabla1').DataTable().row(value).data()[2]){
    //         return $('#tabla1').DataTable().row(value).data()[2];
    //     }else if(tipo === 'todas'){
    //         return $('#tabla1').DataTable().row(value).data()[2];
    //     }else if(tipo === 'OT'){
    //         return $('#tabla1').DataTable().row(value).data()[2]!='PE' && $('#tabla1').DataTable().row(value).data()[2]!='SI' && $('#tabla1').DataTable().row(value).data()[2]!='NO';
    //     }
    //   });
    //   var data = $('#tabla1').DataTable().rows(indexes).data().toArray();
    var filtrada = [];
    for (let i = 0; i < datos.length; i++) {
        

        if(tipo===datos[i].signo_lot){
            filtrada.push(datos[i]);
        }else if(tipo==='todas'){
            filtrada.push(datos[i]);
        }else if(tipo==='OT'){
            if(datos[i].signo_lot!='PE' && datos[i].signo_lot!='SI' && datos[i].signo_lot!='NO'){
                filtrada.push(datos[i]);
            }
        }
    }

    return filtrada;
}


function crear_tabla(info){
    con=0;
    sin=0;
    let head = crear_head(info.head);
    let body = crear_body(info.data);
    let html='';
    $(tb).DataTable().clear();    
    $(tb).DataTable().destroy();
    let tf = tb + " tfoot";
    $(tf).remove();    
    html += head+body;
    $(hd).html(head);
    $(bd).html(body);
    $(tb).append(
        $('<tfoot/>').append( $(tb+" thead tr").clone() )
    );
    $(tb).DataTable({  
        "responsive": true,
        "paging": false,
        "scrollY": "50vh",
        "scrollCollapse": true,
        "columnDefs":  [{ targets: [3], visible: false}],
        language: {
            "sInfo": "Total: _TOTAL_ Loterias",
            "sInfoFiltered":   "(filtrados)",
            "sSearch":   "Buscar:",
            "info" : ''

        },
        "rowCallback": function( row, data ) {
            if ( $.inArray(data.DT_RowId, selected) !== -1 ) {
                $(row).addClass('selected');
            }
        }
     });
    $("#load").removeClass('spinner');
}

function crear_head(data){
    let head = `<tr>`;
    head += ``;
    for(var i in data){
        head+=`<th>`+data[i].charAt(0).toUpperCase()+data[i].slice(1)+`</th>`;
    }
    head+=`</tr>`;
    return head;
}


function crear_body(data){
    let body = ``;
    for(var i in data){
        if(data[i].signo_lot=='SI'){
            con++;
        }else if(data[i].signo_lot=='NO'){
            sin++;
        }else if(data[i].signo_lot=='PE'){
            cifras++;
        }else{
            figuras++;
        }
        body+=`<tr>`;
            for(var a in data[i]){
                if(data[i][a]==null)data[i][a]='';
                if(Number.isInteger(parseInt(data[i][a]))){
                    body+=`<td class="num_aling">`+data[i][a]+`</td>`;
                }else{
                    if(data[i][a].includes('~')){
                        let row = data[i][a].split('~');
                        body+=`<td style="background-color: #`+row[1]+`">`+row[0]+`</td>`;
                    }else{

                        body+=`<td>`+data[i][a]+`</td>`;
                    }
                }
        }
        body+=`</tr>`
    }
    body+=``;

    return body
}

$(document).on('click','tr', function(){
    if ($(this).hasClass('selected')) {
        $(this).removeClass('selected');
    } else {
        $('#tabla1').DataTable().$('tr.selected').removeClass('selected');
        $(this).addClass('selected');
    }
});

$(document).on('click','td',async function(){
    $("#load2").addClass('spinner');
    let row = $('#tabla1').DataTable().row( this ).index();
    let data= {"comando":"cfg_loterias_click","c0":$('#tabla1').DataTable().row(row).data()[0]};
    var info =  await ajax_peticion("/query/standard_query", {'data': JSON.stringify(data)}, "POST");
    detalle(info);
    $("#load2").removeClass('spinner');

});


function detalle(data){
    let info = data.data.data[0];
    console.log(info);
    let html = `<label style="padding: 3%;">Nombre/Código</label>
    <input type="text" id="codigo" disabled>
    <div class="row" style="padding: 3%;">
        <label>Signo: `+info.signo_lot+`</label>
        <label>Estado:
        <select class="selectpicker" id="estado">`;
        if(info.estado_lot=='A'){
            html+=`<option value="A" selected>Activa</option>`;
            html+=`<option value="D" >Desactiva</option>`;

        }else{
            html+=`<option value="A" >Activa</option>`;
            html+=`<option value="D" selected>Desactiva</option>`;
        }
        html+=`</select></label>
    </div>
    <div class="row">
        <div class="col-md-4">
            <label>Días de Juego</label>
            <div id="dias" class="form-check" style="border-style: solid;"></div>
        </div>
        <div class="col-md-2">
            <label>Horas Juego</label>
            <div id="horas_juego" style="border-style: solid;"></div>
        </div>
        <div class="col-md-2">
            <label>Topes Triples</label>
            <div id="topes_triples" style="border-style: solid;"></div>
        </div>
        <div class="col-md-2">
            <label>Top. Terminal</label>
            <div id="topes_terminales" style="border-style: solid;"></div>
        </div>
        <div class="col-md-2">
            <label>Top. 4 Cifras</label>
            <div id="topes_cifras" style="border-style: solid;"></div>
        </div>
    </div>`;
    $('#formulario').html(html);
    // $('#formulario').css("border-style","solid");
    $('#estado').selectpicker();
    $('#codigo').val(info.codigo_lot);
    let dias=["Lunes","Martes","Miercoles","Jueves","Viernes","Sabado","Domingo"];
    html=``;
    for (let i = 0; i < dias.length; i++) {
        if(info.dia[i]==1){
            html+=`<label style="margin-left: 15%;"><input class="form-check-input" style="cursor:pointer;" type="checkbox" value="" id="dia`+i+`" checked>`+dias[i]+`</label></br>`;
        }else{
            html+=`<label style="margin-left: 15%;"><input class="form-check-input" style="cursor:pointer;" type="checkbox" value="" id="dia`+i+`">`+dias[i]+`</label></br>`;

        }
    }
    $('#dias').html(html);
    pintar_inputs('horas_juego','hora_lot',info);
    pintar_inputs('topes_triples','tope_tri',info);
    pintar_inputs('topes_terminales','tope_ter',info);
    pintar_inputs('topes_cifras','tope_4cf',info);
    $('#formulario').append(`<div id="boton" style="text-align: center;padding: 5%;">
    <button class="btn btn-lg btn-info" id="guardar">Guardar</button>
</div>`);
}

function pintar_inputs(id,atributo,info){
    let formato = Intl.NumberFormat('en-US');

    let datos=[];
    let html=``;
    let keys = Object.getOwnPropertyNames(info).filter(function(x){ 
        if(x.includes(atributo)){
            datos.push(info[x]);
            return info[x];
        }
    });

    for (let i = 0; i <= 6; i++) {
        if(id=='horas_juego'){
            html+=`<input type="text" value="`+datos[i]+`" id="`+id+``+i+`" style="max-width: -webkit-fill-available;">`;
        }else{
            html+=`<input type="text" value="`+formato.format(datos[i])+`" id="`+id+``+i+`" style="max-width: -webkit-fill-available;">`;
        }
    }
    $("#"+id).html(html);
}


$(document).on('click', '#guardar', async function () {
    Object.assign(salvar,{["comando"]:"cfg_loterias_mod"});
    Object.assign(salvar,{["loteria"]:$('#codigo').val()});
    Object.assign(salvar,{["estado_lot"]:$('#estado').selectpicker('val')});
    recoger_inputs('#horas_juego','hora_lot');
    recoger_inputs('#topes_triples','tope_tri');
    recoger_inputs('#topes_terminales','tope_ter');
    recoger_checks('#dia');
    
    let keys = Object.getOwnPropertyNames(salvar).filter((x)=>{
        return x!="length"?x:"";
    });
    let valores= Object.values(salvar);
    let str="{";
    keys.forEach((key,index)=>{
        str+=`"${key}":"${valores[index]}",`;
    })
    str = str.slice(0, str.length - 1);
    str+="}";

    var info =  await ajax_peticion("/query/standard_query", {'data': str}, "POST");
    if(info.data.mensaje=='ok'){
        Swal.fire({
            title: '',
            text: 'Guardado Correctamente!',
            icon: 'success',
            confirmButtonText: 'Aceptar'
        })
        $("#load").addClass('spinner');
        let data= {"comando":"cfg_loterias_list"};
        var info =  await ajax_peticion("/query/standard_query", {'data': JSON.stringify(data)}, "POST");
        head = info.data.head;
        datos = info.data.data;
        crear_tabla(info.data);
    }
});

function recoger_checks(id){
    let fecha_lot='';
    for (let i = 0; i <= 6; i++) {
        let num=i+1;
        let id_input = id+i;
        if ($(id_input).is(":checked")){
            fecha_lot=fecha_lot+'1';
        }else{
            fecha_lot=fecha_lot+'0';
        }
    }

    Object.assign(salvar,{["fecha_lot"]:fecha_lot});
    
}

function recoger_inputs(id,variable){
    for (let i = 0; i <= 6; i++) {
        let num=i+1;
        let id_input = id+i;
        Object.assign(salvar,{[variable+''+num]:$(id_input).val()});
    }
}