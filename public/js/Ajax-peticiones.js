export function ajax_peticion(url,datos,metodo){
    let ajax=$.ajax({
        url: "query/login/iniciarSesion",
        dataType: url,
        method: metodo,
        async: false,
        data: datos
    });
    return ajax;
}