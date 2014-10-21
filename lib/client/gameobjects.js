var drawables = require('./drawables');

module.exports = (function (my) {
	var bounds = {x: 100, y: 100},
		viewport = false,
		scale = 1.0,
		gravity = {x: 0, y: 0};

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

	my.tipGravityBy = function (movement) {
		gravity.x += movement.x / 10;
		gravity.y += movement.y / 10;
		if (gravity.x > 10) {
			gravity.x = 10;
		} else if (gravity.x < -10) {
			gravity.x = -10;
		}
		if (gravity.y > 10) {
			gravity.y = 10;
		} else if (gravity.y < -10) {
			gravity.y = -10;
		}

		if (gravity.y > -0.2 && gravity.y < 0) { gravity.y = -0.2; }
		if (gravity.y < 0.2 && gravity.y > 0) { gravity.y = 0.2; }
		if (gravity.x > -0.2 && gravity.x < 0) { gravity.x = -0.2; }
		if (gravity.x < 0.2 && gravity.x > 0) { gravity.x = 0.2; }
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
		var direction = {x: 0, y: 0},
			bounceFactor = {x: 1.4, y: 1.4},
			me = this;
		drawables.Drawable.call(this, options);

		me.determineDirection = function () {
			direction.x += gravity.x / 100;
			direction.y += gravity.y / 100;

			if (direction.x > 5) {
				direction.x = 5;
			} else if (direction.x < -5) {
				direction.x = -5;
			}
			if (direction.y > 5) {
				direction.y = 5;
			} else if (direction.y < -5) {
				direction.y = -5;
			}

			if (direction.x + this.getX() < 0 ||
					direction.x + this.getX() + this.getW() > bounds.x) {
				direction.x = -(direction.x * 0.6);
			}

			if (direction.y + this.getY() < 0 ||
					direction.y + this.getY() + this.getH() > bounds.y) {
				direction.y = -(direction.y * 0.6);
			}
		};

		me.moveByTrajectory = function () {
			me.moveBy(direction.x, direction.y);
		};
	};

	my.Ball.prototype = Object.create(drawables.Drawable.prototype);

	my.Ball.prototype.moveBy = function (x, y) {
		var newX = this.getX() + x,
			newY = this.getY() + y;
		if (newX < 0) {
			newX = 0;
		} else if (newX + this.getW() > bounds.x) {
			newX = bounds.x - this.getW();
		}

		if (newY < 0) {
			newY = 0;
		} else if (newY + this.getH() > bounds.y) {
			newY = bounds.y - this.getH();
		}

		this.setPosition(newX, newY);
	};


	return my;
}(module.exports || {}));
