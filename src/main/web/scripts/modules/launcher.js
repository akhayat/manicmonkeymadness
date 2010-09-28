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
        
        return {
            cannonSprite: { angle: 0, x: 20, y: 720, image: m3.assets.sprites.cannon },
            cannonOffset: new m3.types.Vector(56, 88),
            
            prepareLaunch: function(event) {
                // The angle is going to be from the wheel on the cannon to the mouse
                coords.oldX = this.cannonSprite.x;
                coords.oldY = this.cannonSprite.y;
                coords.down = !coords.down;
            },
            
            aim: function(event) {
                if (coords.down) {
                    coords.x = event.pageX;
                    coords.y = event.pageY;
                    
                    // Calculates the angle using the cannon
                    // and the mouse location. Good ole trig.
                    this.cannonSprite.angle = Math.atan((coords.y - coords.oldY) / (coords.x - coords.oldX));
                }
            },
            
            launch: function(event) {
            	var theta = this.cannonSprite.angle;
                coords.down = !coords.down
                m3.util.log("fire!!!  Angle = " + -1 * theta * (180 / Math.PI));
                
                var magnitude = 50;
                m3.world.createBox(4, 19, 1, 0.5, false, 1, 0.05).body.ApplyImpulse(new b2Vec2(magnitude * Math.cos(theta), magnitude * Math.sin(theta)), new b2Vec2(.05, 0.25));
                //m3.world.createBox(4, 19, 1, 0.5, false, 1).body.ApplyImpulse((1, 1), new b2Vec2(1, 1));
            },
            
            init: function() {
                // Nothing here right now
            },
            
            update: function() {
                var context      = m3.game.context,
                    cannonSprite = this.cannonSprite,
                    cannonOffset = this.cannonOffset;
                
                //draws the cannon at the appropriate angle
                context.save();
                context.scale(.5, .5);
                
                /* 
                 * this translate and rotate ensures the rotation is around the wheel of the cannon
                 * instead of the origin
                 */
                context.translate(cannonSprite.x + cannonOffset.x, cannonSprite.y + cannonOffset.y);
                context.rotate(cannonSprite.angle);
                
                context.drawImage(cannonSprite.image, -cannonOffset.x, -cannonOffset.y);
                context.restore();
            },
        };
    }();
});
