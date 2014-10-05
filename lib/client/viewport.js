module.exports = (function (my) {
	"use strict";
	var window, document, body, layers, canvases = {}, pauseEvent, resumeEvent,
		resumeTimeout, defaultResumeTimeout = 60, resizing = false,
		aspectRatio;

	resumeTimeout = defaultResumeTimeout;

	function commitResize() {
		var k;
		for (k in canvases) {
			if (canvases.hasOwnProperty(k)) {
				if (body.clientWidth > body.clientHeight) {
					canvases[k].width = body.clientWidth;
					canvases[k].height = canvases[k].width / aspectRatio;
				} else {
					canvases[k].height = body.clientHeight;
					canvases[k].width = canvases[k].height / aspectRatio;
				}
			}
		}

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
		aspectRatio = opts.aspectRatio || 1.0;
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
		return my;
	};

	my.getCanvas = function (name) {
		if (canvases.hasOwnProperty(name)) { return canvases[name]; }
	};

	return my;
}(module.exports || {}));
