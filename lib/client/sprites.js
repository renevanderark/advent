module.exports = (function (my) {

	my.Sprite = function (options) {

		var opts = options || {},
			dims = opts.dims || {w: 5, h: 5},
			canvas = opts.canvas,
			duration = opts.duration || 0,
			delay = duration,
			context,
			self = this;

		if (!canvas) { throw new Error("canvas not defined"); }
		context = canvas.getContext('2d');
		canvas.width = dims.w;
		canvas.height = dims.h;

		self.getCanvas = function () { return canvas; };
		self.getDuration = function () { return duration; };
		self.getDelay = function () {
			if (delay > 0) {
				delay -= 1;
			} else {
				delay = duration;
			}
			return delay;
		};
	};

	my.Sprite.prototype.setDims = function (dims) {
		this.getCanvas().width = dims.w;
		this.getCanvas().height = dims.h;
	};

	my.Sprite.prototype.init = function (callback, opts) {
		this.getCanvas().getContext('2d')
			.clearRect(0, 0, this.getCanvas().width, this.getCanvas().height);
		callback(this.getCanvas().getContext('2d'), this, opts);
		return this;
	};

	my.Sprite.prototype.blit = function (ctx, x, y) {
		var can = this.getCanvas();
		ctx.drawImage(can, x, y, can.width, can.height);
	};

	my.Sprite.prototype.clear = function (ctx, x, y) {
		var can = this.getCanvas();
		ctx.clearRect(x, y, can.width, can.height);
	};

	return my;
}(module.exports || {}));
