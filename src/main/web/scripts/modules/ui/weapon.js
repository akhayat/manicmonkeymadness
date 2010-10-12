/**
 * ui/weapon.js
 * 
 * This ui widget displays the players' currently selected weapons.
 * 
 */

$(function() {
    m3.ui.weapon = function() {
        var context = m3.game.context,
            ui      = m3.ui,
            cannons = m3.launcher.cannons
            camera  = m3.camera.position;
        
        return {
            update: function() {
                var active_player = m3.game.state.active_player,
                    cannon        = cannons[active_player],
                    game_width    = m3.game.width
                    icon          = null;
                
                // Temporary until we have a weapon type data structure set up.
                if (cannon.weapon == 1) {
                    icon = m3.assets.sprites.banana;
                }
                else {
                    icon = m3.assets.sprites.rock;
                }
                
                var w = icon.width,
                    h = icon.height;
                
                context.fillStyle   = "rgba(220, 245, 255, 0.8)";
                context.strokeStyle = "rgba(0, 10, 30, 0.4)";
                context.lineWidth   = 2;
                context.fillRect(camera.x + (game_width / 2) - 26, camera.y + 5, 41, 40);
                context.strokeRect(camera.x + (game_width / 2) - 26, camera.y + 5, 41, 40);
                
                context.drawImage(icon, 0, 0, w, h, camera.x + (game_width - icon.width) / 2, camera.y + 10, w * .75, h * .75);
            }
        };
    }();
});
