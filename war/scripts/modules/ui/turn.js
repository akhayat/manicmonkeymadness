/**
 * ui/turn.js
 * 
 * This ui widget displays whose turn it is.
 * 
 */

$(function() {
    m3.ui.turn = function() {
        var context     = m3.game.context,
            ui          = m3.ui,
            camera      = m3.camera.position,
            game_width  = m3.game.width,
            game_height = m3.game.height;
        
        
        return {
        	changingTurn: false,
        	
            update: function() {
                var active_player   = m3.game.state.active_player,
                    circle_position = m3.types.Vector.create(0, 0);
                
                if (active_player === 1) {
                    circle_position.x = game_width;
                }
                
                context.fillStyle = "rgba(250, 250, 200, 0.95)";
                context.beginPath();
                context.arc(camera.x + circle_position.x, camera.y + circle_position.y, 75.0, 0.0, Math.PI * 2, false);
                context.fill();
                context.closePath();

                if(this.changingTurn) {
                    context.fillStyle   = "rgba(255, 128, 0, 0.95)";
                    context.strokeStyle = "rgba(0, 25, 0, 0.75)";
                    context.font        = "40px Tahoma, Geneva, sans-serif";
                    context.textAlign   = "center";
                    ui.drawStrokedText("Player " + (active_player + 1) + "'s turn!", camera.x + game_width / 2, camera.y + game_height / 3);
                }
            }
        };
    }();
});
