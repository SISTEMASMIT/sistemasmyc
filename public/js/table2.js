var totalTime = 50;
var sumados=[];
export function crear_tabla(table){
    let parametro = table["parametro"];
    let tb = table["tb"];
    let hd = table["hd"];
    let bd = table["bd"];
    let isd = table["isd"];
    let dc = table["dc"];
    let isr = table["isr"];
    let inv = table["inv"];
    let sum = table["sum"];
    let labels = table["labels"];
    let titulo = table["titulo"];
    let modal = table["modal"];
    let moneda = table["moneda"];
    
    let html=``;
    let head =``;
    head+=crear_head(parametro.head);
    let body =``
    if(sum!=undefined){
        if(sum.length>0){
            sumados=sum;
            body = crear_body_sum(parametro.data);
        }else{
            body = crear_body(parametro.data);
        }
    }else{
        body = crear_body(parametro.data);
    }
    $(tb).DataTable().clear();    
    $(tb).DataTable().destroy();
    let tf = tb + " tfoot";
    $(tf).remove();    
    html += head+body;
    $(hd).html(head);
    $(bd).html(body);
    var vis = [];
    for(var i=0;i<parametro.head.length-1;i++){
        if(!inv.includes(i)){
            vis.push(i);
        }
    }

    let msj = ``;
    for (var label in labels) {
        msj+=label+` : `+labels[label]+`  -  `;
    }
            
    $(tb).append(
        $('<tfoot/>').append( $(tb+" thead tr").clone() )
    );
     $(tb).DataTable({   

            //configurar el hover del dclick
            rowCallback: function(row, data, index){
                
            if(isd){
                for (let i = 0; i < dc[0].length; i++) {
                    if(dc[0][i].label==98){
                        $(row).addClass('dclick');
                    }else{
                        $(row).find('td:eq('+dc[0][i].label+')').addClass('dclick');
                    }         
                }
                
            }
            if(isr){
                $(row).addClass('rclick');
            }
            //   if(data[2].toUpperCase() == 'EE'){
            //       $(row).find('td:eq(2)').css('color', 'blue');
            //   }
            },
            scrollX: true,
            processing: true,
            destroy: true,
            // ordering: false,
            columnDefs:  [{ targets: inv, visible: false}],
            language: {
                "url": "//cdn.datatables.net/plug-ins/1.10.24/i18n/Spanish.json"
            },
            
            // dom: 'lifrtip',
            "dom": '<"top"B>iftl<"bottom"p><"clear">',
            "buttons": [
                'pageLength', {
                    extend: 'colvis',
                    columns: vis,
            },
            {
                extend: 'print',
                text: '<i class="fa-solid fa-print"></i> Imprimir',
                footer: true,
                className: 'btn-info btn-sm ', 
                autoPrint: true,
                title: function(){
                    return titulo             
                },
                customize: function ( win ) {
        

                    var hoy = new Date();
                    var fecha = hoy.getDate() + '-' + ( hoy.getMonth() + 1 ) + '-' + hoy.getFullYear();
                    var hora = hoy.getHours() + ':' + hoy.getMinutes() + ':' + hoy.getSeconds();
                    var html = `<div class="row" style="margin-left: 3%;">`;
                    let tam = Object.values(labels).length;
                    for (var label in labels) {
                        html+=`<div class='col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6'><label>`+label+`</label>: <label>`+labels[label]+`</label></div>`;
                    }
                    html+=`</div>`;
                        $(win.document.body)
                        .css( 'font-size', '10pt' )
                        .prepend(
                            ``+html+``
                        );
                        $(win.document.body)
                        .css( 'font-size', '10pt' )
                        .prepend(
                            `<div class="row" style="margin-left: 3%;"><h5>Reporte generado: `+fecha+` - `+hora+`</h5></div>`
                        );

                    $(win.document.body).find( 'table' )
                    .addClass( 'compact' )
                    .css( 'font-size', 'inherit' );
        
                },
                exportOptions: {
                    columns: vis,
                    modifier: {
                        page: 'current'
                    },      
                }
            },
            {
                extend: 'excelHtml5',
                text: '<i class="fa-solid fa-file-excel"></i> Excel',
                stripHtml: false,
                footer: true,
                messageTop: msj,
                className: 'btn-success btn-sm ', 
                exportOptions: {
                    columns: vis,
                    modifier: {
                        page: 'current'
                    }
                }
            },
            ],
            "pageLength": 10,
            "lengthMenu": [ [10, 50, 100, -1], [10, 50, 100, "Todos"] ],
            "responsive": false,
            // "select": true,
            "footerCallback": function (row, data, start, end, display) {
                if(sum.length==0){
                    sum=[];
                }
                var api = this.api(), data;
                var colNumber = sum;
     
                var intVal = function (i) {
                    i = i.toString().replace(/[_$,\s]/g, '');
                    i = parseFloat(i);
                    if(typeof(i)==='string'){
                        return 0;
                    }else if(typeof(i)==='number'){
                        return i;
                    }
                };
                for (i = 0; i < colNumber.length; i++) {
                    var colNo = colNumber[i];
                    var total3 = api
                    .column(colNo)
                    .data()
                    .reduce(function (a, b) {
                        return intVal(a) + intVal(b);
                    }, 0);
                    var total2 = api
                            .column(colNo, {page: 'current'})
                            .data()
                            .reduce(function (a, b) {
                                return intVal(a) + intVal(b);
                            }, 0);
                    const formato = new Intl.NumberFormat('en-US', { /*style: 'currency', currency: 'USD',*/ minimumFractionDigits: 2, maximumFractionDigits: 2 });
                    $(api.column(colNo).footer()).html('<h6 class="total">Sum: '+ formato.format(total2)+' </h6>');
                    $(api.column(colNo).footer()).append('<h6 class="total">Total: '+ formato.format(total3)+' </h6>');
                }
            },
            
            initComplete: function () {
                if(modal!=undefined){
                    $(modal).modal('show');
                    $(modal).addClass("show1");
                }
                $("#load_"+moneda).removeClass("spinner");
                $("#carga_"+moneda).removeClass("carga");
                $("#carga_"+moneda).removeAttr( 'style' );
                
                totalTime = 50;
                // table.columns.adjust().draw();
                // updateClock();
                if(tb!="#tabla_"+moneda){
                    setTimeout(function() { 
                        $(tb).DataTable().columns.adjust();
                        // this.input.nativeElement.focus();
                    }, 200);
                }
            }
         });
         

            
        //  table.columns.adjust().draw();



    


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
    const formato = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2, maximumFractionDigits: 2 });
    let body = ``;
    for(var i in data){
        body+=`<tr>`
            for(var a in data[i]){
                if(data[i][a]==null)data[i][a]='';
                if(Number.isInteger(parseInt(data[i][a]))){
                    body+=`<td class="num_aling">`+data[i][a]+`</td>`;
                }else{
                    if(data[i][a].includes('~')){
                        let row = data[i][a].split('~');
                        body+=`<td style="background-color: #`+row[1]+`">`+row[0]+`</td>`;
                    }else{

                        body+=`<td>`+data[i][a]+`</td>`;
                    }
                }
        }
        body+=`</tr>`
    }
    body+=``;

    return body
}

