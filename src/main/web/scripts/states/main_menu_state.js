/**
 * main_menu_state.js
 *
 * This is the initial state of the game. It displays a menu for the user.
 *
 */

$(document).ready(function() {
    m3.game.states.MainMenuState = function() {};

    m3.game.states.MainMenuState.prototype.update = function () {
        var context = m3.game.context,
            halfWidth = m3.config.width / 2,
            halfHeight = m3.config.height / 2;

        // Basic example of drawing a shape.
        context.fillStyle = "rgb(200, 220, 250)";
        context.fillRect(0, 0, m3.config.width, m3.config.height);

        // Example of drawing text.
        context.fillStyle   = "rgba(0, 0, 0, 0.8)";
        context.font        = "bold 48px sans-serif";
        context.textAlign   = "center";
        context.translate(halfWidth, halfHeight);
        context.rotate(.02);
        context.translate(-halfWidth, -halfHeight);
        context.fillText("Manic Monkey Madness!!!", halfWidth, halfHeight);

        // This function needs to instead draw the actual main menu, and
        // also check for user input and react accordingly.
    };
});
