/**
 * launcher.js 
 * 
 * This module is supposed to determine a launch angle using click and drag.  The original
 * click location is supposed to be origin and the angle is determined by where the user 
 * lets go.   Similar to crush the castle
 */

$(function() {
    m3.launcher = function() {
        var coords = {};
        
        return {
            prepareLaunch: function(event) {
                // Saves the coordinates where the mouse is first pressed down.
                coords.oldX = event.pageX;
                coords.oldY = event.pageY;
            },
            
            launch: function(event) {
                 coords.x = event.pageX;
                 coords.y = event.pageY;
                 
                 if (coords.x == coords.oldX && coords.y == coords.oldY)
                     return;
                 
                 // Calculates the angle using the point where the mouse was first clicked
                 // and the place where it is let up. Good ole trig.
                 var angle = Math.atan(-1 * (coords.y - coords.oldY) / (coords.x - coords.oldX)) * (180 / Math.PI);
                 m3.util.log("fire!!!  Angle = " + angle);
            }
        };
    }();
});
