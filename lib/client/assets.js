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
				hue = opts.hue || 128,
				scale = opts.scale || 1.0,
				rad = parseInt(Math.floor(5 * scale), 10);

			ctx.strokeStyle = "rgba(" + (255 - hue) + ", 0, " + hue + ", 0.2)";
			ctx.fillStyle = "rgba(255, " + hue + ", 255, 1)";
			ctx.beginPath();
			ctx.arc(rad, rad, rad, 0, 2 * Math.PI, false);
			ctx.fill();
			ctx.arc(rad, rad, rad, 0, 2 * Math.PI, false);
			ctx.stroke();
		}

		my.redrawSprites = function () {
			for (i = 0, n = 120; n < 250; n += 10, i += 1) {
				if (typeof my.sprites.ballSprites[i] === 'undefined') {
					my.sprites.ballSprites.push(new sprites.Sprite({
						canvas: document.createElement("canvas"),
						dims: {
							h: parseInt(10 * gameobjects.getScale(), 10),
							w: parseInt(10 * gameobjects.getScale(), 10)
						},
						duration: 5
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
			for (n = 250; n > 120; n -= 10, i += 1) {
				if (typeof my.sprites.ballSprites[i] === 'undefined') {
					my.sprites.ballSprites.push(new sprites.Sprite({
						canvas: document.createElement("canvas"),
						dims: {
							h: parseInt(10 * gameobjects.getScale(), 10),
							w: parseInt(10 * gameobjects.getScale(), 10)
						},
						duration: 5
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
