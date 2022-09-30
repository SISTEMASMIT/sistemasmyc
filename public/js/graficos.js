import { ajax_peticion } from "./Ajax-peticiones.js";

export async function doughnut(labels,data,tittle,l,t){

    let cdata = {"comando":"graficos_rgb","eti":l,"tip":t};
    let info = await ajax_peticion("/query/standard_query", { 'data': JSON.stringify(cdata) }, "POST");
    let colores= Object.values(info.data.data);
    colores=colores.map(e => e.color);
    return {
        labels: labels,
        datasets: [{
          label: tittle ,
          data: data,
          backgroundColor: colores,
          hoverOffset: 4
        }]
      };
}
export async function bar(labels,data,tittle,l,t){
    let cdata = { "comando":"graficos_rgb","eti":l,"tip":t};
    let info = await ajax_peticion("/query/standard_query", { 'data': JSON.stringify(cdata) }, "POST");
    let colores= Object.values(info.data.data);
    colores=colores.map(e => e.color);
    return {
        labels: labels,
        datasets: [{
          label: tittle,
          data: data,
          backgroundColor: colores,
          borderColor: [
            'rgb(255, 99, 132)',
            'rgb(255, 159, 64)',
            'rgb(255, 205, 86)',
            'rgb(75, 192, 192)',
            'rgb(54, 162, 235)',
            'rgb(153, 102, 255)',
            'rgb(201, 203, 207)'
          ],
          borderWidth: 1
        }]
      };
}

export async function line(labels,data,tittle,l,t){
    let cdata = { "comando":"graficos_rgb","eti":l,"tip":t};
    let info = await ajax_peticion("/query/standard_query", { 'data': JSON.stringify(cdata) }, "POST");
    let colores= Object.values(info.data.data);
    colores=colores.map(e => e.color);
    return {
        labels: labels,
        datasets: [{
          label: tittle,
          data: data,
          fill: false,
          borderColor: colores,
          tension: 0.1
        }]
      };
}
