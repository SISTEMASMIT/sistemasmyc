import {ajax_peticion} from './Ajax-peticiones.js';
$(document).ready(async function() {
    let grupos = await ajax_peticion(window.location.origin+"/query/grupos/mostrarGrupos","{}","POST");
    console.log(grupos)
    let html='<option selected id="">Seleccione un Grupo</option>';
    for(var i in grupos){
        html+='<option id="'+i+'" value="'+grupos[i].niveles+'">'+grupos[i].descripcion+'</option>';
    }
    $("#grupo").html(html);
})