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
        "dom": 'Bfrtip',
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
        'pageLength'
        ],
        "pageLength": 10,
        "lengthMenu": [ [10, 50, 100, -1], [10, 50, 100, "Todos"] ],
        "responsive": true,
        "ordering": false,
        "select": true,
     });
    //  $(tb).DataTable().clear();
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
