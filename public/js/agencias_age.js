import { rangeDate } from "./date.js";
import { ajax_peticion } from "./Ajax-peticiones.js";
import {crear_tabla} from "./elimitable.js";
import { contruir } from "./contruir_peticion_formularios_emergentes.js";   
import * as imp from "./importer.js";

let hay_mes = false;
var id = '';
var base = "#base";
var titulo = "";
var base_html = "";
var isdclick = false;
var isrclick = false;
var isdclick2 = false;
var isrclick2 = [false];
var dclick = [];
var rclick = [];
var emergente = '';
var parametros = [];
var etiquetas = [];
var comando = '';
var orden = '';
var vtn = [];
var formulario_emergente;
var etq = [];
var extra = [];
var btns = [];
var have_set = [];
var et;
var modal_id = 1;
var row;
var parametros_segundo_envio = [];
var hay_f4 = false;
window["receptor"] ="";
window["agencia"] ="";
var botones_emergente=Array();
var parametros_emergente = Array();
    var parametros_emergentes=Array()
var titulo_ventana="";
$(document).ready(async function () {
    rangeDate("#f1f2");
    var columns = 6;
    var rows = 10;
    var head = crear_head(columns);
    var body = crear_body(columns, rows);
    var html = head + body;
    $('#tablaf').html(html);
    $('#tablaf').DataTable();
    //Jstree
})


function crear_head(data) {
    let head = `<thead><tr>`;
    for (var i = 0; i < data; i++) {
        head += `<th>-</th>`;
    }
    head += `</tr></thead>`;
    return head;
}

//Ocultar El modal
$(document).on('hidden.bs.modal', '#modal_edit', function() {
    $("#modal_edit").removeClass("show1");
  
});


function crear_body(columns, rows) {
    let body = `<tbody>`;
    for (var a = 0; a < rows; a++) {
        body += `<tr>`;
        for (var i = 0; i < columns; i++) {
            body += `<td>-</td>`;
        }
        body += `</tr>`
    }


    body += `</tbody>`;
    return body;
}

//Ocultar El modal
$(document).on('hidden.bs.modal', '#base', function () {
    hay_f4 = false;
    hay_mes = false;
    isrclick = false;
    modal_id--;
    $(base).children().last().remove();
    if ($(base).children().length > 1) {
        $('.modal-backdrop').addClass('show');
        $(base).children().last().addClass("fade");
        $(base).children().last().addClass("show");
    }
    vtn.pop();
    etq.pop();
    extra.pop();
    let ss = have_set[have_set.length - 1];
    if (ss) {
        btns.pop();
    }
});




$(document).on('click', '#agencias_agencias', async function () {
    $('#tabla1').removeClass('invisible');
    if ($('#numero').val() != '') {
        montar_tabla();
    } else {
        $('#numero').attr("placeholder", "Ingrese un Número").placeholder();
    }
});

async function montar_tabla() {
    var w = document.getElementById("tabla_res").clientWidth;
    var h = document.getElementById("tabla_res").clientHeight;
    h = h + 500;
    $('#f').html('');
    $("#carga").addClass('carga');
    $("#carga").width(w);
    $("#carga").height(h);
    $("#load").addClass('spinner');
    let data = [];
    data = { "comando": "agencias_agencias" };
    var info = await ajax_peticion("/query/standard_query", { 'data': JSON.stringify(data) }, "POST");

    let set = Object.values(JSON.parse(info.settings.jsr));
    etq.push(info.data.head);
    vtn.push(set);
    extra.push(info.datos_extra);
    let invisibles = [];
    let sumatorias = [];

    if (set[0].length > 0) {
        have_set.push(true);

        invisibles = set[0].find(function (x) {
            return x.label == '96';
        });

        sumatorias = set[0].find(function (x) {
            return x.label == '97';
        });


        dclick.push(set[0].filter(function (x) {
            if (x.label != '98' && x.label != '99' && x.label != '97' && x.label != '96') {
                return x;
            } else if (x.label == '98') {
                return x;
            }
        }));

        rclick.push(set[0].find(function (x) {
            return x.label == '99';
        }));


        if (dclick[0] != undefined) {
            isdclick = true;
        }

        if (rclick[0] != undefined) {
            isrclick = true;
        }
        if (invisibles != undefined) {
            invisibles = invisibles.datos.c_invisible.split(",");
            invisibles = invisibles.map(function (x) {
                return parseInt(x);
            });
        } else {
            invisibles = [];
        }


        if (sumatorias != undefined) {
            sumatorias = sumatorias.datos.c_sumatoria.split(",");
            sumatorias = sumatorias.map(function (x) {
                return parseInt(x);
            });
        } else {
            sumatorias = [];
        }

    } else {
        have_set.push(false);
        isdclick = false;
        isrclick = false;
    }

    let labels = { "Comando": "Agencias" };
    crear_tabla(info.data, "#tabla1", "#thead1", "#tbody1", isdclick, dclick, isrclick, invisibles, sumatorias, labels, 'Reporte de Ventas Global');

}



