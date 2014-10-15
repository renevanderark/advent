module.exports = (function (my) {
	"use strict";

	var scale = 1.0;

	my.setScale = function (s) { scale = s; };
	my.Drawable = function (options) {

		var opts = options || {},
			currentSprite = 0,
			sprites = opts.sprites || [],
			context = opts.context || false,
			xPos = opts.xPos || 10,
			yPos = opts.yPos || 10,
			width = 0,
			height = 0,
			lastX = xPos,
			lastY = yPos,
			changed = true,
			self = this;

		if (context === false) { throw new Error("no context to draw to!"); }
		if (sprites.length === 0) { throw new Error("no sprites!"); }

		self.initDims = function () {
			height = Math.floor(sprites[0].getCanvas().height / scale);
			width = Math.floor(sprites[0].getCanvas().width  / scale);
		};

		self.initDims();

		self.getW = function () { return width; };
		self.getH = function () { return height; };

		self.getContext = function () {
			return context;
		};

		self.getX = function () {
			return xPos;
		};

		self.getY = function () {
			return yPos;
		};

		self.getLastX = function () {
			return lastX;
		};

		self.getLastY = function () {
			return lastY;
		};

		self.resetLastPosition = function () {
			lastX = xPos;
			lastY = yPos;
		};

		self.setPosition = function (x, y) {
			if (x === xPos && y === yPos) { return; }
			xPos = x;
			yPos = y;
			changed = true;
		};

		self.isChanged = function () {
			return changed;
		};

		self.setChanged = function (c) {
			changed = c || false;
		};

		self.getCurrentSprite = function () {
			if (sprites.length === 1) { return sprites[0]; }

			if (sprites[currentSprite].getDelay() > 0) {
				return sprites[currentSprite];
			}
			changed = true;
			if (currentSprite < sprites.length - 1) {
				currentSprite += 1;
			} else {
				currentSprite = 0;
			}
			return sprites[currentSprite];
		};
	};


	my.Drawable.prototype.draw = function () {
		var sprite = this.getCurrentSprite();
		if (!this.isChanged()) { return; }
		this.setChanged(false);
		sprite.clear(this.getContext(),
			parseInt(this.getLastX() * scale, 10),
			parseInt(this.getLastY() * scale, 10));
		sprite.blit(this.getContext(),
			parseInt(this.getX() * scale, 10),
			parseInt(this.getY() * scale, 10));
		this.resetLastPosition();
	};
	return my;

}(module.exports || {}));
