var second = require("../../lib/shared/second.js");

exports.testMul = function (test) {
	test.strictEqual(15, second.mul(3, 5));
	test.done();
};
