/**
 * vector.js
 * 
 * This object represents a generic vector to be used for a variety of
 * purposes. The prototype contains a number of useful operations.
 * 
 */

$(function() {
    m3.types.Vector = function() {
        return {
            // Public members.
            x: 0,
            y: 0,
            
            // Convenience function to set the x and y values at the same time.
            set: function(x, y) {
                this.x = x;
                this.y = y;
            },
            
            // Returns the magnitude of the vector.
            length: function() {
                return Math.sqrt(this.lengthSquared());
            },
            
            // Returns the magnitude of the vector, squared. This should be used
            // in place of length when comparing vector lengths since it avoids
            // a costly square root call.
            lengthSquared: function() {
                var x = this.x, y = this.y;
                return x * x + y * y;
            },
            
            // Scales the vector to be of length 1.0.
            normalize: function() {
                var length = this.length();
                
                if (length != 0) {
                    this.x /= length;
                    this.y /= length;
                }
            },
            
            // Override toString.
            toString: function() {
                return "Vector: (" + this.x + ", " + this.y + ")";
            },
            
            // "Constructor".
            create: function(x, y) {
                var v = Object.create(this);
                
                if ((x !== undefined) && (y !== undefined)) {
                    v.set(x, y);
                }
                
                return v;
            }
        };
    }();
});
