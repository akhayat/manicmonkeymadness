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

    module("Fort Choices");

    test("Premade Forts", function () {
        var choices = m3.fort_choices,
            premade = m3.fort_choices.premade;
        ok(premade.length >= 2, "Premade forts exist");
        same(premade[0].id.toLowerCase(), "original", "First fort is original");
        same(premade[1].id.toLowerCase(), "alternate", "Second fort is alternate");
        for (var i = 0; i < premade.length; i += 1) {
            ok(premade[i].fort.pieces.length > 1, "Fort " + i + " has pieces");
            ok(premade[i].fort.enemies.length > 1, "Fort " + i + " has enemies");
        }
    });
});