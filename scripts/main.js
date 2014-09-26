(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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

},{"./viewport.js":2}],2:[function(require,module,exports){
module.exports = (function (my) {
	"use strict";
	var window, document, body, layers, canvases = {}, pauseEvent, resumeEvent,
		resumeTimeout, defaultResumeTimeout = 60, resizing = false,
		aspectRatio = 1.0;

	resumeTimeout = defaultResumeTimeout;

	function commitResize() {
		var k;
		for (k in canvases) {
			if (canvases.hasOwnProperty(k)) {
				canvases[k].width = body.clientWidth;
				canvases[k].height = body.clientHeight;
			}
		}
		aspectRatio = body.clientWidth / body.clientHeight;
	}

	function pollForResize() {
		if (resizing) {
			if (resumeTimeout >= 0) {
				resumeTimeout -= 1;
			} else {
				commitResize();
				resizing = false;
				resumeTimeout = defaultResumeTimeout;
				window.dispatchEvent(resumeEvent);
			}
		}

		window.setTimeout(pollForResize, 10);
	}

	function onresize(e) {
		if (!resizing) {
			resizing = true;
			window.dispatchEvent(pauseEvent);
		}
		resumeTimeout = 5;
	}

	my.init = function (options) {
		var opts = options || {}, i;
		window = opts.window;
		document = opts.document;
		body = opts.body;
		pauseEvent = opts.pauseEvent;
		resumeEvent = opts.resumeEvent;
		layers = opts.layers;
		if (typeof window === 'undefined' ||
				typeof document === 'undefined' ||
				typeof body === 'undefined' ||
				typeof pauseEvent === 'undefined' ||
				typeof resumeEvent === 'undefined' ||
				typeof layers === 'undefined') {
			throw new Error('undefined references');
		}

		if (!(layers instanceof Array)) {
			throw new Error('layers should be an array of strings');
		}

		for (i = 0; i < layers.length; i++) {
			canvases[layers[i]] = document.createElement("canvas");
			body.appendChild(canvases[layers[i]]);
		}
		window.onresize = onresize;
		commitResize();
		pollForResize();
	};

	my.getCanvas = function (name) {
		if (canvases.hasOwnProperty(name)) { return canvases[name]; }
	};

	return my;
}(module.exports || {}));

},{}]},{},[1]);
