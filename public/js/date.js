export function oneDate(id){
    $(id).daterangepicker({
        "singleDatePicker": true,
        "showDropdowns": true,
        "showCustomRangeLabel": false,
        "startDate": "09/09/2022",
        "endDate": "09/15/2022",
        "opens": "center",
        "drops": "auto"
      }, function(start, end, label) {
        var years = moment().diff(start, 'years');
        alert("You are " + years + " years old!");
      });
}