/**
 * launcher.js 
 * 
 * This module manages the launcher functions to choose weapons, take aim, and fire
 * projectiles as well as draw the launcher sprites.
 */

$(function() {
    m3.launcher = function() {
        var b2Vec2 = Box2D.Common.Math.b2Vec2,            
            mouse_coords = m3.types.Vector.create(0,0);
        
        return {
            aiming:  false,
            cannons: [],
        	projectiles: [{type:"rock", details:"small"}, 
        	              {type:"banana", details:"single"}, 
        	              {type:"banana", details:"triple"}, 
        	              {type:"watermelon", details:"whole"},
        	              {type:"monkey", details:"medium"}],
            
            /*
             * Returns the launcher of the player whose turn it is
             */
            currentLauncher: function() {
                return m3.game.state.level.fortresses[m3.game.state.active_player].weapon;
            },
            
            /*
             * Updates the mouse pixel coordinates
             */
            updateMouseCoords: function(event) {
                mouse_coords.x = event.pageX - m3.game.x + m3.camera.position.x;
                mouse_coords.y = event.pageY - m3.game.y + m3.camera.position.y;
            },
            
            /*
             * Engages the launcher
             */
            prepareLaunch: function(event) {
            	this.aiming = true;                
                this.updateMouseCoords(event);
            },
            
            /*
             * Aims the launcher with the mouse
             */
            aim: function(event) {
                if (this.aiming) {
                    var launcher = this.currentLauncher();
                	
                    this.updateMouseCoords(event);
                    
                    if (launcher.facing === "right") {                    	
                    	var angle = Math.atan2(mouse_coords.y - launcher.y, mouse_coords.x - launcher.x);
                    	
                    	if (angle > 0 && angle <= Math.PI) {
                    		angle = 0;
                    	} else if (angle < -Math.PI / 2) {
                    		angle = -Math.PI / 2;
                    	}
                    	
                    	launcher.angle = angle;
                    } 
                    else {                    	
                    	var angle = Math.atan2(launcher.y - mouse_coords.y, launcher.x - mouse_coords.x);
                    	
                    	if (angle < 0) {
                    		angle = 0;
                    	} else if (angle > Math.PI / 2) {
                    		angle = Math.PI / 2;
                    	}
                    	
                    	launcher.angle = angle;
                    }
                }
            },
            
            /*
             * Fires the projectile
             */
            launch: function(event) {
                var launcher      = this.currentLauncher(),
                    launch_offset = launcher.launchOffset,
                    theta         = launcher.angle,
                    pType         = launcher.pType,
                    pDetails      = launcher.pDetails;
                
                // Disable mouse aiming
                this.aiming = false;
                
                // Boom!
                m3.assets.sfx.explosion.play();
                
                // Spawn the projectile next to the launcher
                var projectile_offset = launcher.facing === "left" 
                		? m3.types.Vector.create(-40, -30)
                		: m3.types.Vector.create(40, -30);
                	
                // Calculate the launch point from angle
                var launch_point = m3.types.Vector.create(launcher.x + (launch_offset.x + projectile_offset.x) * Math.cos(theta), launcher.y + launch_offset.y + (launch_offset.x + projectile_offset.y) * Math.sin(theta));
                
                // Apply an impulse to give the projectile velocity
                var power = m3.types.Projectile.power(pType, pDetails);
                var impulse = launcher.facing === "left" 
                		? m3.types.Vector.create(-power * Math.cos(theta), -power * Math.sin(theta))
                		: m3.types.Vector.create(power * Math.cos(theta), power * Math.sin(theta));
                
                // Create the projectile(s)
                if (pDetails === "triple") {
                	m3.game.state.active_projectile[0] = m3.types.Projectile.create(launch_point.x, launch_point.y + 20, 0, impulse, pType, pDetails);
                	m3.game.state.active_projectile[1] = m3.types.Projectile.create(launch_point.x, launch_point.y, 0, impulse, pType, pDetails);
                	m3.game.state.active_projectile[2] = m3.types.Projectile.create(launch_point.x, launch_point.y - 20, 0, impulse, pType, pDetails);
                }
                else if (pType === "monkey"){
                	m3.assets.sfx.monkeyScream.play()
                	var angle = launcher.facing === "left" ? -Math.PI / 2 : Math.PI / 2;
                	m3.game.state.active_projectile[0] = m3.types.Projectile.create(launch_point.x, launch_point.y, angle, impulse, pType, pDetails);
                }
                else {
                	m3.game.state.active_projectile[0] = m3.types.Projectile.create(launch_point.x, launch_point.y, 0, impulse, pType, pDetails);
                }
                                
                // Follow the projectile
                m3.camera.follow(m3.game.state.active_projectile[0]);
                
                m3.util.log("fire!!!  Angle = " + (-1 * theta * (180 / Math.PI)).toFixed(2));
            },
            
            /*
             * Changes the current weapon
             */
            changeWeapon: function() {
                var launcher = this.currentLauncher();

                do { launcher.weapon = (launcher.weapon + 1) % this.projectiles.length;
                } while(this.projectiles[launcher.weapon].locked);
                
        		launcher.pType = this.projectiles[launcher.weapon].type;
        		launcher.pDetails = this.projectiles[launcher.weapon].details;
            },
            
            /*
             * Unlocks a weapon
             */
            unlock: function(weapon, details) {
            	for(var i = 0, n = this.projectiles.length; i < n; i+=1) {
            		var proj = this.projectiles[i];
            	    if(proj.type === weapon && proj.details === details) {
            	    	proj.locked = false;
            	    	break;
            	    } 
            	}
            	 
            },
            
            /*
             * Unlock all weapons
             */
            unlockAllWeapons: function() {
            	for(var i = 1, n = this.projectiles.length; i < n; i+=1) {
            		this.projectiles[i].locked = false;
            	}
            },
            
            /*
             * Locks everything but the rock
             */
            lockAllWeapons: function() {
            	for(var i = 1, n = this.projectiles.length; i < n; i+=1) {
            		this.projectiles[i].locked = true;
            	}
            },
            
            /*
             * Draws the launcher and moves it with the keyboard
             */
            update: function() {
            	var launcher = this.currentLauncher(),
            	    angle    = launcher.angle,
            	    speed    = m3.config.rotation_speed,
            	    time     = m3.game.elapsed,
            	    context  = m3.game.context;

            	// Rotate current launcher with keyboard
            	if (launcher.facing === "left") {
                    if (m3.input.keys.Z && angle > speed * time) {
                	    launcher.angle -= speed * time;
                    }
                
                    if (m3.input.keys.X && angle < Math.PI / 2 - (speed * time)) {
                	    launcher.angle += speed * time;
                    }
            	} else {
                    if (m3.input.keys.Z && angle < -speed * time) {
                	    launcher.angle += speed * time;
                    }
                
                    if (m3.input.keys.X && angle > -Math.PI / 2 + (speed * time)) {
                	    launcher.angle -= speed * time;
                    }
            	}    
            	
            	if (m3.world.debugDrawMode()) return;
            	
                // Draws both launchers at the appropriate angles.
                for (var i = 0; i < 2; i++) {
                    var launcher = m3.game.state.level.fortresses[i].weapon,
                        axisOffset = launcher.axisOffset,
                        barrel_height = launcher.barrel_height,
                        image = launcher.image;
                    
                    context.save();
                    
                    // Rotate about the wheel axle
                    context.translate(launcher.x, launcher.y);
                    
                    if (launcher.facing === "left") {
                        context.scale(-1, 1);
                        context.rotate(-launcher.angle);                        
                        context.translate(image.width / -2, 0);                
                        context.drawImage(image, axisOffset.x, -(barrel_height / 2 + axisOffset.y));
                    }
                    else {
                        context.rotate(launcher.angle);
                        context.translate(image.width / -2, 0);
                        context.drawImage(image, -axisOffset.x, -(barrel_height / 2 + axisOffset.y));
                    }
                    
                    context.restore();
                }
            }
        };
    }();
});
