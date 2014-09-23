var module = (function (my) {
	"use strict";
	my.Base = function (options) {
		var opts = options || {},
			name,
			gender;
		name = opts.name || "Base";
		gender = opts.gender === 'f' ? 'f' : 'm';
		this.getName = function () { return name; };
		this.getPron = function () { return gender === 'f' ? "her" : "his"; };
	};

	my.Derived = function (options) {
		var self = this;
		my.Base.call(this, options);

		this.giveOpinion = function () {
			console.log(self.getName() + " voices " + self.getPron() + " opinion");
		};
	};
	my.Derived.prototype = Object.create(my.Base.prototype);

	return my;
}(module || {}));


var jack = new module.Base({name: "Jack"});
var john = new module.Derived({name: "John"});
var jaqu = new module.Derived({name: "Jaqueline", gender: 'f'});
console.log(jack.getName());
console.log(john.getName());
john.giveOpinion();
jaqu.giveOpinion();
