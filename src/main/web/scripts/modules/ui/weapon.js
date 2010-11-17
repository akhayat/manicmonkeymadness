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
            cannons = m3.launcher.cannons,
            camera  = m3.camera.position;
        
        return {
            update: function() {
                var active_player = m3.game.state.active_player,
                    cannon        = m3.game.state.level.fortresses[active_player].weapon,
                    game_width    = m3.game.width,
                    icon          = null,
                    launcher	  = m3.launcher.currentLauncher(),
                    projectile	  = m3.types.Projectile;
                
                icon = m3.types.Projectile.icon(launcher.pType, launcher.pDetails);
                
                var w = icon.width,
                    h = icon.height;
                
                context.fillStyle   = "rgba(220, 245, 255, 0.8)";
                context.strokeStyle = "rgba(0, 10, 30, 0.4)";
                context.lineWidth   = 2;
                context.fillRect(camera.x + (game_width / 2) - 26, camera.y + 5, 41, 45);
                context.strokeRect(camera.x + (game_width / 2) - 26, camera.y + 5, 41, 45);
                
                context.drawImage(icon, 0, 0, w, h, camera.x + (game_width - icon.width) / 2, camera.y + 26 - (icon.height * .7 / 2), w * .7, h * .7);
            }
        };
    }();
});
