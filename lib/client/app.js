/*global document, window, Event, alert*/

window.addEventListener('error', function (e) {
	alert(e.filename + "(" + e.lineno + "): " + e.message);
});

(function () {
	"use strict";
	var	pauseEvent = new Event('pause'),
		resumeEvent = new Event('resume'),
		viewport = require('./viewport.js').init({
			body: document.getElementById("thebod"),
			window: window,
			document: document,
			pauseEvent: pauseEvent,
			aspectRatio: 16 / 9,
			resumeEvent: resumeEvent,
			layers: [ "background", "foreground"]
		}),
		gameobjects = require('./gameobjects').init({
			bounds: {x: 320, y: 180},
			viewport: viewport
		}),
		assets = require('./assets.js').init({
			document: document,
			gameobjects: gameobjects,
			layers: {
				foreground: viewport.getCanvas("foreground"),
				background: viewport.getCanvas("background")
			}
		}),
		gameStates = {paused: 0, running: 1},
		gameState = gameStates.running,
		mouseStates = {down: 0, up: 1},
		mouseState = mouseStates.up,
		theBall = assets.drawables.ball,
		lastTm = new Date().getTime(),
		pDt = 0,
		tmStep = 10,
		lastX,
		lastY;

	window.addEventListener('pause', function (e) {
		gameState = gameStates.paused;
		assets.saveState();
	});

	window.addEventListener('resume', function (e) {
		gameState = gameStates.running;
		gameobjects.initBounds();
		assets.redrawSprites();
		assets.restoreState();
	});

	window.addEventListener('mousedown', function (e) {
		mouseState = mouseStates.down;
		lastX = e.clientX;
		lastY = e.clientY;
	});

	window.addEventListener('mouseup', function (e) {
		mouseState = mouseStates.up;
	});

	window.addEventListener('touchstart', function (e) {
		mouseState = mouseStates.down;
		lastX = e.touches[0].pageX;
		lastY = e.touches[0].pageY;
	});

	window.addEventListener('touchend', function (e) {
		mouseState = mouseStates.up;
	});

	window.addEventListener('touchmove', function (e) {
		var movement = {x: 0, y: 0};
		if (!isNaN(lastX) && !isNaN(lastY)) {
			movement = {
				x: e.touches[0].pageX - lastX,
				y: e.touches[0].pageY - lastY
			};

		}

		switch (mouseState) {
		case mouseStates.down:
			gameobjects.tipGravityBy(movement);
			break;
		default:
			break;
		}

		lastX = e.touches[0].pageX;
		lastY = e.touches[0].pageY;
	});

	window.addEventListener('mousemove', function (e) {
		var movement = {x: 0, y: 0};
		if (!isNaN(lastX) && !isNaN(lastY)) {
			movement = {
				x: e.clientX - lastX,
				y: e.clientY - lastY
			};

		}

		switch (mouseState) {
		case mouseStates.down:
			gameobjects.tipGravityBy(movement);
			break;
		default:
			break;
		}

		lastX = e.clientX;
		lastY = e.clientY;
	});

	window.requestAnimFrame = (function () {
		return window.requestAnimationFrame ||
			window.webkitRequestAnimationFrame ||
			window.mozRequestAnimationFrame ||
			function (callback) { window.setTimeout(callback, 1000 / 60); };
	}());

	function update() {
		if (gameState === gameStates.paused) { return; }
		theBall.determineDirection();
		theBall.moveByTrajectory();
	}

	function draw() {
		assets.drawables.ball.draw();
	}

	function nextTick() {
		var tm = new Date().getTime(),
			dt = tm - lastTm;

		lastTm = tm;
		pDt += dt;

		window.requestAnimFrame(nextTick);

		if (pDt >= tmStep) {
			update();
			pDt -= tmStep;
		}
		draw();
	}

	nextTick();
}());
