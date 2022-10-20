var totalTime = 50;
export async function crear_tabla(parametro,tb,hd,bd,isd,dc,isr,inv,sum,labels,titulo,modal){
   
    let html=``;
    let head =``;
    head+=crear_head(parametro.head);
    let body =``
    body = crear_body(parametro.data);
    await $(tb).DataTable().clear();    
    await $(tb).DataTable().destroy();
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
    

    var table = $(tb).DataTable({   

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
            },
            // select: {
            //     style:    'multi',
            //     selector: 'td:first-child'
            // },
            scrollX: true,
            processing: true,
            destroy: true,
            // ordering: false,
            columnDefs:  [{ targets: inv, visible: false}],
            language: {
                "url": "//cdn.datatables.net/plug-ins/1.10.24/i18n/Spanish.json"
            },
            
            // dom: 'lifrtip',blank
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
                if(isNaN(sum)){
                    sum=[];
                }
                var api = this.api(), data;
                var colNumber = sum;
     
                var intVal = function (i) {
                    return typeof i === 'string' ?
                            i.replace(/[, ]|(\.\d{2})/g, "") * 1 :
                            typeof i === 'number' ?
                            i : 0;
                };
                for (i = 0; i < colNumber.length; i++) {
                    var colNo = colNumber[i];
                    var total2 = api
                            .column(colNo)
                            .data()
                            .reduce(function (a, b) {
                                return intVal(a) + intVal(b);
                            }, 0);
                    $(api.column(colNo).footer()).html('<h5 class="total">TOTAL '+ total2+' </h5>');
                }
            },
            
            initComplete: function () {
                if(modal!=undefined){
                    $(modal).modal('show');
                    $(modal).addClass("show1");
                }
              
                $("#load").removeClass("spinner");
                $("#carga").removeClass("carga");
                $("#carga").removeAttr( 'style' );
                
                totalTime = 50;
                // table.columns.adjust().draw();
                // updateClock();
                if(tb!="#tabla1"){
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
    head += `<th ></th>
    <th ></th>`;
    for(var i in data){
        head+=`<th >`+data[i]+`</th>`;
    }
    head+=`</tr>`;
    return head;
}

function crear_body(data){
    let body = ``;
    for(var i in data){
        body+=`<tr>`
        body+=`<td><button class="btn-sm btn-danger"  id="eliminar"><i class="fa-solid fa-trash"></i></button></td>
        <td><button class="btn-sm btn-info" data-orden="modalEditarAgencia" id="editar"><i class="fa-solid fa-pen-to-square"></i></button></td>`;
        for(var a in data[i]){
            if(Number.isInteger(parseInt(data[i][a]))){
                body+=`<td class="num_aling">`+data[i][a]+`</td>`;
            }else{
                body+=`<td>`+data[i][a]+`</td>`;
            }
             
        }
        body+=`</tr>`
    }
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

  