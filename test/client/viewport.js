var viewport = require('../../lib/client/viewport.js');

exports.testInit = function (test) {
	var pauseDone = false,
		mockCan = {},
		mockWin = {
			dispatchEvent: function () { },
			setTimeout: function (func, delay) {
				test.ok(typeof func === 'function');
				test.strictEqual(delay, 10);
			}
		},
		aspect = 16 / 9,
		mockPauseEvent = "pauseEvent",
		mockResumeEvent = "resumeEvent",
		mockDoc = {
			createElement: function (tagName) {
				test.strictEqual("canvas", tagName);
				return mockCan;
			}
		},
		mockBod = {
			appendChild: function (elem) {
				test.strictEqual("object", typeof elem);
			},
			clientWidth: 123,
			clientHeight: 321
		};

	test.expect(6);
	viewport.init({
		window: mockWin,
		document: mockDoc,
		body: mockBod,
		aspect: aspect,
		pauseEvent: mockPauseEvent,
		resumeEvent: mockResumeEvent
	});
	test.strictEqual(mockCan.width, 123);
	test.strictEqual(mockCan.height, 321);
	test.done();
};

exports.testResizeCallbacks = function (test) {
	// TODO
	test.done();
};
