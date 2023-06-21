var doing = false;
var spin = new Audio("/public/sounds/play.mp3");
var coin = [new Audio("/public/sounds/coin.mp3"),new Audio("/public/sounds/coin.mp3"),new Audio("/public/sounds/coin.mp3")]
var win = new Audio("/public/sounds/win.mp3");
var lose = new Audio("/public/sounds/lose.mp3");
var audio = false;
let status = document.getElementById("status")
var info = true;
var slot1;
var slot2;
var slot3;
var slot4;
var slot5;
var slotTile;

$(document).on('click', '#gira',function () { 
    doSlot();
});

function doSlot(){
	if (doing){return null;}
	doing = true;
	var numChanges = randomInt(1,4)*7
    //Se define el ganador de manera manual o aleatoria, en el primer slot cae el 0 luego de x cantidad de "giros"
	var numeberSlot1 = ganador();
	var numeberSlot2 = ganador(7);
	var numeberSlot3 = ganador();
    var numeberSlot4 = ganador();
	var numeberSlot5 = figuras();

	var i1 = 0;
	var i2 = 0;
	var i3 = 0;
    var i4 = 0;
	var i5 = 0;
	var sound = 0
	status.innerHTML = "Ejecutando"
	slot1 = setInterval(spin1, 50);
	slot2 = setInterval(spin2, 50);
	slot3 = setInterval(spin3, 50);
    slot4 = setInterval(spin4, 50);
	slot5 = setInterval(spin5, 50);
	function spin1(){
		i1++;
		if (i1>=numeberSlot1){
			coin[0].play()
			clearInterval(slot1);
			return null;
		}
		slotTile = document.getElementById("slot1");
		if (slotTile.className=="a10"){
			slotTile.className = "a0";
		}
		slotTile.className = "a"+(parseInt(slotTile.className.substring(1))+1)
	}
	function spin2(){
		i2++;
		if (i2>=numeberSlot2){
			coin[1].play()
			clearInterval(slot2);
			return null;
		}
		slotTile = document.getElementById("slot2");
		if (slotTile.className=="a10"){
			slotTile.className = "a0";
		}
		slotTile.className = "a"+(parseInt(slotTile.className.substring(1))+1)
	}
	function spin3(){
		i3++;
		if (i3>=numeberSlot3){
			coin[2].play()
			clearInterval(slot3);
			testWin();
			return null;
		}
		slotTile = document.getElementById("slot3");
		if (slotTile.className=="a10"){
			slotTile.className = "a0";
		}
		sound++;
		if (sound==spin.length){
			sound=0;
		}
		spin.play();
		slotTile.className = "a"+(parseInt(slotTile.className.substring(1))+1)
	}
    function spin4(){
		i4++;
		if (i4>=numeberSlot4){
			coin[2].play()
			clearInterval(slot4);
			testWin();
			return null;
		}
		slotTile = document.getElementById("slot4");
		if (slotTile.className=="a10"){
			slotTile.className = "a0";
		}
		sound++;
		if (sound==spin.length){
			sound=0;
		}
		spin.play();
		slotTile.className = "a"+(parseInt(slotTile.className.substring(1))+1)
	}
	function spin5(){
		i5++;
		if (i5>=numeberSlot5){
			coin[2].play()
			clearInterval(slot5);
			testWin();
			return null;
		}
		slotTile = document.getElementById("slot5");
		if (slotTile.className=="f12"){
			slotTile.className = "f0";
		}
		sound++;
		if (sound==spin.length){
			sound=0;
		}
		spin.play();
		slotTile.className = "f"+(parseInt(slotTile.className.substring(1))+1)
	}
}

function testWin(){
	spin.stop();
	var slot1 = document.getElementById("slot1").className
	var slot2 = document.getElementById("slot2").className
	var slot3 = document.getElementById("slot3").className
    var slot4 = document.getElementById("slot4").className

	if (((slot1 == slot2 && slot2 == slot3) ||
		(slot1 == slot2 && slot3 == "a10") ||
		(slot1 == slot3 && slot2 == "a10") ||
		(slot2 == slot3 && slot1 == "a10") ||
		(slot1 == slot2 && slot1 == "a10") ||
		(slot1 == slot3 && slot1 == "a10") ||
		(slot2 == slot3 && slot2 == "a10") ) && !(slot1 == slot2 && slot2 == slot3 && slot1=="a10")){
		status.innerHTML = "YOU WIN!";
		win.play();
	}else{
		status.innerHTML = "YOU LOSE!"
		lose.play();
	}
	doing = false;
}

function toggleAudio(){
	if (!audio){
		audio = !audio;
		for (var x of spin){
			x.volume = 0.5;
		}
		for (var x of coin){
			x.volume = 0.5;
		}
		win.volume = 1.0;
		lose.volume = 1.0;
	}else{
		audio = !audio;
		for (var x of spin){
			x.volume = 0;
		}
		for (var x of coin){
			x.volume = 0;
		}
		win.volume = 0;
		lose.volume = 0;
	}
	document.getElementById("audio").src = "res/icons/audio"+(audio?"On":"Off")+".png";
}

function randomInt(min, max){
	return Math.floor((Math.random() * (max-min+1)) + min);
}

function ganador(num){
    if(num!=undefined){
    }else{
        num = Math.floor((Math.random() * (10-1+1)) + 1);
    }
    return num+10*randomInt(5,9)

}


function figuras(num){
    if(num!=undefined){
    }else{
        num = Math.floor((Math.random() * (12-1+1)) + 1);
    }
    return num+12*randomInt(9,12)

}