function getCurrentDate(formato) {
    const date = new Date();
    let day = `${date.getDate()}`.padStart(2, "0")
    let month = `${date.getMonth() + 1}`.padStart(2, "0")
    let year = date.getFullYear();
    if (formato == 1) {
        let fe = [year, month, day].join("")
        return fe;
    } else {
        let fe = [day, month, year].join("/");
        return fe;
    }

}



$(document).on('click', '.btn-danger', async function () {
    let btn = btns[btns.length - 1];
    let data = [];
    let parametros = btn[0].datos.parametros.split(",");
    let comando2 = btn[0].datos.id;
    Object.assign(data, { "comando": comando2 });
    for (let i = 0; i < parametros.length; i++) {
        Object.assign(data, { [parametros[i]]: et[parametros[i]] });
    }
    let keys = Object.getOwnPropertyNames(data).filter((x) => {
        return x != "length" ? x : "";
    });
    let valores = Object.values(data);
    let string = "{";
    keys.forEach((key, index) => {
        string += `"${key}":"${valores[index]}",`;
    })
    string = string.slice(0, string.length - 1);
    string += "}";
    var info = await ajax_peticion("/query/standard_query", { 'data': string }, "POST");
    if (info.data.mensaje == "El ticket ya esta anulado") {
        Swal.fire({
            title: '',
            text: info.data.mensaje,
            icon: 'warning',
            confirmButtonText: 'Aceptar'
        })
    } else {
        Swal.fire({
            title: '',
            text: info.data.mensaje,
            icon: 'success',
            confirmButtonText: 'Aceptar'
        })
    }
});


//Click Derecho
$(document).on('contextmenu', 'td', function (e) {
    let rclick = vtn[vtn.length - 1];
    let have_rclick;
    for (let i = 0; i < rclick.length; i++) {
        have_rclick = rclick[i].filter(function (x) {
            if (x.tipo == 'rclick') {
                return x;
            }
        });
    }

    row = $(this).closest("tr");
    if (have_rclick.length > 0) {
        for (let a = 0; a < rclick[0].length; a++) {
            if (rclick[0][a].label == '99') {
                var elementos = rclick[0][a].datos.items;
            }
        }
        let html = ``;

        for (let i = 0; i < elementos.length; i++) {
            html += abrirMenu(elementos[i]);

        }
        $("#menuTabla").html(html);
        const bd = document.body.classList.contains(
            'sidebar-enable'
        );

        $('td').css('box-shadow', 'none');
        if (!bd) {
            var top = e.pageY;
            var left = e.pageX;
        } else {
            var top = e.pageY - 200;
            var left = e.pageX - 50;
        }

        $(this).css('box-shadow', 'inset 1px 1px 0px 0px red, inset -1px -1px 0px 0px red');
        $("#menuTabla").css({
            display: "block",
            top: top,
            left: left,
            "z-index": 99999
        });



    }

    return false;

});

function abrirMenu(elemento) {
    let html = ``;
    html += `<a class="dropdown-item ritem" id="rclick" data-id="` + elemento.id + `">` + elemento.titulo + `</a>`;
    return html;

}

$(document).on( "click","#guardar", async function(){

    if ($(base).children().length > 1) {
        if(parametros_emergente.length>0){
                let info = await ajax_peticion("/query/standard_query", { 'data': contruir(parametros_emergente) }, "POST");
                if(info.data.mensaje=="ok"){
                    Swal.fire({
                        title: '',
                        text: info.data.mensaje,
                        icon: 'success',
                        confirmButtonText: 'Aceptar'
                      });
                }else{
                    Swal.fire({
                        title: '',
                        text: info.data.mensaje,
                        icon: 'error',
                        confirmButtonText: 'Aceptar'
                      });
                }
                
        }
        $(base).children().last().removeClass("show");
    }

})


