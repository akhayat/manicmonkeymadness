/**
 * launcher.js 
 * 
 * This module is supposed to determine a launch angle using click and drag.  The original
 * click location is supposed to be origin and the angle is determined by where the user 
 * lets go.   Similar to crush the castle
 */

$(function() {
    m3.launcher = function() {
        //keeps track of the coordinates and whether the mouse click is up or down
        var aiming       = false,
            mouse_coords = new m3.types.Vector();
        
        // Simple private object to represent both players' cannons.
        var Cannon = function(x, y, x_offset, y_offset, facing) {
            this.x      = x;
            this.y      = y;
            this.angle  = 0;
            this.image  = m3.assets.sprites.cannon;
            this.offset = new m3.types.Vector(x_offset, y_offset);
            this.facing = facing;
        };
        
        return {
            cannons: [new Cannon(150, 325, 56, 88, "right"), new Cannon(m3.config.level_width - 350, 325, 135, 88, "left")],
            
            // Returns the current cannon based on whose turn it is.
            currentCannon: function() {
                return this.cannons[m3.game.state.active_player];
            },
            
            prepareLaunch: function(event) {
                aiming = true;
            },
            
            aim: function(event) {
                if (aiming === true) {
                    var cannon = this.currentCannon();
                    
                    mouse_coords.x = event.pageX - m3.game.x;
                    mouse_coords.y = event.pageY - m3.game.y;
                    
                    /* Since there is a difference between the width of the actual level, and the 
                     * width of the canvas, I had to include thisi so that the rotation of the cannon
                     * would be smooth
                     */
                    var right = cannon.facing == "right" 
                    var x = ( right ? cannon.x : m3.game.width - cannon.offset.x);
                    var y = (right ? cannon.y : m3.game.height - cannon.offset.y);
                    
                    // Calculates the angle using the cannon and the mouse location. Good ole trig.
                    cannon.angle = Math.atan((mouse_coords.y - y) / (mouse_coords.x - x));
                    
                    //caps the angle at 90 or 0
                    if(right) {
                        if(cannon.angle > 0 && cannon.angle < Math.PI / 4) {
                    	    cannon.angle = 0;
                        } else if (cannon.angle > Math.PI / 4) {
                    	    cannon.angle = -1 * Math.PI / 2;
                        }
                    } else {
                        if(cannon.angle < 0 && cannon.angle > -1 * Math.PI / 4) {
                    	    cannon.angle = 0;
                        } else if (cannon.angle < -1 * Math.PI / 4) {
                    	    cannon.angle = Math.PI / 2;
                        }
                    }
                }
            },
            
            launch: function(event) {
                var cannon = this.currentCannon(),
                    theta  = cannon.angle;
                
                aiming = false;
                m3.util.log("fire!!!  Angle = " + -1 * theta * (180 / Math.PI));
                
                //Apply an impulse to give the projectile velocity in the x and y directions
                var magnitude = 200;
                var ball_pos = new m3.types.Vector(cannon.x / m3.config.scaling_factor, cannon.y / m3.config.scaling_factor + 2.0);
                var impulse = new m3.types.Vector(magnitude * Math.cos(theta), magnitude * Math.sin(theta));
                
                if (cannon.facing === "right") {
                    ball_pos.x += 5.5;
                }
                else {
                    impulse.x = -impulse.x;
                    impulse.y = -impulse.y;
                }
                
                m3.game.state.active_projectile = new m3.types.Projectile(ball_pos.x, ball_pos.y, impulse.x, impulse.y);
                m3.camera.follow(m3.game.state.active_projectile);
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
