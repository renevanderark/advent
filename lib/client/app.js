/*global document, window, Event*/

var viewport = require('./viewport.js');
var pauseEvent = new Event('pause');
var resumeEvent = new Event('resume');
var gameStates = {paused: 0, running: 1};
var gameState = gameStates.running;
var x = 10, y = 10;

window.addEventListener('pause', function (e) {
	gameState = gameStates.paused;
});

window.addEventListener('resume', function (e) {
	gameState = gameStates.running;
});

window.requestAnimFrame = (function () {
	return window.requestAnimationFrame ||
		window.webkitRequestAnimationFrame ||
		window.mozRequestAnimationFrame ||
		function (callback) { window.setTimeout(callback, 1000 / 60); };
}());

viewport.init({
	body: document.getElementById("thebod"),
	window: window,
	document: document,
	pauseEvent: pauseEvent,
	resumeEvent: resumeEvent,
	layers: ["foreground", "background"]
});

var background = viewport.getCanvas("background"),
	backgroundContext = background.getContext('2d'),
	lastTm = new Date().getTime(),
	pDt = 0,
	tmStep = 16;

function update() {
	if (gameState === gameStates.paused) { return; }
	x += 3;
	y += 3;
	if (x > background.width) { x = -30; }
	if (y > background.height) { y = -10; }
}
function nextTick() {
	var tm = new Date().getTime(),
		dt = tm - lastTm;

	lastTm = tm;
	pDt += dt;
	backgroundContext.clearRect(x, y, 30, 10);

	window.requestAnimFrame(nextTick);

	if (pDt >= tmStep) {
		update();
		pDt -= tmStep;
	}
	backgroundContext.fillRect(x, y, 30, 10);
}

nextTick();