///Agregar
$(document).on("click", "#agregrar", async function () {
    let data = { "comando": "", "orden": $(this).attr("data-orden") };
    let info = await ajax_peticion("/query/standard_query", { 'data': JSON.stringify(data) }, "POST");
    let formulario = JSON.parse(info.settings["jsr"]);
    let html = ``;
    modal_id++;
    let modal = $(base).children().first().html().replaceAll("{}", modal_id);
    let modalsplit = modal.split("*");
    let titulo = '';
    let jstree = false;

    if ($(base).children().length > 1) {
        if(botones_emergente.length>0){
                let info = await ajax_peticion("/query/standard_query", { 'data': contruir(botones_emergente,window) }, "POST");
                if(info.data.mensaje=="ok"){
                    Swal.fire({
                        title: titulo_ventana,
                        text: info.data.mensaje,
                        icon: 'success',
                        confirmButtonText: 'Aceptar'
                      });
                }else{
                    Swal.fire({
                        title: titulo_ventana,
                        text: info.data.mensaje,
                        icon: 'error',
                        confirmButtonText: 'Aceptar'
                      });
                }
                
        }
        $(base).children().last().removeClass("show");
    }
    if (formulario.filtros != undefined) {
        formulario.filtros.forEach((element, index) => {
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
        })

        modalsplit[1] = html;
        modal = modalsplit.join("");
        modal = modal.replaceAll("#", titulo);

        $(base).append(modal);
        if (jstree) {
            pintarJstree("#base #modal" + modal_id + " #folder_jstree")
        }

        formulario.filtros.forEach((element, index) => {
            if(element.tipo.includes("select")){
                element.datos.id=element.datos.id==undefined?element.label.toLowerCase().replaceAll(" ","_"):element.datos.id;
                $("#"+ element.datos.id).selectpicker("refresh");
            }
        })
        
        if ($(base).children().length > 1) {
            $(base).children().last().modal("show");
            $(base).children().last().addClass("fade");
            $(base).children().last().addClass("show1");
        }
    }
});


$(document).on("change", "#filtrado", async function () {
    let filtrado = $(this).selectpicker("val");
    let data = { "tipo": filtrado, "comando": "loteria_x_tipo" }
    let info = await ajax_peticion("/query/standard_query", { "data": JSON.stringify(data) }, "POST");
    let html = info && generarHtml(info.data.data);
    if (html) {
        $("#loterias").html(html)
        $("#loterias").selectpicker("refresh")
    } else {
        Swal.fire({
            title: '',
            text: "Error en la busqueda de loterias",
            icon: 'error',
            confirmButtonText: 'Aceptar'
        });
    }
});

function generarHtml(list) {
    let html = ""
    list.forEach(function (element, index) {
        if (index == 0) {
            html += `<option value="todas" selected>Todas</option>`;
            html += `<option value="${element.loteria}"> ${element.loteria}</option>`;
        } else {
            html += `<option value="${element.loteria}">${element.loteria}</option>`;
        }
    });
    return html;
}


$(document).on('click', '#agregar_topes', async function () {
    let aplica = $("#aplica").selectpicker("val");
    let loterias = $("#loterias").selectpicker("val").join(",");
    let disponible = $("#disponible").val()
    let minutos = $("#minutos").val()
    let data = { "aplica_para": aplica, "loterias": loterias, "disponible": disponible, "minutos": minutos, "comando": "agregar_topes" };
    var info = await ajax_peticion("/query/standard_query", { 'data': JSON.stringify(data) }, "POST");
    if (info.data.mensaje == "ok") {
        Swal.fire({
            title: '',
            text: info.data.mensaje,
            icon: 'success',
            confirmButtonText: 'Aceptar'
        });
    } else {
        Swal.fire({
            title: '',
            text: 'Ocurrió un error inesperado, intente nuevamente',
            icon: 'error',
            confirmButtonText: 'Aceptar'
        });
    }
    $("#modal2").modal('hide');
    $("#modal2").removeClass("show1");
    $('#tabla1').removeClass('invisible');
    montar_tabla();
});

//

$(document).click(function () {
    var obj = $("#menuTabla");
    if (!obj.is(event.target) && !obj.has(event.target).length) {
        if ($("#menuTabla").css('display') == 'block') {
            $("#menuTabla").hide();
        }
        $('td').css('box-shadow', 'none');
    } else {
        $("#menuTabla").hide();
        $('td').css('box-shadow', 'none');
    }

});


