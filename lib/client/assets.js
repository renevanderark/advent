var sprites = require('./sprites'),
	drawables = require('./drawables'),
	gameobjects = require('./gameobjects').init({
		bounds: {x: 250, y: 250}
	});

module.exports = (function (my) {
	"use strict";

	var document;
	my.init = function (options) {
		var opts = options || {},
			layers = opts.layers || {},
			foreground = layers.foreground || false,
			background = layers.background || false,
			document = opts.document || false,
			i;

		if (!document) { throw new Error("document undefined"); }
		if (!foreground) { throw new Error("foreground canvas not defined"); }
		if (!background) { throw new Error("background canvas not defined"); }

		my.sprites = {};

		my.sprites.ballSprites = [];

		function ballSpriteInit(ctx, options) {
			var opts = options || {},
				hue = opts.hue || 128;

			ctx.strokeStyle = "rgba(" + (255 - hue) + ", 0, " + hue + ", 0.2)";
			ctx.fillStyle = "rgba(255, " + hue + ", 255, 1)";
			ctx.beginPath();
			ctx.arc(6, 6, 3, 0, 2 * Math.PI, false);
			ctx.fill();
			ctx.arc(6, 6, 4, 0, 2 * Math.PI, false);
			ctx.stroke();
		}

		for (i = 120; i < 250; i += 10) {
			my.sprites.ballSprites.push(new sprites.Sprite({
				canvas: document.createElement("canvas"),
				dims: {h: 12, w: 12},
				duration: 5
			}).init(ballSpriteInit, {hue: i}));
		}
		for (i = 250; i > 120; i -= 10) {
			my.sprites.ballSprites.push(new sprites.Sprite({
				canvas: document.createElement("canvas"),
				dims: {h: 12, w: 12},
				duration: 5
			}).init(ballSpriteInit, {hue: i}));
		}


		my.drawables = {};
		my.drawables.ball = new gameobjects.Ball({
			sprites: my.sprites.ballSprites,
			context: foreground.getContext("2d"),
			xPos: 50,
			yPos: 50
		});
		return my;
	};

	my.saveState = function () {
	};

	my.restoreState = function () {
		var k;
		for (k in my.drawables) {
			if (my.drawables.hasOwnProperty(k)) {
				my.drawables[k].setChanged(true);
			}
		}
	};

	return my;
}(module.exports || {}));
