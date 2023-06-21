<body translate="no">
  <h1 class="counter celebrate" data-count-start="1,000" style="translate: none; rotate: none; scale: none; transform: translate(0px, 0px); --font-variation-weight:600;">5,000,000</h1>
<button class="btn-restart">Restart</button>
    <script src="https://cpwebassets.codepen.io/assets/common/stopExecutionOnTimeout-2c7831bb44f98c1391d6a4ffda0e1fd302503391ca806e7fcc7b9b87197aec26.js"></script>

  <script src="https://unpkg.co/gsap@3/dist/gsap.min.js"></script>
      <script id="rendered-js" type="module">
// Confetti! https://www.kirilv.com/canvas-confetti/
import confetti from "https://cdn.skypack.dev/canvas-confetti";

const counter = document.querySelector(".counter");
const restartTrigger = document.querySelector(".btn-restart");
const tl = gsap.timeline();
const colors = [
getComputedStyle(document.body).getPropertyValue("--c1"),
getComputedStyle(document.body).getPropertyValue("--c2")];

const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").
matches;

animateCount(counter);

restartTrigger.addEventListener("click", () => {
  tl.restart();
  setCelebrateClass(false);
});

function animateCount(el) {
  const start = removeCommas(el.dataset.countStart);
  const end = removeCommas(el.textContent);

  tl.fromTo(
  el,
  {
    innerText: start,
    "--font-variation-weight": 300,
    scale: reducedMotion ? 0.95 : 0.8 },

  {
    innerText: end,
    snap: { innerText: 1 },
    duration: reducedMotion ? 0 : 3,
    ease: "linear",
    onUpdate: () => {
      el.innerHTML = formatNumber(el.innerText);
    },
    onComplete: celebrate }).

  to(el, {
    scale: 1,
    "--font-variation-weight": 600,
    ease: "elastic.out(1, 0.2)",
    duration: 1.2 });

}

function celebrate() {
  setCelebrateClass(true);
  confetti({
    particleCount: 150,
    spread: 100,
    origin: { y: 0.6 },
    colors,
    disableForReducedMotion: true });

}

function setCelebrateClass(enabled) {
  counter.classList.toggle("celebrate", enabled);
}

    </script>

  

  <script src="https://cpwebassets.codepen.io/assets/editor/iframe/iframeRefreshCSS-550eae0ce567d3d9182e33cee4e187761056020161aa87e3ef74dc467972c555.js"></script>



 
</body>