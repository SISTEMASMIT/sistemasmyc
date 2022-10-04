export function formulario_emergente_input_text(label,json){
    return `<div class='col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 filtros'><label class='form-label'>${label}</label>
    <input class='form-control form-control-lg' id='${json.id!=undefined?json.id:label}' type='numeric' placeholder='${label}' required>
    </div>`
}

export function formulario_emergente_input_int(label,json){
    return `<div class='col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 filtros'><label class='form-label'>${label}</label>
    <input class='form-control form-control-lg' id='${json.id!=undefined?json.id:label}' type='numeric' placeholder='${label}' required>
    </div>`
}


export function formulario_emergente_date(label,json){
    return `<div class='col-12 col-sm-6 col-md-4 col-lg-3 col-xl-3 filtros'><label class='form-label'>${label}</label>
    <input type='text' class='form-control form-control-lg' id='${json.id!=undefined?json.id:label}'>
    </div>`
}
export function formulario_emergente_select(label,json){
   try{
        let html=`<div class='col-12 col-sm-6 col-md-4 col-lg-3 col-xl-3 filtros'><label class='form-label'>${label}</label>
        <select class='selectpicker' id='${label.toLowerCase().replaceAll(" ", "_")}'>`
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
export function formulario_emergente_select_multiple(label,json){
    try{
         let html=`<div class='col-12 col-sm-6 col-md-4 col-lg-3 col-xl-3 filtros'><label class='form-label'>${label}</label>
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
export function button_emergente(label,json){
    return `<div class='col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 filtros'>
    <button type='button' id='${json.id}' class='btn-lg btn-block btn-success'>${label}</button>
    </div>`
}

export function formulario_emergente_date_year(label,json){
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