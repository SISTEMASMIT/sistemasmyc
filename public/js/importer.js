export function formulario_emergente_input_text(label,json,clase,style){
    let c = clase!="1" && clase!=undefined ?clase:"col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12";
    return `<div class='${c} filtros'><label class='form-label'>${label}</label>
    <input class='form-control form-control-lg' id='${json.id!=undefined?json.id:label}' type='numeric' placeholder='${label}' required>
    </div>`
}

export function formulario_emergente_input_int(label,json,clase,style){
    let c = clase!="1" && clase!=undefined ?clase:"col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12";
    return `<div class='${c} filtros'><label class='form-label'>${label}</label>
    <input class='form-control form-control-lg' id='${json.id!=undefined?json.id:label}' type='numeric' placeholder='${label}' required>
    </div>`
}

export function formulario_emergente_input_text_value(label,json,clase,style){
    let c = clase!="1" && clase!=undefined ?clase:"col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12";
    return `<div class='${c} filtros'><label class='form-label'>${label}</label>
    <input class='form-control form-control-lg' id='${json.id!=undefined?json.id:label}' type='numeric' value="${json.value!=undefined?json.value:""}" placeholder='${label}' required>
    </div>`
}

export function formulario_emergente_input_int_value(label,json,clase,style){
    let c = clase!="1" && clase!=undefined ?clase:"col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12";
    return `<div class='${c} filtros'><label class='form-label'>${label}</label>
    <input class='form-control form-control-lg' id='${json.id!=undefined?json.id:label}' type='numeric' value="${json.value!=undefined?json.value:""}"placeholder='${label}' required>
    </div>`
}

export function formulario_emergente_label_value(label,json,clase,style){
    let c = clase!="1" && clase!=undefined ?clase:"col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12";
    return `<div class='${c} filtros'><label class='form-label'>${label}</label>
    <label class='form-label' id='${json.id!=undefined?json.id:label}'>${json.value!=undefined?json.value:""}</label>
    </div>`
}

export function formulario_emergente_label_value_check(label,json,clase,style){
    let c = clase!="1" && clase!=undefined ?clase:"col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12";
    return `<div class='${c} filtros'><label class='form-label'>${label}</label>
    <label class='form-label' id='${json.id!=undefined?json.id:label}_label'>${$("#"+json.id).selectpicker("val")}</label>
    </div>`
}



export function formulario_emergente_date(label,json,clase,style){
    return `<div class='col-12 col-sm-6 col-md-4 col-lg-3 col-xl-3 filtros'><label class='form-label'>${label}</label>
    <input type='text' class='form-control form-control-lg' id='${json.id!=undefined?json.id:label}'>
    </div>`
}
export function formulario_emergente_select(label,json,clase,style){
   try{
    let c = clase!="1" && clase!=undefined ?clase:"col-12 col-sm-6 col-md-4 col-lg-3 col-xl-3";
        let html=`<div class='${c}  filtros'><label class='form-label'>${label}</label>
        <select class='selectpicker' id='${label.toLowerCase().replaceAll(" ", "_")}'>`
        json.forEach((elemento,index)=>{
            if(elemento.id==undefined){
                elemento.id=elemento.label
            }
            if(index==0){
                html+=`<option value='${elemento.id}'  selected>${elemento.label}</option>`
            }
             else {
                html+=`<option value='${elemento.id}' >${elemento.label}</option>`
            }
        })
        html+=`</select></div>`;
        return html;
   }catch(e){
    console.log(e)
   }
}


export function formulario_emergente_select_value(label,json,clase,style){
    try{
         let html=`<div class='col-12 col-sm-6 col-md-4 col-lg-3 col-xl-3 filtros'><label class='form-label'>${label}</label>
         <select class='selectpicker' id='${label.toLowerCase().replaceAll(" ", "_")}'>`
         json.forEach((elemento,index)=>{
             if(elemento.id==undefined){
                 elemento.id=elemento.label
             }
             if(elemento.id==json.value){
                 html+=`<option value='${elemento.id}' selected>${elemento.label}</option>`
             }
              else {
                 html+=`<option value='${elemento.id}' >${elemento.label}</option>`
             }
         })
         html+=`</select></div>`;
         return html;
    }catch(e){
     console.log(e)
    }
 }


 export function formulario_emergente_multiselect_value(label,json,clase,style){
    try{
         let html=`<div class='col-12 col-sm-6 col-md-4 col-lg-3 col-xl-3 filtros'><label class='form-label'>${label}</label>
         <select class='selectpicker' id='${label.toLowerCase().replaceAll(" ", "_")}' multiple>`
         json.forEach((elemento,index)=>{
             if(elemento.id==undefined){
                 elemento.id=elemento.label
             }
             if(elemento.id==json.value){
                 html+=`<option value='${elemento.id}'>${elemento.label}</option>`
             }
              else {
                 html+=`<option value='${elemento.id}' >${elemento.label}</option>`
             }
         })
         html+=`</select></div>`;
       
         return html;
    }catch(e){
     console.log(e)
    }
 }


