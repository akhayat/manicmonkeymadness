/**
 * play_state.js
 * 
 * This is the main state of the game in which the game is actually
 * being played.
 * 
 */

$(document).ready(function() {
	m3.game.states.PlayState = function() {};
	
	m3.game.states.PlayState.prototype.update = function() {
		// This is where all the actual game logic will go!
	};
	
	/* This code is supposed to determine a launch angle using click and drag.  The original
	 * click location is supposed to be origin and the angle is determined by where the user 
	 * lets go.   Similar to crush the castle
	 */
	
	/* I'm not really sure where I'm supposed to put this code, so I
	 * just put it here for now...
	 */
	var canvas = document.getElementById("game_canvas"); 
    var mousePosition = {down: false};
    canvas.onmousedown = function(event) {
    	//saves the coordinates where the mouse is first pressed down
        mousePosition.oldX = event.pageX;
        mousePosition.oldY = event.pageY;
        mousePosition.down = !mousePosition.down;
    }
    canvas.onmouseup = function(event) {
        mousePosition.down = !mousePosition.down;
        mousePosition.x = event.pageX;
        mousePosition.y = event.pageY;
        /* Calculates the angle using the point where the mouse was first clicked
         * and the place where it is let up.  Good ole trig.
         */
        var angle = Math.atan(-1 * (mousePosition.y - mousePosition.oldY) / (mousePosition.x - mousePosition.oldX)) * (180 / Math.PI);
        alert("fire!!!  Angle = " + angle);
    } 
});
