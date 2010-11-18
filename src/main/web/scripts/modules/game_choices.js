/**
 * game_choices.js
 * 
 * This module updates the total number of turns the players have selected to play.
 * 
 */

$(function() {
    m3.game_choices = function() {
        var game_choices = {};
    	
    	game_choices.max_shots = 0;
    	game_choices.game_mode = null;

        game_choices.setGameLength = function(shots) {
            this.max_shots = shots;
        };
        
        game_choices.setGameMode = function(mode) {
        	this.game_mode = mode;
        };
        
        return game_choices;
    }();
});
