import {ajax_peticion} from "./Ajax-peticiones.js";
$(document).ready(async ()=>{
    try{
        let loterias=await ajax_peticion("query/loteria/loterias",{},"GET");
        if(loterias.estado==200){
            pintarSelect(0,loterias.loterias,"loterias");
        }
    }catch(err){
        console.error(err);
    }
    

});

function pintarSelect(shadow,data,elmentoDOM){
    try{
        data.forEach(element => {
            console.log(element)
            $("#"+elmentoDOM).append(`<option ${shadow? "data-subtext="+element.receptor:""}>
            ${element.nombre}
            </option>`);
            
        });
    }catch(err){
        console.log(err)
    }
}