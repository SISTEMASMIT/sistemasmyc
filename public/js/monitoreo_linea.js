import {ajax_peticion} from "./Ajax-peticiones.js";
import {crear_tabla} from "./table.js";
$(document).on('click', '#monitorear', async function() {
    let data = [];
    let receptores = $('#receptores').selectpicker('val');
    let loterias = $('#loterias').selectpicker('val').join(',');;
    let signo = $('#signo').selectpicker('val');
    let cifras = $('#cifras').selectpicker('val');

    data = {"comando":"monitoreo_linea","receptor":receptores,"signo":signo,"seleccion":loterias,"cifras":cifras,"monto":"0","limite":"1000"};


    var info =  await ajax_peticion("/query/monitoreo", {'data': JSON.stringify(data)}, "POST");
    
    crear_tabla(info,"#tabla1","#head","#body");

});
