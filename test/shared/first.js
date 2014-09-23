var first = require('../../lib/shared/first.js');

exports.testGender = function (test) {
	var logFuncA = function (msg) { test.strictEqual('Jack voices his opinion', msg); },
		logFuncB = function (msg) { test.strictEqual('Jacqueline voices her opinion', msg); },
		jack = new first.Derived({name: "Jack", logFunc: logFuncA}),
		jacq = new first.Derived({name: "Jacqueline", gender: "f", logFunc: logFuncB}),
		juz = new first.Derived({name: "Juz", gender: "a"});

	test.expect(5);
	test.ok(true, jack.getPron() === 'his');
	test.ok(true, jacq.getPron() === 'her');
	test.ok(true, juz.getPron() === 'his');
	jack.giveOpinion();
	jacq.giveOpinion();
	test.done();
};

exports.testGetName = function (test) {
	var jane = new first.Base();

	test.ok(true, jane.getName() === 'Base');
	test.done();
};
