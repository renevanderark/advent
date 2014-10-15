var drawables = require('./drawables');

module.exports = (function (my) {
	var bounds = {x: 100, y: 100},
		viewport = false,
		scale = 1.0;

	my.init = function (options) {
		var opts = options || {};

		viewport = opts.viewport || false;
		bounds = opts.bounds || {x: 100, y: 100};

		if (!viewport) { throw new Error("Viewport reference not passed on init"); }

		my.initBounds();

		return my;
	};

	my.initBounds = function () {
		scale = viewport.getDims().x / bounds.x;
		drawables.setScale(scale);
	};

	my.getScale = function () {
		return scale;
	};

	my.withinRange = function (x, y, w, h) {
		return x >= 0 && y >= 0 &&
			x + w <= bounds.x &&
			y + h <= bounds.y;
	};

	my.Ball = function (options) {
		drawables.Drawable.call(this, options);
	};

	my.Ball.prototype = Object.create(drawables.Drawable.prototype);

	my.Ball.prototype.moveBy = function (x, y) {
		if (!my.withinRange(this.getX() + x, this.getY() + y,
				this.getW(), this.getH())) { return; }

		this.setPosition(this.getX() + x, this.getY() + y);
	};


	return my;
}(module.exports || {}));
