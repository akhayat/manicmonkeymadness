/**
 * config.js
 * 
 * This module stores any data used to configure the game, such as the frames
 * per second that the game should run at.
 * 
 */

$(document).ready(function() {
	m3.config = function() {
		return {
			fps: 45,
			
			height: $("#game").height(),
			width:  $("#game").width(),
		};
	}();
});