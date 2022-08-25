export function ajax_peticion(url,datos,metodo){
    let ajax=$.ajax({
        url: url,
        url: "query/login/iniciarSesion",
        dataType: "json",
        method: metodo,
        data: datos
    });
    return ajax;
}