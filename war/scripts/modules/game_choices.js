/**
 * game_choices.js
 *
 * The m3.game_choices module holds options for the current game, such as the maximum number
 * of shots allowed, and the name of the game mode.  For fun, the module is implemented as
 * a single object with no exposed properties, only old-style getters and setters.
 */
$(function () {
    m3.game_choices = function () {
        var maxShots = 0,
            gameMode = null;

        return {
            getGameLength: function () {
                return maxShots;
            },

            setGameLength: function (shots) {
                maxShots = shots;
            },

            getGameMode: function () {
                return gameMode;
            },

            setGameMode: function (mode) {
                gameMode = mode;
            }
        };
    }();
});
