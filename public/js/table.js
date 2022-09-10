export async function crear_tabla(parametro,tb,hd,bd){
   
    let html=``;
    let head =``;
    head+=crear_head(parametro.head);
    let body =``
    body = crear_body(parametro.data);
    await $(tb).DataTable().clear();    
    await $(tb).DataTable().destroy();
    html += head+body;
    $(hd).html(head);
    $(bd).html(body);
    var inv = [1,2,6,7,8,12];
    var vis = [];
    for(var i=0;i<parametro.head.length-1;i++){
        if(!inv.includes(i)){
            vis.push(i);
        }
    }
        $(tb).DataTable({   
            destroy: true,
            columnDefs:  [{ targets: inv, visible: false }],
            language: {
                "url": "//cdn.datatables.net/plug-ins/1.10.24/i18n/Spanish.json"
            },
            "dom": 'Bftip',
            "buttons": [
                {
                    extend: 'pdf',
                    exportOptions: {
                        columns: vis,
                        modifier: {
                            page: 'current'
                        }
                    }
                },
                {
                    extend: 'print',
                    text: 'Imprimir',
                    exportOptions: {
                        columns: vis,
                        modifier: {
                            page: 'current'
                        },
                        customize: function ( win ) {
                            $(win.document.body)
                                .css( 'font-size', '10pt' )
                                .prepend(
                                    '<img src="https://i.pinimg.com/originals/a9/4d/f4/a94df4a6fe1f740cd82d245e718e831b.png" style="position:absolute; top:0; left:0;" />'
                                );
                                $(win.document.body).find( 'table' )
                            .addClass( 'compact' )
                            .css( 'font-size', 'inherit' );
                
                        }
                        
                    }
                },
                {
                    extend: 'excelHtml5',
                    exportOptions: {
                        columns: vis,
                        modifier: {
                            page: 'current'
                        }
                    }
                },
            'pageLength', {
                extend: 'colvis',
                columns: vis,
            },
            ],
            "processing":true,
            "pageLength": 10,
            "lengthMenu": [ [10, 50, 100, -1], [10, 50, 100, "Todos"] ],
            "responsive": true,
            "ordering": false,
            "select": true,

            initComplete: function () {
                $("#load").removeClass("spinner");
                $("#carga").removeClass("carga");
                $("#carga").removeAttr( 'style' );
            }


         });
}

function crear_head(data){
    let head = `<tr>`;
    for(var i in data){
        head+=`<th>`+data[i]+`</th>`;
    }
    head+=`</tr>`;
    return head;
}

function crear_body(data){
    let body = ``;
    for(var i in data){
        body+=`<tr>`
        for(var a in data[i]){
             body+=`<td>`+data[i][a]+`</td>`;
        }
        body+=`</tr>`
    }
    body+=``;

    return body
}





  