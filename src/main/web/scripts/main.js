$(document).ready(function() {
	/**
	 * Main game loop.
	 */
	var tick = function() {
		// Clear canvas
		m3.game.context.clearRect(0, 0, 900, 500);
		
		// Basic example of drawing something
		m3.game.context.fillStyle = "rgba(200, 0, 0, 0.9)";  
		m3.game.context.fillRect(100, 50, 500, 300);
		
		// Do stuff here...
	};
	
	setInterval(function() {
		tick();
	}, 1000 / m3.config.fps);
});