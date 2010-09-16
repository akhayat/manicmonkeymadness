/**
 * play_state.js
 * 
 * This is the main state of the game in which the game is actually
 * being played.
 * 
 */

$(function() {
	
	var x = 150;
	var y = 150;
	var dx = 2;
	var dy = 4;
	
	m3.game.states.PlayState = function() {};
	
	m3.game.states.PlayState.prototype.update = function() {
		var canvas = document.getElementById("game_canvas"); 
		m3.launcher(canvas);
		
		//define the ball
	    var projectile = m3.game.context,
        halfWidth = m3.config.width / 2,
        halfHeight = m3.config.height / 2;
		 
		//draw a circle
		projectile.beginPath();
		projectile.arc(x, y, 10, 0, Math.PI*2, true);
		projectile.closePath();
		projectile.fill();
		
		//make it bounce
		if (x + dx > m3.config.width || x + dx < 0)
		    dx = -dx;
	    if (y + dy > m3.config.height || y + dy < 0)
			dy = -dy;
		
		//update location
		x += dx;
		y += dy;
		
	};
	
});
