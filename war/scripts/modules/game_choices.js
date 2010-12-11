/**
 * game_choices.js
 *
 * The m3.game_choices module holds options for the current game, such as the maximum number
 * of shots allowed, and the name of the game mode.
 *
 * TODO: Needs refactoring. Why are there setters if the properties are both readable and
 * writable?
 */
$(function () {
    m3.game_choices = function () {
        var game_choices = {};

        game_choices.max_shots = 0;
        game_choices.game_mode = null;

        game_choices.setGameLength = function (shots) {
            this.max_shots = shots;
        };

        game_choices.setGameMode = function (mode) {
            this.game_mode = mode;
        };

        return game_choices;
    }();
});
