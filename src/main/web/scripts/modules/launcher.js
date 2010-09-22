/**
 * launcher.js 
 * 
 * This module is supposed to determine a launch angle using click and drag.  The original
 * click location is supposed to be origin and the angle is determined by where the user 
 * lets go.   Similar to crush the castle
 */

$(function() {
    m3.launcher = function() {
    	//keeps track of the coordinates and whether the mouse click is up or down
        var coords = {down: false};
        
        return {
        	cannonSprite: {angle: 0, x: 20, y: 720, image: new Image()},        
            prepareLaunch: function(event) {
                // The angle is going to be from the wheel on the cannon to the mouse
                coords.oldX = this.cannonSprite.x;
                coords.oldY = this.cannonSprite.y;
                coords.down = !coords.down;
            },
            
            aim: function(event) {
            	if(coords.down) {
                    coords.x = event.pageX;
                    coords.y = event.pageY;
                
                    // Calculates the angle using the cannon
                    // and the mouse location. Good ole trig.
                    this.cannonSprite.angle = Math.atan((coords.y - coords.oldY) / (coords.x - coords.oldX));
            	}
            },
            
            launch: function(event) {
                coords.down = !coords.down
                m3.util.log("fire!!!  Angle = " + -1 * this.cannonSprite.angle * (180 / Math.PI));
            },          
        };
    }();
});
