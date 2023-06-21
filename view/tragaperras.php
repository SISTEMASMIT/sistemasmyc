<!DOCTYPE html>
<head>
	<title>Slot Machine</title>
	<link rel="stylesheet" href="<? $path;?>/public/css/tragaperras.css">
</head>
<html>
<body onload="toggleAudio()">
<main>
	<section id="status">WELCOME!</section>
	<section id="Slots">
		<div id="slot1" class="a1"></div>
		<div id="slot2" class="a1"></div>
		<div id="slot3" class="a1"></div>
		<div id="slot4" class="a1"></div>

		<div id="slot5" class="f1"></div>

	</section>
	
	<section id="gira">SORTEAR!</section>
	<section id="options">
		<img src="res/icons/audioOn.png" id="audio" class="option" onclick="toggleAudio()" />
	</section>
</main>
<section id="info">
	<h3>Come si Gioca?</h3>
	<p>Tenta la tua fortuna premendo il bottone! Il Jolly vale l'elemento mancante per vincere. Tre elementi uguali e vinici! Ma attenzione, non prendere tre Jolly o perderai!</p>
	<h3>Licenza</h3>
	<p><a rel="license" href="http://creativecommons.org/licenses/by-nc-sa/4.0/"><img alt="Licenza Creative Commons" style="border-width:0" src="https://i.creativecommons.org/l/by-nc-sa/4.0/88x31.png" /></a><br />Quest'opera è distribuita con Licenza <a rel="license" href="http://creativecommons.org/licenses/by-nc-sa/4.0/">Creative Commons Attribuzione - Non commerciale - Condividi allo stesso modo 4.0 Internazionale</a>.</p>
</section>
<script src="<? $path;?>/public/libs/jquery/jquery.min.js"></script>
<script type='module' src='<? $path;?>/public/js/tragaperras.js'></script>
</body>
</html>
