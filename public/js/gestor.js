export async function montar_tabla(parametros){
    var w = document.getElementById("tabla_res").clientWidth;
    var h = document.getElementById("tabla_res").clientHeight;
    h = h+500;
    $('#f').html('');
    $("#carga").addClass('carga');
    $("#carga").width( w );
    $("#carga").height( h );
    $("#load").addClass('spinner');
    let data = [];

    parametros.forEach((parametro,index) => {
        
    });
    
    $("#carga").removeClass('carga');
    $("#load").removeClass('spinner');

    // let receptores = $('#receptores').selectpicker('val');
    // let loterias = $('#loterias').selectpicker('val').join(',');
    // let cifras = $('#cifras').selectpicker('val');
    // let signo = $('#signo').selectpicker('val');

    // data = {"receptor":receptores,"signo":signo,"seleccion":loterias,"cifras":cifras,"monto":"0","limite":"1000","comando":"monitoreo_de_loterias"};

}