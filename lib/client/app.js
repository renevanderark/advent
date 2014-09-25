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
