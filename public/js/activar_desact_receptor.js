import {ajax_peticion} from "./Ajax-peticiones.js";
import * as gestor from "./gestor.js";
$(document).ready(function () {
    //Jstree
    pintarJstree("#folder_jstree");
});

$(document).on("change",".swal2-select",function(){
    if($(this).val()=="M"){
        document.getElementById("swal-input2").style.display = "flex";
    }else{
        document.getElementById("swal-input2").style.display = "none";
    }
})

///jstree 
function customMenu(node) {
    // The default set of all items
    var items = {
        renameItem: { // The "rename" menu item
            label: "Solo Receptores",
            action: function () {
                Swal.fire({
                    title: 'Solo Receptoores',
                    html:`<select class="swal2-select" style="display: flex;width: 80%;margin-left: 10%;">
                            <option value="" disabled="">Seleccione una operación</option>  
                            <option value="A">Activar</option>
                            <option value="D">Desactivar</option>
                            <option value="M">Monto</option>
                        </select>` +
                      '<input id="swal-input2" placeholder="Monto" class="swal2-input" style="display:none;width: 80%;margin-left: 10%;">',
                    focusConfirm: false,
                    preConfirm: async () => {
                      if($(".swal2-select").val()!="M"){
                        if($(".swal2-select").val()=="D"){
                            let data={"receptor":node.id,"orden":"0","parametro":"D","comando":"cfg_rece_multi"}
                            let info =await ajax_peticion("/query/standard_query", {'data': JSON.stringify(data)}, "POST");
                            if(info.data.mensaje.includes("Desactivado solo receptores")){
                                gestor.alerta(info.data.mensaje,"success");
                            }else{
                                gestor.alerta(info.data.mensaje,"error");
                            }
                        }else{
                            let data={"receptor":node.id,"orden":"0","parametro":"A","comando":"cfg_rece_multi"}
                            let info =await ajax_peticion("/query/standard_query", {'data': JSON.stringify(data)}, "POST");
                            if(info.data.mensaje.includes("Activado solo receptores")){
                                gestor.alerta(info.data.mensaje,"success");
                            }else{
                                gestor.alerta(info.data.mensaje,"error");
                            }
                        }
                      }else{

                        if(document.getElementById('swal-input2').value!="" && !isNaN(parseInt(document.getElementById('swal-input2').value))){
                            let data={"receptor":node.id,"orden":"0","parametro":"M","monto":document.getElementById('swal-input2').value,"comando":"cfg_rece_multi"}
                            let info =await ajax_peticion("/query/standard_query", {'data': JSON.stringify(data)}, "POST");
                            if(info.data.mensaje.includes("Asignado Max.Dueda para")){
                                gestor.alerta(info.data.mensaje,"success");
                            }else{
                                gestor.alerta(info.data.mensaje,"error");
                            }
                        }else{
                            gestor.alerta("Monto no puede ser vacio o tiene valores alfabeticos","error");
                        }
                      }
                    }
                  })
            }
        },
        deleteItem: { // The "delete" menu item
            label: "Receptores y Agencias",
            action: function () {
                Swal.fire({
                    title: '¿Estas seguro?',
                    text: "Que deseas desactivar este receptores y sus agencias!",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Si!',
                    cancelButtonText: 'No!'
                  }).then(async (result) => {
                    if (result.isConfirmed) {
                        let data={"receptor":node.id,"orden":"1","parametro":"D","comando":"cfg_rece_multi"}
                        let info =await ajax_peticion("/query/standard_query", {'data': JSON.stringify(data)}, "POST");
                        if(info.data.mensaje.includes("Desactivado receptores y agencias")){
                            gestor.alerta(info.data.mensaje,"success");
                        }else{
                            gestor.alerta(info.data.mensaje,"error");
                        }
                    }
                  })
            }
        }
    };

    return items;
}

async function pintarJstree(id){
    let data = {"comando":"get_rec_tree"};
    let info =  await ajax_peticion("/query/standard_query", {'data': JSON.stringify(data)}, "POST"); 
    info.data.data=JSON.parse(JSON.stringify(info.data.data).replaceAll("\"#\"","\"Todos\""));
    info.data.data[0].parent="#"
    $(id).jstree({
        'core': {
            'check_callback': true,
            "themes": { "stripes": true },
            'data': info.data.data,
            'multiple': true
        },
        "types" : {
            "root" : {
              "icon" : "fa-regular fa-building-lock"
            },
            "child" : {
                "icon" : "fa-regular fa-circle-user"
            }
        },
        'search': {
            'case_insensitive': true,
            'show_only_matches' : true
        },
        'plugins': ['contextmenu','types' ,'search'],
        'themes': {
            'theme': 'apple',
            "dots": true,
            "icons": true
        },
        'plugins': ['contextmenu', 'search','types', 'html_data', 'themes', 'ui'],
        'contextmenu' : {items: customMenu}
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
    });
}