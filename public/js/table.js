export function crear_tabla(parametro,tb,hd,bd){
    let html=``;
    let head =``;
    head+=crear_head(parametro.head);
    let body =``
    body = crear_body(parametro.data);
    let foot = `</table>`;
    html += head+body+foot;
    $(hd).html(head);
    $(bd).html(body);
    var inv = [0,1,2,6,7,8,12];
    var vis = [];

    console.log(parametro.head.length);
    for(var i=0;i<parametro.head.length-1;i++){
        if(!inv.includes(i)){
            vis.push(i);
        }
    }

    var table = $(tb).DataTable({
        "language": {
            "lengthMenu": "Muestra _MENU_ registros por página",
            "zeroRecords": "Nada encontrado - sorry",
            "info": "Mostrando Página _PAGE_ de _PAGES_",
            "infoEmpty": "No se encuentra resultado",
            "infoFiltered": "(buscado en _MAX_ registros)"
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
        "columnDefs":  [{ targets: inv, visible: false }],
        "pageLength": 10,
        "lengthMenu": [ [10, 50, 100, -1], [10, 50, 100, "Todos"] ],
        "autoFill": true,
        "responsive": true,
        "select": true
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
