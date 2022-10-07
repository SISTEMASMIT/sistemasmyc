export function contruir(botones_emergente){
                let formulario_parametros=botones_emergente[(botones_emergente.length)-1].datos.parametros.split(",");
                let parametros_data=botones_emergente[(botones_emergente.length)-1].datos.parametros_data!=undefined?botones_emergente[(botones_emergente.length)-1].datos.parametros_data.split(","):[];
                let param= new Object();
                param.parametros=Array();
                formulario_parametros.map((f)=>{
                    let o= Object();    
                    let data=f.split(":")
                    if(data[1]=="select"){
                        o.index=data[0];
                        o.valor=$("#"+data[0]).selectpicker("val")    ;
                    }else
                    if(data[1]=="text" || data[1]=="int"){
                        o.index=data[0];
                        o.valor=$("#"+data[0]).val();
                    }else
                    if(data[1]=="check"){
                        o.index=data[0];
                        o.valor=$("#"+data[0]).prop('checked')?1:0;
                    }
                    param.parametros.push(o)
                });
                parametros_data.map((f)=>{
                    let o= Object();
                    o.valor=window[f]
                    o.index=f
                    param.parametros.push(o)
                });
                let peticion="{";
                if(botones_emergente[(botones_emergente.length)-1].datos.comando!=undefined){
                    peticion+=`"comando":"${botones_emergente[(botones_emergente.length)-1].datos.comando}",`
                }else if(botones_emergente[(botones_emergente.length)-1].datos.orden!=undefined){
                    peticion+=`"orden":"${botones_emergente[(botones_emergente.length)-1].datos.orden}",`
                }
                param.parametros.forEach(p=> peticion+=`"${p.index}":"${p.valor}",`)
                peticion=peticion.slice(0,-1);
                peticion+="}";
                botones_emergente.pop()
                return peticion
}