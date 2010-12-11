$(function() {
    module("Game Choices");

    test("Game choices initialization", function () {
        var choices = m3.game_choices;
        same(choices.max_shots, 0, "max shots initialized properly");
        same(choices.game_mode, null, "game mode initialized properly");
    });

    test("Game choices manipulation", function () {
        var choices = m3.game_choices;
        choices.setGameLength(20);
        choices.setGameMode("last monkey standing");
        same(choices.max_shots, 20, "max shots setter okay");
        same(choices.game_mode, "last monkey standing", "game mode setter okay");
    });
});