import {ajax_peticion} from "./Ajax-peticiones.js";


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