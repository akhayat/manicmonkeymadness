/**
 * main_menu_state.js
 * 
 * This is the initial state of the game. It displays a menu for the user.
 * 
 */

$(document).ready(function() {
	m3.game.states.MainMenuState = function() {};
	
	m3.game.states.MainMenuState.prototype.update = function() {
		// Basic example of drawing a shape.
		m3.game.context.fillStyle = "rgb(200, 220, 250)";
		m3.game.context.fillRect(0, 0, m3.config.width, m3.config.height);
		
		// Example of drawing text.
		m3.game.context.fillStyle   = "rgba(0, 0, 0, 0.8)";
		m3.game.context.font        = "bold 48px sans-serif";
		m3.game.context.textAlign   = "center";
		m3.game.context.fillText("Manic Monkey Madness!!!", m3.config.width / 2, m3.config.height / 2);
		
		// This function needs to instead draw the actual main menu, and
		// also check for user input and react accordingly.
	};
});
