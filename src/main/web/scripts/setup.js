var m3 = {};

$(document).ready(function() {
	m3.game = function() {
		return {
			canvas:  document.getElementById("game_canvas"),
			context: document.getElementById("game_canvas").getContext("2d"),

			time: 0,
		};
	}();
	
	m3.config = function() {
		return {
			fps: 45,
		};
	}();
});
