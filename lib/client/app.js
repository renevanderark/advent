/*global document, window, Event*/

(function () {
	"use strict";
	var	background, backgroundContext,
		viewport = require('./viewport.js'),
		pauseEvent = new Event('pause'),
		resumeEvent = new Event('resume'),
		gameStates = {paused: 0, running: 1},
		gameState = gameStates.running,
		x = 10,
		y = 10,
		lastTm = new Date().getTime(),
		pDt = 0,
		tmStep = 16;


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

	background = viewport.getCanvas("background");
	backgroundContext = background.getContext('2d');

	function update() {
		if (gameState === gameStates.paused) { return; }
		x += 1;
		y += 1;
		if (x > background.width) { x = -2; }
		if (y > background.height) { y = -2; }
	}

	function nextTick() {
		var tm = new Date().getTime(),
			dt = tm - lastTm;

		lastTm = tm;
		pDt += dt;
		backgroundContext.clearRect(x - 4, y - 4, 8, 8);

		window.requestAnimFrame(nextTick);

		if (pDt >= tmStep) {
			update();
			pDt -= tmStep;
		}
		backgroundContext.beginPath();
		backgroundContext.arc(x, y, 4, 0, 2 * Math.PI, false);
		backgroundContext.fill();
	}

	nextTick();
}());
