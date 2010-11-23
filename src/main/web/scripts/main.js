/**
 * main.js
 * 
 * This file contains the main game loop and actually starts up the game.
 * 
 */

$(function() {
    /**
     * Main game loop. The loop shouldn't really contain much game logic itself,
     * it should mostly just call out to the various modules.
     */
    var tick = function() {
        // Update the game timer.
        m3.game.updateTime();
        
        // Clear the canvas every frame.
        m3.game.context.clearRect(0, 0, m3.game.width, m3.game.height);
        
        // Update the game state. The actual game logic goes into the update
        // functions of the various game states inside scripts/states.
        m3.game.context.save();
        m3.game.state.update();       
        m3.game.context.restore();
        
        m3.input.reset();
    };
    
    /**
     * Initialize after we've loaded all of our assets.
     */
    $(window).load(function() {
        m3.game.init();
        setInterval(tick, 1000 / m3.config.fps);
    });
});