$("#menuTabla a").on("click", function () {
    $(this).parent().hide();
});


$(document).on('click', '#rclick', async function () {
    let rclick = vtn[vtn.length - 1];
    let data = [];

    let etiq = [];
    let key;
    let value;
    for (let a = 0; a < rclick[0].length; a++) {
        if (rclick[0][a].label == '99') {
            var elementos = rclick[0][a].datos.items;
        }
    }
    let data_id = $(this).attr("data-id");

    if (data_id == 'f4') {
        hay_f4 = true;
    }

    for (let i = 0; i < elementos.length; i++) {

        if (elementos[i].id == data_id) {
            let comando = elementos[i].comando;
            let orden = elementos[i].orden;
            let parametros = elementos[i].parametros.split(",");
            let emergente = elementos[i].emergente;
            if (elementos[i].etiquetas != undefined && elementos[i].etiquetas.length > 0) {
                let etiquetas = elementos[i].etiquetas.split(",");
            }
            Object.assign(data, { "comando": comando, "orden": orden });
            for (let i = 0; i < parametros.length; i++) {
                if (Number.isInteger(parseInt(parametros[i]))) {
                    key = `c` + parametros[i];
                    value = row.find("td").eq(parseInt(parametros[i])).text();
                    Object.assign(parametros_segundo_envio, { [key]: value });
                    Object.assign(data, { [key]: value });
                } else {
                    if (parametros[i] == "f1") {
                        if ($("#" + parametros[i]).length < 1) {
                            let f = getCurrentDate(1);
                            Object.assign(data, { [parametros[i]]: f });
                        } else {
                            Object.assign(data, { [parametros[i]]: $('#' + parametros[i]).data('daterangepicker').startDate.format('YYYYMMDD') });
                        }
                    } else if (parametros[i] == "f1f2") {
                        if ($("#" + parametros[i]).length < 1) {
                            let f = getCurrentDate(1);
                            Object.assign(data, { [parametros[i]]: f });

                        } else {
                            Object.assign(data, { f1: $("#" + parametros[i]).data('daterangepicker').startDate.format('YYYYMMDD') });
                            Object.assign(data, { f2: $("#" + parametros[i]).data('daterangepicker').endDate.format('YYYYMMDD') });
                        }
                    } else {
                        if (!hay_mes) {
                            Object.assign(data, { [parametros[i]]: $('#' + parametros[i]).selectpicker('val') });
                        }
                    }
                }
            }
            //Saco las etiquetas
            for (let i = 0; i < etiquetas.length; i++) {
                if (Number.isInteger(parseInt(etiquetas[i]))) {
                    // key = `c`+etiquetas[i];
                    key = etq[etq.length - 1][etiquetas[i]];
                    value = row.find("td").eq(parseInt(etiquetas[i])).text();
                    Object.assign(etiq, { [key]: value });
                } else {
                    if (etiquetas[i] == "f1") {
                        if ($("#" + etiquetas[i]).length < 1) {
                            let f = getCurrentDate();
                            Object.assign(etiq, { Fecha: f });
                        } else {
                            Object.assign(etiq, { Fecha: $("#" + etiquetas[i]).data('daterangepicker').startDate.format('DD/MM/YYYY') });
                        }
                    } else if (etiquetas[i] == "f1f2") {
                        if ($("#" + etiquetas[i]).length < 1) {
                            let f = getCurrentDate();
                            Object.assign(etiq, { Fecha2: f });
                        } else {
                            Object.assign(etiq, { Desde: $("#" + etiquetas[i]).data('daterangepicker').startDate.format('DD/MM/YYYY') });
                            Object.assign(etiq, { Hasta: $("#" + etiquetas[i]).data('daterangepicker').endDate.format('DD/MM/YYYY') });
                        }
                    } else {
                        let str = etiquetas[i];
                        Object.assign(etiq, { [str.charAt(0).toUpperCase() + str.slice(1)]: $('#' + etiquetas[i]).selectpicker('val') });
                    }
                }
            }
            //Convierto para que se envien los parametros
            if (hay_f4) {
                Object.assign(data, { "comando": "csl_vtas_globalesf4a" });
                Object.assign(data, { "orden": "modalReporteGlobalf4" });
                let y = new Date().getFullYear();
                Object.assign(data, { "ano": y });
            }


            let keys = Object.getOwnPropertyNames(data).filter((x) => {
                return x != "length" ? x : "";
            });
            let valores = Object.values(data);
            let string = "{";
            keys.forEach((key, index) => {
                string += `"${key}":"${valores[index]}",`;
            })
            string = string.slice(0, string.length - 1);
            string += "}";
            var info = await ajax_peticion("/query/standard_query", { 'data': string }, "POST");
            let set = Object.values(JSON.parse(info.settings.jsr));
            let invisibles = [];
            let sumatorias = [];
            etq.push(info.data.head);
            vtn.push(set);
            extra.push(info.datos_extra);
            if (set[0].length > 0) {

                have_set.push(true);

                formulario_emergente = set[0].find(function (x) {
                    return x.tipo == 'formulario_emergente_date_year';
                });

                btns.push(set[0].filter(function (x) {
                    return x.label == 'Anular';
                }));

                invisibles = set[0].find(function (x) {
                    return x.label == '96';
                });

                sumatorias = set[0].find(function (x) {
                    return x.label == '97';
                });

                dclick = [];
                dclick.push(set[0].filter(function (x) {
                    if (x.tipo == 'dclick') {
                        return x;
                    }

                }));
                rclick = [];
                rclick.push([0].find(function (x) {
                    return x.tipo == 'rclick';
                }));

                if (dclick[0] != undefined) {
                    isdclick2 = true;
                }

                if (rclick[0] != undefined) {
                    isrclick2 = true;
                } else {
                    isrclick2 = false;
                }

                if (invisibles != undefined) {
                    invisibles = invisibles.datos.c_invisible.split(",");
                    invisibles = invisibles.map(function (x) {
                        return parseInt(x);
                    });
                } else {
                    invisibles = [];
                }


                if (sumatorias != undefined) {
                    sumatorias = sumatorias.datos.c_sumatoria.split(",");
                    sumatorias = sumatorias.map(function (x) {
                        return parseInt(x);
                    });
                } else {
                    sumatorias = [];
                }

            } else {
                btns.push();
                have_set.push(false);
                isdclick2 = false;
                isrclick2 = false;
            }


            let html = ``;
            if ($(base).children().length > 1) {
                $(base).children().last().removeClass("show");
            }
            modal_id++;
            let modal = $(base).children().first().html().replaceAll("{}", modal_id);
            let modalsplit = modal.split("*");
            let titulo = '';
            if (hay_f4) {
                if (formulario_emergente.tipo != "titulo") {
                    if (imp[formulario_emergente.tipo]) {
                        html += imp[formulario_emergente.tipo](formulario_emergente.label, formulario_emergente.datos)
                    }
                } else {
                    titulo = formulario_emergente.datos.id;
                }

                modalsplit[1] = html;
                modal = modalsplit.join("");
                modal = modal.replaceAll("#", titulo);
                $(base).append(modal);
                $("#f3").selectpicker("refresh");
                $('#tabla' + modal_id).removeClass('invisible');
                crear_tabla(info.data, "#tabla" + modal_id, "#thead" + modal_id, "#tbody" + modal_id, isdclick2, dclick, isrclick2, invisibles, sumatorias, [], 'Reporte Por Meses', "#modal" + modal_id);

                // if($(base).children().length>1){
                //     $('.modal-backdrop').addClass('show');
                //     $(base).children().last().addClass("fade");
                //     $(base).children().last().addClass("show1");
                //     $(base).children().last().modal("show");
                // }
            } if (emergente == "tabla") {
                let btn = btns[btns.length - 1];

                let labels_extra = extra[extra.length - 1];
                //Convierto para que se envien las etiquetas
                let algo = [];
                algo[0] = etiq;
                et = etiq;
                let keys = Object.getOwnPropertyNames(etiq).filter((x) => {
                    return x != "length" ? x : "";
                });
                let valores = Object.values(etiq);
                let string = "{";
                keys.forEach((key, index) => {
                    string += `"${key}":"${valores[index]}",`;
                })
                string = string.slice(0, string.length - 1);
                string += "}";
                let labels_modal = JSON.parse(string);
                if ($(base).children().length > 1) {
                    $(base).children().last().removeClass("show");
                }
                modal_id++;
                let modal = $(base).children().first().html().replaceAll("{}", modal_id);
                let modalsplit = modal.split("*");
                let string_divs = "";
                keys.forEach((key, index) => {
                    string_divs += `<div class='col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6'><p><label>${key}</label>:<label>${valores[index]}</label></p></div>`;
                });
                let button = ``;
                if (btn != undefined) {
                    if (btn.datos.condicion == "1") {
                        button += `<div class='col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6'><button type="button" class="btn btn-lg btn-danger" id="` + btn.datos.id + `">` + btn.label + `</button></div>`;
                    }
                }
                if (labels_extra.length > 0) {
                    let d = [];
                    d[0] = labels_extra[0];
                    let keys_extra = Object.getOwnPropertyNames(labels_extra[0]).filter((x) => {
                        return x != "length" ? x : "";
                    });
                    let valores_extra = Object.values(labels_extra[0]);
                    keys_extra.forEach((key, index) => {
                        string_divs += `<div class='col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6'><p><label>${key}</label>:<label>${valores_extra[index]}</label></p></div>`;
                    })
                }
                string_divs += button;
                modalsplit[1] = string_divs;
                modal = modalsplit.join("");
                modal = modal.replaceAll("#", titulo.charAt(0).toUpperCase() + titulo.slice(1).replaceAll("_", " "));
                $(base).append(modal);

                $('#tabla' + modal_id).removeClass('invisible');
                crear_tabla(info.data, "#tabla" + modal_id, "#thead" + modal_id, "#tbody" + modal_id, isdclick2, dclick, isrclick2, invisibles, sumatorias, labels_modal, titulo, "#modal" + modal_id);

            } else {
                Swal.fire({
                    title: '',
                    text: info.data.mensaje,
                    icon: 'success',
                    confirmButtonText: 'Aceptar'
                });
            }


        }
    }

});