export function formulario_emergente_select_search(label,json,clase,style){
    try{
        let c = clase!="1" && clase!=undefined ?clase:"col-12 col-sm-6 col-md-4 col-lg-3 col-xl-3";
         let html=`<div class='${c}  filtros'><label class='form-label'>${label}</label>
         <select class='selectpicker'data-live-search='true' id='${label.toLowerCase().replaceAll(" ", "_")}'>`
         json.forEach((elemento,index)=>{
             if(elemento.id==undefined){
                 elemento.id=elemento.label
             }
             if(index==0){
                 html+=`<option value='${elemento.id}'  selected>${elemento.label}</option>`
             }
              else {
                 html+=`<option value='${elemento.id}' >${elemento.label}</option>`
             }
         })
         html+=`</select></div>`;
         return html;
    }catch(e){
     console.log(e)
    }
 }

export function formulario_emergente_select_search_shadow(label,json,clase,style){
    try{
        let c = clase!="1" && clase!=undefined ?clase:"col-12 col-sm-6 col-md-4 col-lg-3 col-xl-3";
         let html=`<div class='${c}  filtros'><label class='form-label'>${label}</label>
         <select class='selectpicker' data-live-search='true' id='${label.toLowerCase().replaceAll(" ", "_")}'>`
         json.forEach((elemento,index)=>{
             if(elemento.id==undefined){
                 elemento.id=elemento.label
             }
             if(index==0){
                 html+=`<option value='${elemento.id}'  data-subtext="${elemento.id}" selected>${elemento.label}</option>`
             }
              else {
                 html+=`<option value='${elemento.id}'  data-subtext="${elemento.id}">${elemento.label}</option>`
             }
         })
         html+=`</select></div>`;
         return html;
    }catch(e){
     console.log(e)
    }
 }
export function formulario_emergente_select_multiple(label,json,clase,style){
    try{
        let c = clase!="1" && clase!=undefined ?clase:"col-12 col-sm-6 col-md-4 col-lg-3 col-xl-3";
         let html=`<div class='${c}  filtros'><label class='form-label'>${label}</label>
         <select class='selectpicker' id='${label.toLowerCase().replaceAll(" ", "_")}' data-live-search='true' data-selected-text-format='count' multiple>`
         json.forEach((elemento,index)=>{
             if(elemento.id==undefined){
                 elemento.id=elemento.label
             }
             if(index==0){
                 html+=`<option value='${elemento.id}' selected>${elemento.label}</option>`
             }
              else {
                 html+=`<option value='${elemento.id}'>${elemento.label}</option>`
             }
         })
         html+=`</select></div>`;
         return html;
    }catch(e){
     console.log(e)
    }
 }
export function button_emergente(label,json,clase,style){
    let orden = json.orden!="" && json.orden!= undefined && json.orden
    return `<div class='col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 filtros'>
    <button type='button' id='${json.id}' class='btn-lg btn-block btn-success' data-orden="${orden}">${label}</button>
    </div>`
}

export function formulario_emergente_date_year(label,json,clase,style){
    try{
        let html=`<div class='col-12 col-sm-6 col-md-4 col-lg-3 col-xl-3 filtros'><label class='form-label'>${label}</label>
        <select class='selectpicker' id='${json.id}'>`
        let arreglo=Array(json.num_max_pass).fill(0)
        let y = new Date().getFullYear();
        let anos =arreglo.map((e,i)=>{
            return y-i;
        })
        anos.forEach((elemento,index)=>{
            if(index==0){
                html+=`<option value='${elemento}' selected>${elemento}</option>`
            }
             else {
                html+=`<option value='${elemento}'>${elemento}</option>`
            }
        })
        html+=`</select></div>`;
        return html;
   }catch(e){
    console.log(e)
   }
}

export function formulario_checkbox(label,json,clase,style){
    let c = clase!="1" && clase!=undefined ?clase:"col-6 col-sm-3 col-md-3 col-lg-2 col-xl-2";   
    return `<div class="${c} form-check">
    <input class="form-check-input" type="checkbox" value="" id="${json.id}">
    <label class="form-check-label" for="flexCheckDefault">
      ${label}
    </label>
  </div>`
}

export function formulario_checkbox_value(label,json,clase,style){
    let c = clase!="1" && clase!=undefined ?clase:"col-6 col-sm-3 col-md-3 col-lg-2 col-xl-2";   
    return `<div class="${c} form-check">
    <input class="form-check-input" type="checkbox" value="" id="${json.id}">
    <label class="form-check-label" for="flexCheckDefault">
      ${label}
    </label>
  </div>`
}
