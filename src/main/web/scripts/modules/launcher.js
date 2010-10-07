/**
 * launcher.js 
 * 
 * This module is supposed to determine a launch angle using click and drag. The original
 * click location is supposed to be origin and the angle is determined by where the user 
 * lets go. Similar to crush the castle
 */

$(function() {
    m3.launcher = function() {
        //var aiming       = false,
        var mouse_coords = m3.types.Vector.create();
        
        // Simple private object to represent both players' cannons.
        var Cannon = function(x, y, x_offset, y_offset, facing) {
            this.x      = x;
            this.y      = y;
            this.angle  = 0;
            this.image  = m3.assets.sprites.cannon;
            this.offset = m3.types.Vector.create(x_offset, y_offset);
            this.facing = facing;
            
            this.weapon = 0;
        };
        
        return {
        	
        	aiming: false,
        	
            cannons: [new Cannon(150, 325, 56, 88, "right"), new Cannon(m3.config.level_width - 350, 325, 135, 88, "left")],
            
            // Returns the current cannon based on whose turn it is.
            currentCannon: function() {
                return this.cannons[m3.game.state.active_player];
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
                    var right = cannon.facing == "right" 
                    var x = ( right ? cannon.x : m3.game.width - cannon.offset.x);
                    var y = (right ? cannon.y : m3.game.height - cannon.offset.y);
                    
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
                var cannon = this.currentCannon(),
                    theta  = cannon.angle,
                    weapon = cannon.weapon;
                
                this.aiming = false;
                m3.util.log("fire!!!  Angle = " + -1 * theta * (180 / Math.PI));
                
                // Apply an impulse to give the projectile velocity in the x and y directions
                var magnitude = 200;
                var ball_pos = m3.types.Vector.create(cannon.x / m3.config.scaling_factor, cannon.y / m3.config.scaling_factor + 2.0);
                var impulse = m3.types.Vector.create(magnitude * Math.cos(theta), magnitude * Math.sin(theta));
                
                if (cannon.facing === "right") {
                    ball_pos.x += 5.5;
                }
                else {
                    impulse.x = -impulse.x;
                    impulse.y = -impulse.y;
                }
                
                m3.game.state.active_projectile = m3.types.Projectile.create(ball_pos.x, ball_pos.y, impulse.x, impulse.y, weapon);
                m3.camera.follow(m3.game.state.active_projectile);
            },
            
            changeWeapon: function() {
                var cannon = this.currentCannon(),
                    weapon = cannon.weapon;
                
                if (weapon < 1) {
                    cannon.weapon += 1;
                }
                else {
                    cannon.weapon = 0;
                }
            },
            
            init: function() {
                // Nothing here right now
            },
            
            update: function() {
                var context = m3.game.context;
                
                // Draws both cannons at the appropriate angles.
                for (var i = 0; i < 2; i++) {
                    var cannon = this.cannons[i];
                    
                    context.save();
                    
                    // This translate and rotate ensures the rotation is around the wheel of the cannon
                    // instead of the origin
                    context.translate(cannon.x + cannon.offset.x, cannon.y + cannon.offset.y);
                    context.rotate(cannon.angle);
                    context.scale(.5, .5);
                    
                    if (cannon.facing === "left") {
                        context.translate(cannon.image.width, 0);
                        context.scale(-1, 1);
                        context.drawImage(cannon.image, cannon.offset.x, -cannon.offset.y);
                    }
                    else {
                        context.drawImage(cannon.image, -cannon.offset.x, -cannon.offset.y);
                    }
                    
                    context.restore();
                }
            },
        };
    }();
});
