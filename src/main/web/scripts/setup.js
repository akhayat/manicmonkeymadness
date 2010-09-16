/**
 * setup.js
 * 
 * This file contains all the architecture needed to initialize the game. It declares
 * the global m3 object that contains all other game modules.
 * 
 */

var m3 = {};

$(function() {
    /**
     * The game object contains common objects such as the canvas.
     */
    m3.game = function() {
        return {
            // Canvas element and context.
            canvas:  document.getElementById("game_canvas"),
            context: document.getElementById("game_canvas").getContext("2d"),
            
            // Dimensions of the game.
            height: $("#game").height(),
			width:  $("#game").width(),
            
            // The time elapsed since the last frame.
            elapsed: 0,
            
            // Contains the constructors for all the states in the game.
            states: {},
        };
    }();
    
    /**
     * Initialize the game.
     */
    m3.game.init = function() {
        m3.game.state = new m3.game.states.MainMenuState();
        
        document.onkeydown   = m3.input.processKeyDown;
        document.onkeyup     = m3.input.processKeyUp;
        document.onmousedown = m3.input.processMouseDown;
        document.onmouseup   = m3.input.processMouseUp;
    };
});
