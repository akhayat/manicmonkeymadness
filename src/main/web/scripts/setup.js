var m3 = {};

m3.game = function() {
	return {
		canvas:  $("#game_canvas"),
		
		time: 0,
	}
}();

m3.config = function() {
	return {
		fps: 45,
	}
}();
