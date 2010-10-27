/**
 * launcher.js 
 * 
 * This module is supposed to determine a launch angle using click and drag. The original
 * click location is supposed to be origin and the angle is determined by where the user 
 * lets go. Similar to crush the castle
 */

$(function() {
    m3.launcher = function() {
        var mouse_coords = m3.types.Vector.create();

        return {
            aiming:  false,
            cannons: [],
            
            image: m3.assets.sprites.cannon,
            
            // Returns the current launcher based on whose turn it is.
            currentLauncher: function() {
                return m3.game.state.level.fortresses[m3.game.state.active_player].weapon;
            },
            
            prepareLaunch: function(event) {
                this.aiming = true;
            },
            
            aim: function(event) {
                if (this.aiming) {
                    var launcher = this.currentLauncher();
                    
                    mouse_coords.x = event.pageX - m3.game.x;
                    mouse_coords.y = event.pageY - m3.game.y;
                    
                    // Since there is a difference between the width of the actual level, and the 
                    // width of the canvas, I had to include this so that the rotation of the launcher
                    // would be smooth.
                    var right = launcher.facing === "right";
                    var x = (right ? launcher.x : m3.game.width - launcher.axis.x);
                    var y = (right ? launcher.y : m3.game.height - launcher.axis.y);
                    
                    // Caps the angle at 90 or 0.
                    if (right) {
                        // Calculates the angle using the launcher and the mouse location. Good ole trig.
                        launcher.angle = Math.atan2((mouse_coords.y - y),(mouse_coords.x - x));
                        if (launcher.angle > 0 && launcher.angle <= Math.PI) {
                            launcher.angle = 0;
                        }
                        else if (launcher.angle < -1 * Math.PI / 2) {
                            launcher.angle = -1 * Math.PI / 2;
                        }
                    }
                    else {
                        // I have to negate the x and y values so it fires in the correct direction.
                        launcher.angle = Math.atan2((y - mouse_coords.y),(x - mouse_coords.x));
                        if (launcher.angle < 0) {
                            launcher.angle = 0;
                        }
                        else if (launcher.angle > Math.PI / 2) {
                            launcher.angle = Math.PI / 2;
                        }
                    }
                }
            },
            
            launch: function(event) {
                var launcher   = this.currentLauncher(),
                    theta    = launcher.angle,
                    pType    = launcher.pType,
                	pDetails = launcher.pDetails;
                
                this.aiming = false;
                m3.util.log("fire!!!  Angle = " + (-1 * theta * (180 / Math.PI)).toFixed(2));
                m3.assets.sfx.explosion.play();
                
                // Apply an impulse to give the projectile velocity in the x and y directions
                var magnitude = 200;
                var ball_pos = m3.types.Vector.create(launcher.x / m3.config.scaling_factor, (launcher.y + 24.0) / m3.config.scaling_factor);
                var impulse = m3.types.Vector.create(magnitude * Math.cos(theta), magnitude * Math.sin(theta));
                
                if (launcher.facing === "right") {
                    ball_pos.x += 92 * Math.cos(theta) / m3.config.scaling_factor;
                }
                else {
                    impulse.x = -impulse.x;
                    impulse.y = -impulse.y;
                }

                m3.game.state.active_projectile = m3.types.Projectile.create(ball_pos.x, ball_pos.y, impulse.x, impulse.y, pType, pDetails);
                m3.camera.follow(m3.game.state.active_projectile);
            },
            
            changeWeapon: function() {
                var launcher = this.currentLauncher();
                
                if (launcher.weapon < 1) {
                    launcher.weapon += 1;
                    launcher.pType = "banana";
                    launcher.pDetails = "single";
                }
                else {
                    launcher.weapon = 0;
                    launcher.pType = "rock";
                    launcher.pDetails = "small";
                }
            },
            
            update: function() {
                var context = m3.game.context;
                
                // Draws both launchers at the appropriate angles.
                for (var i = 0; i < 2; i++) {
                	var fortress = m3.game.state.level.fortresses[i];
                    var launcher = fortress.weapon;
                   
                    context.save();
                    
                    // This translate and rotate ensures the rotation is around the wheel of the launcher
                    // instead of the origin
                    context.translate(launcher.x, launcher.y);
                    
                    if (launcher.facing === "left") {
                    	context.scale(-1, 1);
                        context.translate(-launcher.axis.x, launcher.axis.y);
                        context.rotate(-launcher.angle);                        
                        context.translate(this.image.width / -2, 0);                        
                        context.drawImage(this.image, launcher.axis.x, -(41/2 + launcher.axis.y));
                    }
                    else {
                        context.translate(launcher.axis.x, launcher.axis.y);
                        context.rotate(launcher.angle);
                        context.translate(this.image.width / -2, 0);
                        context.drawImage(this.image, -launcher.axis.x, -(41/2 + launcher.axis.y));
                    }
                    
                    context.restore();
                }
            }
        };
    }();
});