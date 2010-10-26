/**
 * setup.js
 * 
 * This file contains all the architecture needed to initialize the game. It declares
 * the global m3 object that contains all other game modules.
 * 
 */

// The global game object.
var m3 = {
    // A "container" object to hold the constructors for our objects.
    types: {},
    
    // Holds the constructors for our state objects.
    states: {}
};

// Implement Object.create if the browser didn't.
if (typeof Object.create !== "function") {
    Object.create = function(o) {
        var f = function() {};
        f.prototype = o;
        return new f();
    };
}

// Object.inherit will let you set the prototype of an object.
if (typeof Object.inherit !== "function") {
    Object.inherit = function(o, p) {
        o.__proto__ = p;
        return o;
    };
}

// Give arrays a remove function.
Array.prototype.remove = function(from, to) {
    var rest = this.slice((to || from) + 1 || this.length);
    this.length = from < 0 ? this.length + from : from;
    return this.push.apply(this, rest);
};
