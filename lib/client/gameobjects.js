var drawables = require('./drawables');

module.exports = (function (my) {
	var bounds = {x: 100, y: 100};

	my.init = function (options) {
		var opts = options || {};

		bounds = opts.bounds || {x: 100, y: 100};
		return my;
	};

	my.withinRange = function (x, y) {
		return x > 0 && y > 0 && x < bounds.x && y < bounds.y;
	};

	my.Ball = function (options) {
		drawables.Drawable.call(this, options);
	};

	my.Ball.prototype = Object.create(drawables.Drawable.prototype);

	my.Ball.prototype.moveBy = function (x, y) {
		if (!my.withinRange(this.getX() + x, this.getY() + y)) { return; }

		this.setPosition(this.getX() + x, this.getY() + y);
	};


	return my;
}(module.exports || {}));
