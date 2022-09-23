var date = new Date();
var min_date =date.getFullYear()-1;
var current_date = date.getDate()+"/"+(date.getMonth()+1)+"/"+date.getFullYear();
var max_date =  "31/12/"+ (date.getFullYear()+1);

export function oneDate(id){
  
    $(id).daterangepicker({
      "locale": {
        "format": "DD/MM/YYYY",
        "separator": " / ",
        "applyLabel": "Aceptar",
        "cancelLabel": "Cancelar",
        "fromLabel": "Desde",
        "toLabel": "Hasta",
        "customRangeLabel": "Personalizada",
        "weekLabel": "S",
        "daysOfWeek": [
            "Dom",
            "Lun",
            "Mar",
            "Mie",
            "Jue",
            "Vie",
            "Sab"
        ],
        "monthNames": [
            "Enero",
            "Febrero",
            "Marzo",
            "Abril",
            "Mayo",
            "Junio",
            "Julio",
            "Agosto",
            "Septiembre",
            "Octubre",
            "Noviembre",
            "Diciembre"
        ],
        "firstDay": 1
    },
        "minYear": min_date,
        "singleDatePicker": true,
        "showCustomRangeLabel": false,
        "startDate": current_date,
        "autoApply": true,
        "endDate": max_date,
      });
}

export function rangeDate(id){
  
  $(id).daterangepicker({
    ranges: {
        'Últimos 3 días': [moment().subtract(2, 'days'), moment()],
        'Últimos 7 días': [moment().subtract(6, 'days'), moment()],
        'Últimos 30 Dás': [moment().subtract(29, 'days'), moment()],
        'Mes Actual': [moment().startOf('month'), moment().endOf('month')],
        'Último Mes': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
    },
    "locale": {
      "format": "DD/MM/YYYY",
      "separator": " / ",
      "applyLabel": "Aceptar",
      "cancelLabel": "Cancelar",
      "fromLabel": "Desde",
      "toLabel": "Hasta",
      "customRangeLabel": "Personalizada",
      "weekLabel": "S",
      "daysOfWeek": [
          "Dom",
          "Lun",
          "Mar",
          "Mie",
          "Jue",
          "Vie",
          "Sab"
      ],
      "monthNames": [
          "Enero",
          "Febrero",
          "Marzo",
          "Abril",
          "Mayo",
          "Junio",
          "Julio",
          "Agosto",
          "Septiembre",
          "Octubre",
          "Noviembre",
          "Diciembre"
      ],
      "firstDay": 1
  },
      "alwaysShowCalendars": true,
      "minYear": min_date,
      "startDate": current_date,
      "autoApply": false,
      "endDate": current_date,
    
});

}


export function futuDate(id){
  
    $(id).daterangepicker({
      ranges: {
          'Próximos 3 días': [moment(),moment().add(2, 'days')],
          'Próximos 7 días': [moment(), moment().add(6, 'days')],
          'Próximos 30 Dás': [moment(), moment().add(29, 'days')],
          'Resto del mes': [moment(), moment().endOf('month')],
          'Mes Siguiente': [moment().add(1, 'month').startOf('month'), moment().add(1, 'month').endOf('month')]
      },
      "locale": {
        "format": "DD/MM/YYYY",
        "separator": " / ",
        "applyLabel": "Aceptar",
        "cancelLabel": "Cancelar",
        "fromLabel": "Desde",
        "toLabel": "Hasta",
        "customRangeLabel": "Personalizada",
        "weekLabel": "S",
        "daysOfWeek": [
            "Dom",
            "Lun",
            "Mar",
            "Mie",
            "Jue",
            "Vie",
            "Sab"
        ],
        "monthNames": [
            "Enero",
            "Febrero",
            "Marzo",
            "Abril",
            "Mayo",
            "Junio",
            "Julio",
            "Agosto",
            "Septiembre",
            "Octubre",
            "Noviembre",
            "Diciembre"
        ],
        "firstDay": 1
    },
        "alwaysShowCalendars": true,
        "minYear": min_date,
        "startDate": current_date,
        "autoApply": false,
        "endDate": current_date,
      
  });
  
  }
