/**
 * util.js
 * 
 * This module contains utility functions, such as a function to log text to a console.
 * 
 */

$(function() {
    m3.util = function() {
        var log_count = 0,
            max_log_count = 1000,
            log_enabled = true,
            b2Vec2 = Box2D.Common.Math.b2Vec2;
        
        return {
            log: function(text) {
                if (log_enabled) {
                    $("#console_items").prepend("<p>" + text + "</p>");
                    log_count++;
                    
                    if (log_count > max_log_count) {
                        $("#console_items").children("p").first().remove();
                    }
                }
            },
            
            toggleLog: function() {
                log_enabled = !log_enabled;
                $('#console').toggle();
            },
            
            /*
             * Converts an array of vertices in pixels to an array of box2d b2Vec vertices in meters
             */
            pixelsToMeters: function(vertices) {
                var scale = m3.config.scaling_factor,
                    verticesInMeters = [];
                
                $.each(vertices, function(i) {
                    verticesInMeters.push(new b2Vec2(this[0] / scale, this[1] / scale));
                });
                
                return verticesInMeters;
            },
            
            // Clamps a number within a range.
            clamp: function(n, min, max) {
                if (n < min) {
                    return min;
                }
                else if (n > max) {
                    return max;
                }
                
                return n;
            }
        };
    }();
});
