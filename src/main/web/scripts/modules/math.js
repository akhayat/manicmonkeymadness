/**
 * math.js
 * 
 * This module contains some math-related utility functions.
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
        };
    }();
});
