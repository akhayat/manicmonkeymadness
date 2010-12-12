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
        	
        	box_coords2: m3.types.Vector.create(0,0),
        	
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
                var level_width	  = m3.config.level_width,
                	game_width    = m3.game.width,
                    game_height   = m3.game.height,
                    cannon        = m3.game.state.level.fortresses[0].weapon,
                    cannon2       = m3.game.state.level.fortresses[1].weapon,
                    icon          = m3.types.Projectile.icon(cannon.pType, cannon.pDetails),
                    icon_width    = icon.width * 0.7,
                    icon_height   = icon.height * 0.7,
                    icon2         = m3.types.Projectile.icon(cannon2.pType, cannon2.pDetails),
                    icon2_width   = icon2.width * 0.7,
                    icon2_height  = icon2.height * 0.7,
                    left_offset   = 90 + this.box_dimensions.x,
                    right_offset  = 90;
                
                this.box_coords.x  = camera.x + game_width / 2 - left_offset;
                this.box_coords.y  = camera.y + 5;
              
                this.box_coords2.x  = camera.x + game_width / 2 + right_offset;
                this.box_coords2.y  = camera.y + 5;

                context.fillStyle   = "rgba(220, 245, 255, 0.8)";
                context.strokeStyle = "rgba(0, 10, 30, 0.4)";
                context.lineWidth   = 2;
                    
                //Left box
                context.fillRect(this.box_coords.x, this.box_coords.y, this.box_dimensions.x, this.box_dimensions.y);
                context.strokeRect(this.box_coords.x, this.box_coords.y, this.box_dimensions.x, this.box_dimensions.y);
                context.drawImage(icon, 0, 0, icon.width, icon.height, this.box_coords.x + (this.box_dimensions.x - icon_width) / 2, 
                            		this.box_coords.y + (this.box_dimensions.y - icon_height) / 2, icon_width, icon_height);

                //Right box
                context.fillRect(this.box_coords2.x, this.box_coords2.y, this.box_dimensions.x, this.box_dimensions.y);
                context.strokeRect(this.box_coords2.x, this.box_coords2.y, this.box_dimensions.x, this.box_dimensions.y);
                context.drawImage(icon2, 0, 0, icon2.width, icon2.height, this.box_coords2.x + (this.box_dimensions.x - icon2_width) / 2, 
                            		this.box_coords2.y + (this.box_dimensions.y - icon2_height) / 2, icon2_width, icon2_height);
                
                if (newWeapon) {
                    context.fillStyle   = "rgba(240, 255, 245, 0.95)";
                    context.strokeStyle = "rgba(0, 25, 0, 0.75)";
                    context.font        = "20px Tahoma, Geneva, sans-serif";
                    context.textAlign   = "center";
                    ui.drawStrokedText("Unlocked a new weapon!", camera.x + game_width / 2, camera.y + game_height / 2);
                }               
            }
        };
    }();
});
