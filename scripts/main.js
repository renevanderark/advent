(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/*global document, window, Event*/

var viewport = require('./viewport.js');
var pauseEvent = new Event('pause');
var resumeEvent = new Event('resume');



window.addEventListener('pause', function (e) {
	console.log("PAUSE EVENT triggered");
});

window.addEventListener('resume', function (e) {
	console.log("RESUME EVENT triggered");
});

viewport.init({
	body: document.getElementById("thebod"),
	window: window,
	document: document,
	pauseEvent: pauseEvent,
	resumeEvent: resumeEvent
});

},{"./viewport.js":2}],2:[function(require,module,exports){
module.exports = (function (my) {
	"use strict";
	// TODO: configure multiple canvases 
	var window, document, body, canvas, pauseEvent, resumeEvent,
		resumeTimeout, defaultResumeTimeout = 60, resizing = false;

	resumeTimeout = defaultResumeTimeout;

	function commitResize() {
		// TODO: resize canvases
		canvas.width = body.clientWidth;
		canvas.height = body.clientHeight;
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
		if (typeof window === 'undefined' ||
				typeof document === 'undefined' ||
				typeof body === 'undefined' ||
				typeof pauseEvent === 'undefined' ||
				typeof resumeEvent === 'undefined') {
			throw new Error('undefined references');
		}
		// TODO: initialize multiple canvases
		canvas = document.createElement("canvas");
		window.onresize = onresize;
		body.appendChild(canvas);
		commitResize();
		pollForResize();
	};

	return my;
}(module.exports || {}));

},{}]},{},[1]);
