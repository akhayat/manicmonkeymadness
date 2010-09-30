/**
 * ui/turn.js
 * 
 * This ui widget displays whose turn it is.
 * 
 */

$(function() {
    m3.ui.turn = function() {
        var context = m3.game.context,
            ui      = m3.ui,
            camera  = m3.camera.position,
            width   = m3.game.width;
        
        return {
            update: function() {
                var active_player   = m3.game.state.active_player,
                    circle_position = new m3.types.Vector(0, 0);
                
                if (active_player === 1) {
                    circle_position.x = m3.game.width;
                }
                
                context.fillStyle = "rgba(250, 250, 200, 0.95)";
                context.arc(camera.x + circle_position.x, camera.y + circle_position.y, 65.0, 0.0, Math.PI * 2, false);
                context.fill();
            }
        };
    }();
});
