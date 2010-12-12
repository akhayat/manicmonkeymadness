/**
 * main.js
 *
 * This script defines the main game loop and actually starts up the game.  It should be
 * the last script included.
 */
$(function () {

    /**
     * Called at every clock tick within the main game loop. This function doesn't contain any
     * game logic; it simply updates the timer, saves the context, asks the game state to update
     * itself, restores the context, and resets the input listeners.  All game logic and
     * rendering should in invoked from m3.game.state.update.
     */
    var tick = function () {

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
     * Initializes the game and fires off the main loop.
     */
    $(window).load(function () {
        m3.game.init();
        setInterval(tick, 1000 / m3.config.fps);
    });
});