async function pintarJstree(id) {
    let data = { "comando": "get_rec_treerojo" };
    let info = await ajax_peticion("/query/standard_query", { 'data': JSON.stringify(data) }, "POST");
    info.data.data = JSON.parse(JSON.stringify(info.data.data).replaceAll(".","_"));
    $(id).jstree({
        'core': {
            'check_callback': true,
            "themes": { "stripes": true },
            'data': info.data.data,
            'multiple': true

        },
        "types": {
            "root": {
                "icon": "fa-regular fa-building-lock"
            },
            "child": {
                "icon": "fa-regular fa-circle-user"
            }
        },
        'search': {
            'case_insensitive': true,
            'show_only_matches': true
        },
        "conditionalselect": function (node, event) {
            if(node.original.hijos==0){
                Swal.fire({
                    title: '',
                    text: "Seleccione el icono para poder ver los receptores que pueden tener agencias directas RECEPTORES DE COLOR AZUL",
                    icon: 'error',
                    confirmButtonText: 'Aceptar'
                  });
            }
            return node.original.hijos == 1;
        },
        'plugins': ['conditionalselect', 'types', 'search'],
        'themes': {
            'theme': 'apple',
            "dots": true,
            "icons": true
        },
        'plugins': ['search','conditionalselect', 'types', 'html_data', 'themes', 'ui']
    }).bind("loaded.jstree", function (e) {
        for (var i in info.data.data) {
            if (info.data.data[i].hijos === "1") {
                if(info.data.data[i].id.endsWith(".")){
                    info.data.data[i].id=info.data.data[i].id.substring(0,info.data.data[i].id.length-2);
                    $("#" + info.data.data[i].id + " >a").css("color", "blue")
                    $("#" + info.data.data[i].id + " >a >i").css("display", "none")
                }else{
                    $("#" + info.data.data[i].id + " >a").css("color", "blue")
                    $("#" + info.data.data[i].id + " >a >i").css("display", "none")
                }
            } else {
                $("#" + info.data.data[i].id.replaceAll(".", "") + " >a").css("color", "red");
                $("#" + info.data.data[i].id.replaceAll(".", "") + " >a >i").css("display", "none")
            }
        }
    }).on('search.jstree', function (nodes, str, res) {
        if (str.nodes.length===0) {
            try{
                $('#search').jstree(true).hide_all();
            }catch(e){
                Swal.fire({
                    title: '',
                    text: "No existen receptores con este nombre",
                    icon: 'error',
                    confirmButtonText: 'Aceptar'
                  });
            }
        }
    }).on("open_node.jstree", function () {
        for (var i in info.data.data) {
            if (info.data.data[i].hijos === "1") {
                $("#" + info.data.data[i].id.replaceAll(".", "") + " >a").css("color", "blue");
                $("#" + info.data.data[i].id.replaceAll(".", "") + " >a >i").css("display", "none");
            } else {
                $("#" + info.data.data[i].id.replaceAll(".", "") + " >a").css("color", "red");
                $("#" + info.data.data[i].id.replaceAll(".", "") + " >a >i").css("display", "none");
            }
        }
    }).on("select_node.jstree", function (e, data) {
        $(id).jstree().close_node($("#Todos"));
        window["receptor"] = data.node.id.replaceAll("_",".");
    });
    
}
var to = false;
$(document).on("keyup",id +"#search",function () {
    if(to) { clearTimeout(to); }
    to = setTimeout(function () {
      var v = $("#search").val();
      $("#base #modal2 #folder_jstree").jstree(true).search(v);
    }, 250);})




