/**
 * game.js
 * 
 * This module stores common objects and fundamental data such as the
 * canvas element, the level dimensions, etc.
 * 
 */

$(function() {
    /**
     * The game object contains common objects such as the canvas.
     */
    m3.game = function() {
        var lastTime = new Date().getTime();
        
        return {
            // Canvas element and context.
            canvas:  document.getElementById("game_canvas"),
            context: document.getElementById("game_canvas").getContext("2d"),
            
            // Dimensions of the game.
            height: $("#game").height(),
            width:  $("#game").width(),
            
            // Offsets of the canvas element.
            x: $("#game").offset().left,
            y: $("#game").offset().top,
            
            // The time in seconds elapsed since the last frame.
            elapsed: 0.0,
            
            /**
             * Update the game timer.
             */
            updateTime: function() {
                var thisTime = new Date().getTime();
                this.elapsed  = (thisTime - lastTime) / 1000.0;
                lastTime = thisTime;
            },
            
            /**
             * Initialize the game.
             */
            init: function() {
                m3.game.state = new m3.states.MainMenuState();
                
                document.onkeydown   = m3.input.processKeyDown;
                document.onkeyup     = m3.input.processKeyUp;
                document.onmousedown = m3.input.processMouseDown;
                document.onmouseup   = m3.input.processMouseUp;
                document.onmousemove = m3.input.processMouseMove;
                
                m3.launcher.init();
            }
        };
    }();
});
