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
