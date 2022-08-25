export function ajax_peticion(url,datos,metodo){
    let ajax=$.ajax({
        url: url,
        dataType: "json",
        method: metodo,
        data: datos
    });
    return ajax;
}