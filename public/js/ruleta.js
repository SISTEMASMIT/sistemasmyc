import confetti from "https://cdn.skypack.dev/canvas-confetti";
const segmentos = [{"text":"0"},{"text":"28"},{"text":"9"},{"text":"26"},{"text":"30"},{"text":"11"},{"text":"7"},{"text":"20"},{"text":"32"},{"text":"17"},{"text":"5"},{"text":"22"},{"text":"34"},{"text":"15"},{"text":"3"},{"text":"24"},{"text":"36"},{"text":"13"},{"text":"1"},{"text":"00"},{"text":"27"},{"text":"10"},{"text":"25"},{"text":"29"},{"text":"12"},{"text":"8"},{"text":"19"},{"text":"31"},{"text":"18"},{"text":"6"},{"text":"21"},{"text":"33"},{"text":"16"},{"text":"4"},{"text":"23"},{"text":"35"},{"text":"14"},{"text":"2"}];



let theWheel = new Winwheel({
    'drawMode':'image',
    'imageOverlay' : false, 
    'outerRadius'     : 350,        
    'innerRadius'     : 95,         
    'textFontSize'    : 24,         
    'textOrientation' : 'curved', 
    'textAlignment'   : 'outer',
    'numSegments' : segmentos.length,
    'segments'    : segmentos,
    'animation' :
    {
        'type'          : 'spinToStop',
        'duration'      : 10,
        'spins'         : ((Math.random() * (9)) + 5).toFixed(0),
        'callbackFinished' : alertPrize,
        'callbackSound' : playSound,
        'callbackFinished' : celebrate      
    }
});
var roulette_img = new Image();

roulette_img.onload = function () {
    theWheel.wheelImage = roulette_img;   
    theWheel.draw();            
}
roulette_img.src = "/public/images/roulette.png";

let audio = document.getElementById('winsound');
let winAudio = document.getElementById('win');
//Aquí define el ganador por angulo, el cual cambia cada 9 grados.
let ganador = 0;
let stopA =  ((Math.random() * (ganador+9 - ganador)) + ganador).toFixed(0);
theWheel.animation.stopAngle = stopA;
theWheel.startAnimation();
function alertPrize()
    {
        let winningSegment = theWheel.getIndicatedSegment();
        Swal.fire({text:'¡Número ganador!'+winningSegment.text,icon:'success'})
    }

function playSound()
{
    // Stop and rewind the sound (stops it if already playing).
    audio.pause();
    audio.currentTime = 0;

    // Play the sound.
    $("#prizePointer").addClass('animarPin');
    audio.play();
    setTimeout( function(){
        $("#prizePointer").removeClass('animarPin');
    },700)
}



function celebrate() {
    winAudio.pause();
    winAudio.currentTime = 0;
    winAudio.play();
    confetti({
      particleCount: 150,
      spread: 100,
      origin: { y: 0.6 },
      disableForReducedMotion: true });
  
  }
  
  function setCelebrateClass(enabled) {
    $('#canvas').toggle("celebrate", enabled);
  }