function crear_body_sum(data){
    const formato = new Intl.NumberFormat('en-US', { /*style: 'currency', currency: 'USD',*/ minimumFractionDigits: 2, maximumFractionDigits: 2 });
    let body = ``;
    data.forEach((elemento)=>{
        body+=`<tr>`
        elemento=Object.values(elemento);
           elemento.forEach((row,i)=>{
                if(sumados.find( e=> e==i)){
                    if(row==null)row='';
                    row = row.toString();
                    row=row.replaceAll(',','');
                    body+=`<td class="num_aling">`+formato.format(row)+`</td>`;
                }else{
                    if(Number.isInteger(parseInt(row))){
                        body+=`<td class="num_aling">`+row+`</td>`;
                    }else{
                        if(row.includes('~')){
                            row = row.split('~');
                            body+=`<td style="background-color: `+row[1]+`">`+row[0]+`</td>`;
                        }else{
                            body+=`<td>`+row+`</td>`;
                        }
                    }
                }
           })
           body+=`</tr>`
        })
    body+=``;

    return body
}

function crear_foot(data){
    let foot = `<tr>`;
    for(var i in data){
        foot+=`<th>`+data[i]+`</th>`;
    }
    foot+=`</tr>`;

    return foot
}



function updateClock() {
    document.getElementById('countdown').innerHTML = totalTime;
    if(totalTime==0){
    
    }else{
    totalTime-=1;
    setTimeout(()=>{updateClock()},1000);
    }
}

  