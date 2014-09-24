module.exports = (function (my) {
	"use strict";
	my.Base = function (options) {
		var opts = options || {},
			name,
			gender,
			logFunc;
		name = opts.name || "Base";
		gender = opts.gender === 'f' ? 'f' : 'm';

		this.log = opts.logFunc || console.log;
		this.getName = function () { return name; };
		this.getPron = function () { return gender === 'f' ? "her" : "his"; };
	};

	my.Derived = function (options) {
		var self = this;
		my.Base.call(this, options);

		this.getOpinion = function () {
			return self.getName() + " voices " + self.getPron() + " opinion";
		};
	};
	my.Derived.prototype = Object.create(my.Base.prototype);

	return my;
}(module.exports || {}));


