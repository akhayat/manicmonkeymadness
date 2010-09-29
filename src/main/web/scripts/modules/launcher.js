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
        var coords = { down: false };
        
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
            cannons: [new Cannon(10, 325, 56, 88, "right"), new Cannon(m3.config.level_width - 200, 325, 135, 88, "left")],
            
            // Returns the current cannon based on whose turn it is.
            currentCannon: function() {
                return this.cannons[m3.game.state.active_player];
            },
            
            prepareLaunch: function(event) {
                coords.down = !coords.down;
            },
            
            aim: function(event) {
                if (coords.down) {
                    var cannon = this.currentCannon();
                    
                    coords.x = event.pageX;
                    coords.y = event.pageY;
                    
                    // Calculates the angle using the cannon
                    // and the mouse location. Good ole trig.
                    cannon.angle = Math.atan((coords.y - cannon.y) / (coords.x - cannon.x));
                }
            },
            
            launch: function(event) {
                var cannon = this.currentCannon(),
                    theta  = cannon.angle;
                
                coords.down = !coords.down
                m3.util.log("fire!!!  Angle = " + -1 * theta * (180 / Math.PI));
                
                var magnitude = 200;
                var ball_x = cannon.x / m3.config.scaling_factor;
                var ball_y = cannon.y / m3.config.scaling_factor + 2.0;
                var impulse = new m3.types.Vector(magnitude * Math.cos(theta), magnitude * Math.sin(theta));
                
                if (cannon.facing === "right") {
                    ball_x += 5.5;
                }
                else {
                    impulse.x = -impulse.x;
                    impulse.y = -impulse.y;
                }
                
                m3.util.log(ball_x + ", " + ball_y);
                var ball = m3.world.createBall(ball_x, ball_y, 1, false, 2, .1, 1).body
                ball.ApplyImpulse(new b2Vec2(impulse.x, impulse.y), new b2Vec2(ball.m_xf.position.x, ball.m_xf.position.y));
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
