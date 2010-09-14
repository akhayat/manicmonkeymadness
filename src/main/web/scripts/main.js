/**
 * main.js
 * 
 * This file contains the main game loop and actually starts up the game.
 * 
 */

$(document).ready(function() {
	/**
	 * Main game loop. The loop shouldn't really contain much game logic itself,
	 * it should mostly just call out to the various modules.
	 */
	var tick = function() {
		// Clear the canvas every frame.
		m3.game.context.clearRect(0, 0, 900, 500);
		
		// Update the game state. The actual game logic goes into the update
		// functions of the various game states inside scripts/states.
		m3.game.state.update();
	};
	
	/**
	 * Initialize.
	 */
	m3.game.init();
	setInterval(tick, 1000 / m3.config.fps);
});