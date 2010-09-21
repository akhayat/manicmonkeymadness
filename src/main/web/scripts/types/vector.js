/**
 * vector.js
 * 
 * This object represents a generic vector to be used for a variety of
 * purposes. The prototype contains a number of useful operations.
 * 
 */

$(function() {
    m3.types.Vector = function() {
        return function(x, y) {
            this.x = x || 0.0;
            this.y = y || 0.0;
        };
    }();
    
    m3.types.Vector.prototype.length = function() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    };
    
    m3.types.Vector.prototype.normalize = function() {
        var length = this.length();
        
        if (length != 0) {
            this.x /= length;
            this.y /= length;
        }
    };
});
