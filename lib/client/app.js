/*global document*/
var first = require("../shared/first.js");

var john = new first.Derived({name: "John"});
document.getElementById("thebod").innerHTML = john.getOpinion();

