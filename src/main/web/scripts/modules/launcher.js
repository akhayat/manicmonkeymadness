/**
 * launcher.js 
 * 
 * This module is supposed to determine a launch angle using click and drag.  The original
 * click location is supposed to be origin and the angle is determined by where the user 
 * lets go.   Similar to crush the castle
 */

$(function() {
    m3.launcher = function() {
        
        var mousePosition = { down: false };
        
        return {
            prepareLaunch: function(event) {
                //saves the coordinates where the mouse is first pressed down
                mousePosition.oldX = event.pageX;
                mousePosition.oldY = event.pageY;
                mousePosition.down = !mousePosition.down;
            },
            
            launch: function(event) {
                 mousePosition.down = !mousePosition.down;
                 mousePosition.x = event.pageX;
                 mousePosition.y = event.pageY;
                 
                 if (mousePosition.x == mousePosition.oldX && mousePosition.y == mousePosition.oldY)
                     return;
                 
                 /* Calculates the angle using the point where the mouse was first clicked
                  * and the place where it is let up.  Good ole trig.
                  */
                 var angle = Math.atan(-1 * (mousePosition.y - mousePosition.oldY) / (mousePosition.x - mousePosition.oldX)) * (180 / Math.PI);
                 m3.util.log("fire!!!  Angle = " + angle);
            }
        };
    }();
});
