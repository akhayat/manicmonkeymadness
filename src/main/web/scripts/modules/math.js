/**
 * math.js
 * 
 * This module contains some math-related utility functions and
 * object constructors.
 * 
 */

$(function() {
    m3.math = function() {
        return {
            /**
             * Utility function to clamp a number within a certain range.
             */
            clamp: function(x, min, max) {
                if (x < min)
                    return min;
                if (x > max)
                    return max;
                
                return x;
            },
            
            /**
             * Very useful generic vector object.
             */
            Vector: function(x, y) {
                this.x = x || 0.0;
                this.y = y || 0.0;
            },
        };
    }();
    
    m3.math.Vector.prototype.length = function() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    };
    
    m3.math.Vector.prototype.normalize = function() {
        var length = this.length();
        
        if (length != 0) {
            this.x /= length;
            this.y /= length;
        }
    };
});
