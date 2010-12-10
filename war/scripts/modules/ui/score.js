/**
 * ui/score.js
 * 
 * This ui widget displays the scores for both of the players.
 * 
 */

$(function() {
    m3.ui.score = function() {
        var context       = m3.game.context,
            ui            = m3.ui,
            camera        = m3.camera.position,
            score         = m3.score,
            width         = m3.game.width,
            padding       = m3.types.Vector.create(6, 22),
            score_spacing = 32;
        
        return {
            update: function() {
                // Left score label
                context.fillStyle   = "rgba(240, 255, 245, 0.95)";
                context.font        = "18px Tahoma, Geneva, sans-serif";
                context.textAlign   = "left";
                context.lineWidth   = 2;
                context.strokeStyle = "rgba(0, 25, 0, 0.75)";
                ui.drawStrokedText("Player 1", camera.x + padding.x, camera.y + padding.y);
                
                // Right score label
                context.textAlign = "right";
                ui.drawStrokedText("Player 2", camera.x + width - padding.x, camera.y + padding.y);
                
                // Left score value
                context.fillStyle   = "rgba(210, 255, 215, 0.8)";
                context.font        = "26px Tahoma, Geneva, sans-serif";
                context.textAlign   = "left";
                context.lineWidth   = 3;
                ui.drawStrokedText(score.getScore(0), camera.x + padding.x, camera.y + padding.y + score_spacing);
                
                // Right score value
                context.textAlign = "right";
                ui.drawStrokedText(score.getScore(1), camera.x + width - padding.x, camera.y + padding.y + score_spacing);
            }
        };
    }();
});
