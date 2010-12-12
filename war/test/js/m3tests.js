/**
 * The Manic Monkey Madness Test Suite.
 */
$(function () {

    module("Game Choices");

    test("Game choices initialization", function () {
        var choices = m3.game_choices;
        same(choices.getGameLength(), 0, "max shots initialized properly");
        same(choices.getGameMode(), null, "game mode initialized properly");
    });

    test("Game choices manipulation", function () {
        var choices = m3.game_choices;
        choices.setGameLength(20);
        choices.setGameMode("last monkey standing");
        same(choices.getGameLength(), 20, "max shots setter okay");
        same(choices.getGameMode(), "last monkey standing", "game mode setter okay");
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

    test("Fort Selection", function () {
        // No tests here yet
    });

    module("Math and Utilities");

    test("Vectors", function () {
        var Vector = m3.types.Vector,
            p = Vector.create(3, 4),
            q = Vector.create(8, -8),
            r = Vector.create(-6, 10),
            z = Vector.create();
        ok(z.x === 0 && z.y === 0, "default constructor creates zero vector");
        ok(r.x === -6 && r.y === 10, "two-arg constructor works");
        same(p.toString(), "Vector: (3, 4)", "trivial toString");
        same(p.lengthSquared, q.lengthSquared, "methods created only once");
        same(p.lengthSquared(), 25, "length squared");
        same(r.lengthSquared(), 136, "another length squared");
        same(z.length(), 0, "zero vector length okay");
        same(p.length(), 5, "vector length okay");
        p.normalize();
        same(p.x, 3/5, "normalize x");
        same(p.y, 4/5, "normalize y");
    });

    test("Math utilities", function () {
        var clamp = m3.math.clamp;

        same(clamp(3, 5, 9), 5, "clamps low");
        same(clamp(3, -5, 9), 3, "clamp leaves in-range values alone");
        same(clamp(30, 5, 9), 9, "clamps high");
    });
});
