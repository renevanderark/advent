(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/*global document*/
var first = require("../shared/first.js");

var john = new first.Derived({name: "John"});
document.getElementById("thebod").innerHTML = john.getOpinion();


},{"../shared/first.js":2}],2:[function(require,module,exports){
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



},{}]},{},[1]);
