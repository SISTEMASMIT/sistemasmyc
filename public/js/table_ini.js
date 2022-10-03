export function ini_tabla(id,monedas){
    crear_base(id,monedas);
    var columns = 6;
    var rows = 10;
    var head = crear_head(columns);
    var body = crear_body(columns,rows);
    var html=head+body;
    monedas.forEach(moneda => {
        $(`#tablaf_`+moneda).html(html);
        $(`#tablaf_`+moneda).DataTable();
    });
    
}

function crear_base(id,monedas){
    let html=`<div class="tabs">
                <nav class="tab-list">`;
    monedas.forEach((moneda,index)=> {
        if(index==0){
            html+=`<a class="tab active" href="#tab-`+moneda+`">`+moneda+`</a>`;
        }else{
            html+=`<a class="tab" href="#tab-`+moneda+`">`+moneda+`</a>`;
        }
    });
    html+=`</nav>`;
    monedas.forEach((moneda,index) => {
        if(index==0){
            html+=`<div class="tab-content show" id="tab-`+moneda+`">`;
        }else{
            html+=`<div class="tab-content" id="tab-`+moneda+`">`;
        }

        html+=`<div id="carga_`+moneda+`"><div id="load_`+moneda+`"></div></div>
            <div id="tabla_res_`+moneda+`" class="espaciadoT">
                <div id="f_`+moneda+`"><table id="tablaf_`+moneda+`" class="cell-border nowrap" style="width:100%"></table></div>
                    <table id="tabla1_`+moneda+`" class="cell-border display nowrap invisible" style="width:100%">
                        <thead class="thead" id="thead1_`+moneda+`">
                            <tr><th></th></tr>
                        </thead>
                        <tbody id="tbody1_`+moneda+`">
                            <tr><td></td></tr>
                        </tbody>
                    </table>
                <div class="dropdown-menu" aria-labelledby="dropdownMenuButton" id="menuTabla_`+moneda+`"></div>
            </div>
        </div>`
    });
   html+=`</div>`;
   $(id).append(html);
}

function crear_head(data){
    let head = `<thead><tr>`;
    for(var i=0; i<data;i++){
        head+=`<th>-</th>`;
    }
    head+=`</tr></thead>`;
    return head;
}

function crear_body(columns, rows){
    let body = `<tbody>`;
    for(var a =0; a< rows; a++){
        body+=`<tr>`;
        for(var i=0; i<columns;i++){
            body+=`<td>-</td>`;
        }
        body+=`</tr>`
    }
    body+=`</tbody>`;
    return body;
}


