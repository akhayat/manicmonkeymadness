/**
 * score.js
 * 
 * This module contains scoring data and functions for the players.
 * 
 */

$(function() {
    m3.score = function() {
        var player_scores    = [0, 0];
            fort_piece_value = 500; // For now all fort pieces are worth the same...this will probably change.
            enemy_value      = 1000;
        
        var otherPlayer = function(p) {
            return (p + 1) % 2;
        };
        
        return {
            getScore: function(player) {
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
            
            reset: function() {
                for (var i = 0, n = player_scores.length; i < n; i++) {
                    player_scores[i] = 0;
                }
            }
        };
    }();
});
