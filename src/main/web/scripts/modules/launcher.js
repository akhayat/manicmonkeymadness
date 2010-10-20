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
            
            // Returns the current cannon based on whose turn it is.
            currentCannon: function() {
                return m3.game.state.level.fortresses[m3.game.state.active_player].weapon;
            },
            
            prepareLaunch: function(event) {
                this.aiming = true;
            },
            
            aim: function(event) {
                if (this.aiming) {
                    var cannon = this.currentCannon();
                    
                    mouse_coords.x = event.pageX - m3.game.x;
                    mouse_coords.y = event.pageY - m3.game.y;
                    
                    // Since there is a difference between the width of the actual level, and the 
                    // width of the canvas, I had to include this so that the rotation of the cannon
                    // would be smooth.
                    var right = cannon.facing == "right";
                    var x = (right ? cannon.x : m3.game.width - cannon.axis.x);
                    var y = (right ? cannon.y : m3.game.height - cannon.axis.y);
                    
                    // Caps the angle at 90 or 0.
                    if (right) {
                        // Calculates the angle using the cannon and the mouse location. Good ole trig.
                        cannon.angle = Math.atan2((mouse_coords.y - y),(mouse_coords.x - x));
                        if (cannon.angle > 0 && cannon.angle <= Math.PI) {
                            cannon.angle = 0;
                        }
                        else if (cannon.angle < -1 * Math.PI / 2) {
                            cannon.angle = -1 * Math.PI / 2;
                        }
                    }
                    else {
                        // I have to negate the x and y values so it fires in the correct direction.
                        cannon.angle = Math.atan2((y - mouse_coords.y),(x - mouse_coords.x));
                        if (cannon.angle < 0) {
                            cannon.angle = 0;
                        }
                        else if (cannon.angle > Math.PI / 2) {
                            cannon.angle = Math.PI / 2;
                        }
                    }
                }
            },
            
            launch: function(event) {
                var cannon   = this.currentCannon(),
                    theta    = cannon.angle,
                    pType    = cannon.pType,
                	pDetails = cannon.pDetails;
                
                this.aiming = false;
                m3.util.log("fire!!!  Angle = " + (-1 * theta * (180 / Math.PI)).toFixed(2));
                
                // Apply an impulse to give the projectile velocity in the x and y directions
                var magnitude = 200;
                var ball_pos = m3.types.Vector.create(cannon.x / m3.config.scaling_factor, (cannon.y + 24.0) / m3.config.scaling_factor);
                var impulse = m3.types.Vector.create(magnitude * Math.cos(theta), magnitude * Math.sin(theta));
                
                if (cannon.facing === "right") {
                    ball_pos.x += 92 / m3.config.scaling_factor;
                }
                else {
                    impulse.x = -impulse.x;
                    impulse.y = -impulse.y;
                }

                m3.game.state.active_projectile = m3.types.Projectile.create(ball_pos.x, ball_pos.y, impulse.x, impulse.y, pType, pDetails);
                m3.camera.follow(m3.game.state.active_projectile);
            },
            
            changeWeapon: function() {
                var cannon = this.currentCannon();
                
                if (cannon.weapon < 1) {
                    cannon.weapon += 1;
                    cannon.pType = "banana";
                    cannon.pDetails = "single";
                }
                else {
                    cannon.weapon = 0;
                    cannon.pType = "rock";
                    cannon.pDetails = "small";
                }
            },
            
            update: function() {
                var context = m3.game.context;
                
                // Draws both cannons at the appropriate angles.
                for (var i = 0; i < 2; i++) {
                	var fortress = m3.game.state.level.fortresses[i];
                    var cannon = fortress.weapon;
                    
                    context.save();
                    
                    // This translate and rotate ensures the rotation is around the wheel of the cannon
                    // instead of the origin
                    context.translate(cannon.x + cannon.axis.x, cannon.y + cannon.axis.y);
                    context.rotate(cannon.angle);
                    
                    if (cannon.facing === "left") {
                        context.translate(this.image.width, 0);
                        context.scale(-1, 1);
                        context.drawImage(this.image, cannon.axis.x, -cannon.axis.y);
                    }
                    else {
                        context.drawImage(this.image, -cannon.axis.x, -cannon.axis.y);
                    }
                    
                    context.restore();
                }
            }
        };
    }();
});
