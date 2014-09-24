var first = require('../../lib/shared/first.js');

exports.testGender = function (test) {
	var jack = new first.Derived({name: "Jack"}),
		jacq = new first.Derived({name: "Jacqueline", gender: "f"}),
		juz = new first.Derived({name: "Juz", gender: "a"});

	test.expect(5);
	test.strictEqual('his', jack.getPron());
	test.strictEqual('her', jacq.getPron());
	test.strictEqual('his', juz.getPron());
	test.strictEqual('Jack voices his opinion', jack.getOpinion());
	test.strictEqual('Jacqueline voices her opinion', jacq.getOpinion());
	test.done();
};

exports.testGetName = function (test) {
	var jane = new first.Base();

	test.ok(true, jane.getName() === 'Base');
	test.done();
};
