/**
 * ui/done.js
 * 
 * This ui widget displays a message when the game is over.
 * 
 */

$(function() {
    m3.ui.done = function() {
        var context     = m3.game.context,
            ui          = m3.ui,
            camera      = m3.camera.position,
            half_width  = m3.game.width / 2,
            half_height = m3.game.height / 2,
            treasure    = m3.assets.icons.treasure;
        
        return {
            update: function() {
                // Say who won.
                context.drawImage(treasure, camera.x + half_width - (treasure.width / 2), m3.game.height - (treasure.height * 0.3), treasure.width * 0.3, treasure.height * 0.3);
                context.fillStyle   = "rgba(250, 255, 245, 0.95)";
                context.font        = "60px Tahoma, Geneva, sans-serif";
                context.textAlign   = "center";
                context.lineWidth   = 3;
                context.strokeStyle = "rgba(20, 15, 0, 0.75)";
                ui.drawStrokedText("Player " + (m3.game.state.winner + 1) + " Wins!", camera.x + half_width, camera.y + half_height - 40);
                
                // Let them continue or quit.
                context.font      = "30px Tahoma, Geneva, sans-serif";
                context.lineWidth = 3;
                ui.drawStrokedText("Press N for a New Game, or Q to Quit", camera.x + half_width, camera.y + half_height + 40);
            }
        };
    }();
});
