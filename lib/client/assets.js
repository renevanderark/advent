var sprites = require('./sprites'),
	drawables = require('./drawables');

module.exports = (function (my) {
	"use strict";

	var document, gameobjects;
	my.init = function (options) {
		var opts = options || {},
			layers = opts.layers || {},
			foreground = layers.foreground || false,
			background = layers.background || false,
			document = opts.document || false,
			i,
			n;

		gameobjects = opts.gameobjects || false;

		if (!document) { throw new Error("document undefined"); }
		if (!foreground) { throw new Error("foreground canvas not defined"); }
		if (!background) { throw new Error("background canvas not defined"); }
		if (!gameobjects) { throw new Error("gameobjects module not defined"); }

		my.sprites = {};

		my.sprites.ballSprites = [];

		function ballSpriteInit(ctx, self, options) {
			var opts = options || {},
				scale = opts.scale || 1.0,
				hue = opts.hue || 128,
				rad = parseInt(Math.floor(5 * scale), 10),
				gradient = ctx.createRadialGradient(rad, rad, rad, rad * 1.25, rad * 0.25, rad * 0.1);

			gradient.addColorStop(0, "rgb(128, 255, 128)");
			gradient.addColorStop(1, "rgb(255, " + hue + ",255)");
			ctx.fillStyle = gradient;
			ctx.beginPath();
			ctx.arc(rad, rad, rad, 0, 2 * Math.PI, false);
			ctx.fill();

			ctx.strokeStyle = "rgba(0, 196, 0, 0.2)";
			ctx.arc(rad, rad, rad, 0, 2 * Math.PI, false);
			ctx.stroke();
		}



		my.redrawSprites = function () {
			for (i = 0, n = 220; n < 255; n += 4, i += 1) {
				if (typeof my.sprites.ballSprites[i] === 'undefined') {
					my.sprites.ballSprites.push(new sprites.Sprite({
						canvas: document.createElement("canvas"),
						dims: {
							h: parseInt(10 * gameobjects.getScale(), 10),
							w: parseInt(10 * gameobjects.getScale(), 10)
						},
						duration: 3
					}).init(ballSpriteInit, {hue: n, scale: gameobjects.getScale()}));
				} else {
					my.sprites.ballSprites[i].setDims({
						h: parseInt(10 * gameobjects.getScale(), 10),
						w: parseInt(10 * gameobjects.getScale(), 10)
					});
					my.sprites.ballSprites[i].init(ballSpriteInit,
						{hue: n, scale: gameobjects.getScale()});
				}
			}
			for (n = 255; n > 220; n -= 4, i += 1) {
				if (typeof my.sprites.ballSprites[i] === 'undefined') {
					my.sprites.ballSprites.push(new sprites.Sprite({
						canvas: document.createElement("canvas"),
						dims: {
							h: parseInt(10 * gameobjects.getScale(), 10),
							w: parseInt(10 * gameobjects.getScale(), 10)
						},
						duration: 3
					}).init(ballSpriteInit, {hue: n, scale: gameobjects.getScale()}));
				} else {
					my.sprites.ballSprites[i].setDims({
						h: parseInt(10 * gameobjects.getScale(), 10),
						w: parseInt(10 * gameobjects.getScale(), 10)
					});
					my.sprites.ballSprites[i].init(ballSpriteInit,
						{hue: n, scale: gameobjects.getScale()});
				}
			}
		};
		my.redrawSprites();
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
