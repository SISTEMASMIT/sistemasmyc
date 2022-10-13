import * as imp from "./importer.js";
import {ajax_peticion} from "./Ajax-peticiones.js";
import * as gestor from "./gestor.js";
export function contruir(botones_emergente,window){
    
                let formulario_parametros=botones_emergente[(botones_emergente.length)-1].datos.parametros.split(",");
                let parametros_data=botones_emergente[(botones_emergente.length)-1].datos.parametros_data!=undefined?botones_emergente[(botones_emergente.length)-1].datos.parametros_data.split(","):[];
                let param= new Object();
                param.parametros=Array();
                formulario_parametros.map((f)=>{
                    let o= Object();    
                    let data=f.split(":")
                    if(data[1]=="select"){
                        o.index=data[0];
                        o.valor=$("#"+data[0]).selectpicker("val");
                    }else
                    if(data[1]=="text" || data[1]=="int"){
                        o.index=data[0];
                        o.valor=$("#"+data[0]).val();
                    }else
                    if(data[1]=="check"){
                        o.index=data[0];
                        o.valor=$("#"+data[0]).prop('checked')?1:0;
                    }else
                    if(data[1]=="select_multiple"){
                        o.index=data[0];
                        o.valor=$("#"+data[0]).selectpicker("val").join(",");
                    }
                    if(data[1]=="select_multiple-"){
                        o.index=data[0];
                        o.valor=$("#"+data[0]).selectpicker("val").join(",")+",";
                    }
                    param.parametros.push(o)
                });
                parametros_data.map((f)=>{
                    let o= Object();
                    o.valor=window[f]
                    o.index=f
                    param.parametros.push(o)
                });
                let peticion="{";
                if(botones_emergente[(botones_emergente.length)-1].datos.comando!=undefined){
                    peticion+=`"comando":"${botones_emergente[(botones_emergente.length)-1].datos.comando}",`
                }else if(botones_emergente[(botones_emergente.length)-1].datos.orden!=undefined){
                    peticion+=`"orden":"${botones_emergente[(botones_emergente.length)-1].datos.orden}",`
                }
                param.parametros.forEach(p=> peticion+=`"${p.index}":"${p.valor}",`)
                peticion=peticion.slice(0,-1);
                peticion+="}";
                botones_emergente.pop()
                return peticion
}
export async function construir_modal(formulario,botones_emergente,titulo_ventana,titulo){
    let html="";
    formulario.filtros.forEach((element) => {
        if (element.tipo != "titulo") {
            if (imp[element.tipo]) {
                if ($(this).attr("data-orden") == "modalAgregarAgencia" && element.tipo.includes("button") && jstree == false) {
                    jstree = true
                    html += `<div class='col-6'>
                            <label>Arbol de Receptores</label>
                            <input id="search" class="espaciadoB form-control" type="text" placeholder="Buscar receptor">
                            <br>
                            <div id="folder_jstree" class="col-6">
                            </div>
                        </div>`
                }
                html += imp[element.tipo](element.label, element.datos, element.clase, element.style)
            }
            if(element.tipo.includes("button")){
                botones_emergente.push(element)
            }
        } else {
            titulo_ventana=element.datos.id;
            titulo = element.datos.id;
        }
    });
    
    return {html,botones_emergente,titulo_ventana,titulo};
}

export async function crear(botones_emergente,titulo_ventana,window){

    try{
        let info = await ajax_peticion("/query/standard_query", { 'data': contruir(botones_emergente,window) }, "POST");
                    if(info.data.mensaje=="ok"){
                        gestor.alerta(info.data.mensaje,"success");
                    }else{
                        gestor.alerta(info.data.mensaje,"error");
                    }
    $("#modal2").modal('hide');
    $("#modal2").removeClass("show1"); 
    }catch(e){
        gestor.alerta("El componente ya fue creado","error");
    }
}