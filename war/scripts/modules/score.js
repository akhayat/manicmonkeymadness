/**
 * score.js
 *
 * This module contains scoring data and functions for the players.
 *
 */

$(function() {
    m3.score = function () {
        var player_scores    = [0, 0];
            fort_piece_value = 500; // For now all fort pieces are worth the same...this will probably change.
            enemy_value      = 1000;

        var otherPlayer = function (p) {
            return (p + 1) % 2;
        };

        return {
            getScore: function (player) {
                return player_scores[player];
            },

            // Awards points for destroying a piece of the enemy fort.
            playerDestroyed: function(object) {
                var player = otherPlayer(object.fort.owner);

                if (object.type === 'fort_piece') {
                    player_scores[player] += fort_piece_value;
                    object.piece_material === "rock" ? m3.assets.sfx.rock.play() : m3.assets.sfx.wood.play();
                } else if (object.type === 'enemy') {
                    m3.assets.sfx.monkeyScream.play();
                    player_scores[player] += enemy_value;
                }
            },

            reset: function () {
                for (var i = 0, n = player_scores.length; i < n; i++) {
                    player_scores[i] = 0;
                }
            },

            populateHighScores: function (scores) {
                var scoreboard = $('<table id="scoreboard"></table>'),
                    tr = $('<tr></tr>');

                $.each(scores, function (key, value) {
                    var td = $('<td></td>'),
                        table = $('<table></table>'),
                        header = $('<tr><th>' + key + '</th></tr>').appendTo(table);

                    $.each(value, function() {
                        var row = $('<tr><td>' + this.name + '</td><td>' + this.score + '</td></tr>');
                        row.appendTo(table);
                    });

                    table.appendTo(td);
                    td.appendTo(tr);
                });

                tr.appendTo(scoreboard);
                $('#scoreboard').html(scoreboard);
                $("#lightbox").fadeIn(180);
                $('#high_scores').fadeIn(180);
            },

            getHighScores: function () {
                $.get('/m3?cmd=high_scores', function(data) {
                    if (data) {
                        m3.score.populateHighScores(data);
                    }
                });
            },

            checkHighScore: function () {
                var game_mode = m3.game.state.game_mode,
                    score = player_scores[m3.game.state.winner];

                $.get('/m3?cmd=check_high_score&game=' + game_mode + '&score=' + score, function(newHighScore) {
                    if (newHighScore === "true") {
                        $('#new_high_score').fadeIn(200);
                        $('#lighbox').fadeIn(200);
                    }
                });
            },

            saveHighScore: function () {
                var game_mode = m3.game.state.game_mode,
                    player = $('#new_high_score_name').val(),
                    score = player_scores[m3.game.state.winner];

                $.get('/m3?cmd=save_high_score&game=' + game_mode + '&name=' + player + '&score=' + score, function(data) {
                    if (data) {
                        $('#new_high_score').hide();
                        $('#new_high_score_name').val('');
                        m3.score.populateHighScores(data);
                    }
                });
            },

            showNewHighScore: function() {
                $("#lightbox").fadeIn(180);
                $('#new_high_score').fadeIn(180);
            }
        };
    }();
});
