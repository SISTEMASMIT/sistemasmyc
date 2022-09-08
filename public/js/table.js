
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

    $(tb).DataTable({
        "pageLength": 10,
        "lengthMenu": [ 10, 25, 50, 75, 100 ],
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