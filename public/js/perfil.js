$(document).ready(()=>{
    console.log(window.localStorage.getItem("Id"));
    $("#id_equipo").val(window.localStorage.getItem("Id"));
})