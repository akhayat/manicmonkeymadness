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
            camera  = m3.camera.position,
            newWeapon = false;
        
        return {
        	/*
        	 * Weapon selection box data
        	 */
        	box_coords: m3.types.Vector.create(0,0),
        	
        	box_dimensions: m3.types.Vector.create(41, 45),
        	
        	/*
        	 * Unlocks a weapon based on the number of shots taken
        	 */
        	unlockNewWeapon: function(shot) {
        		newWeapon = shot % 2 === 0 && shot / 2 < m3.launcher.projectiles.length;
                switch (shot / 2) {
                    case 1: 
                        m3.launcher.unlock("banana", "single"); 
                        break;
                    case 2: 
                        m3.launcher.unlock("banana", "triple"); 
                        break;
                    case 3: 
                        m3.launcher.unlock("monkey", "medium");
                        break;
                    case 4:
                        m3.launcher.unlock("watermelon", "whole");
                        break;
                    default: break;
                }
        	},
        	

        	/*
        	 * Draws the weapon selection box
        	 */
            update: function() {
                var game_width    = m3.game.width,
                    game_height   = m3.game.height,
                    launcher	  = m3.launcher.currentLauncher(),
                    active_player = m3.game.state.active_player,
                    cannon        = m3.game.state.level.fortresses[active_player].weapon,
                    icon          = m3.types.Projectile.icon(launcher.pType, launcher.pDetails),
                    icon_width    = icon.width * 0.7,
                    icon_height   = icon.height * 0.7;
                
                this.box_coords.x  = camera.x + (game_width - this.box_dimensions.x) / 2,
                this.box_coords.y  = camera.y + 5;

                context.fillStyle   = "rgba(220, 245, 255, 0.8)";
                context.strokeStyle = "rgba(0, 10, 30, 0.4)";
                context.lineWidth   = 2;
                context.fillRect(this.box_coords.x, this.box_coords.y, this.box_dimensions.x, this.box_dimensions.y);
                context.strokeRect(this.box_coords.x, this.box_coords.y, this.box_dimensions.x, this.box_dimensions.y);
                
                if (newWeapon) {
                    context.fillStyle   = "rgba(240, 255, 245, 0.95)";
                    context.strokeStyle = "rgba(0, 25, 0, 0.75)";
                    context.font        = "20px Tahoma, Geneva, sans-serif";
                    context.textAlign   = "center";
                    ui.drawStrokedText("Unlocked a new weapon!", camera.x + game_width / 2, camera.y + game_height / 2);
                }
                
                context.drawImage(icon, 0, 0, icon.width, icon.height, camera.x + (game_width - (icon_width)) / 2, camera.y + 26 - (icon_height / 2), icon_width, icon_height);
            }
        };
    }();
});