//Botones

$(document).on('click','td',async function(){
  
    var column = $(this).parent().children().index(this);
    var currentRow = $(this).closest("tr");
    let col_act = column;
    let row_act = $('#tabla1').DataTable().row( this ).index();
    
    if(column=="0"){
          alert("eliminar");   
    }else if(column==1){
        let data = { "comando": "", "orden": $(this).attr("data-orden") };
        let info = await ajax_peticion("/query/standard_query", { 'data': JSON.stringify(data) }, "POST");
        let formulario = JSON.parse(info.settings["jsr"]);
        let age = $('#tabla1').DataTable().row(currentRow).data()[5];
        data = { "comando": "cfg_agen_btnmo","c1":age};
        info = await ajax_peticion("/query/standard_query", { 'data': JSON.stringify(data) }, "POST");
        
        modal_id++;
        let modal = $(base).children().first().html().replaceAll("{}", modal_id);
        let modalsplit = modal.split("*");
        let titulo = '';
        let html=""
        if (formulario.filtros != undefined) {
            formulario.filtros.forEach((element, index) => {
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
                        if(element.tipo.includes("_value")){
                            let datos = info.data.data[0];
                            let keys = Object.getOwnPropertyNames(datos).filter((x)=>{
                                return x!="length"?x:"";
                            });
                            let valores= Object.values(datos);
                            

                            keys.forEach((key,i)=>{
                                    if(element.datos.id!=undefined){
                                        if(key==element.datos.id){
                                            element.datos.value=valores[i]
                                        }
                                    }else if(element.label!=undefined){
                                        if(key==element.label.toLowerCase().replaceAll(" ","_")){
                                            element.datos.value= valores[i]
                                    }
                                 }
                            })
                            
                        }
                        html += imp[element.tipo](element.label, element.datos, element.clase, element.style)
                    }
                    if(element.tipo.includes("button")){
                        parametros_emergente.push(element)
                    }
                } else {
                    titulo_ventana=element.datos.id;
                    titulo = element.datos.id;
                }
            })
       
            modalsplit[1] = html;
            modal = modalsplit.join("");
            modal = modal.replaceAll("#", titulo);
    
            $(base).append(modal);
            // if (jstree) {
            //     pintarJstree("#base #modal" + modal_id + " #folder_jstree")
            // }
    
            formulario.filtros.forEach((element, index) => {
                if(element.tipo.includes("select")){
                    if(element.tipo.includes("multi")){
                        let multi;
                        if(element.datos.value.startsWith('/')){
                            if(element.datos.value.endsWith('/')){
                                element.datos.value=element.datos.value.slice(1);
                                element.datos.value=element.datos.value.substr(0,element.datos.value.length - 1);
                                multi = element.datos.value.split('/');
                            }
                        }else{
                            multi = element.datos.value.split('/');
                        }
                        $("#"+element.label.toLowerCase().replaceAll(" ", "_")).selectpicker('val',multi);
                        $("#"+ element.label).selectpicker("refresh");
                    }
                    element.datos.id=element.datos.id==undefined?element.label.toLowerCase().replaceAll(" ","_"):element.datos.id;
                    $("#"+ element.datos.id).selectpicker("refresh");
                }else if(element.tipo.includes('check')){
                    if(element.datos.value==1){
                        $("#"+ element.datos.id).prop('checked', true);
                    }else if(element.datos.value=='S'){
                        $("#"+ element.datos.id).prop('checked', true);
                    }
                }   
            })
            
            if ($(base).children().length > 1) {
                $(base).children().last().modal("show");
                $(base).children().last().addClass("fade");
                $(base).children().last().addClass("show1");
            }

        
    
        
    }
}
    
})


