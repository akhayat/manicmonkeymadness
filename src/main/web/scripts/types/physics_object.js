/**
 * physics_object.js
 * 
 * This object represents a physical object in the world. It is essentially a wrapper
 * around a Box2D object and a sprite. It is meant to be an "abstract" object in that
 * you shouldn't instantiate copies of it directly. Instead, create an object that
 * inherits from this object.
 * 
 */

$(function() {
    m3.types.PhysicsObject = function() {
        // Private members.
        var Sprite  = m3.types.Sprite,
            context = m3.game.context;
        
        var proto = {
            // Public members.
            body:   null,
            shape:  null,
            sprite: null,
            
            // Removes an object from the world.
            destroy: function() {
                m3.world.removeObject(this.body);
            },
            
            // Update function draws the sprite onto the object.
            update: function() {
                var radius = this.radius;
                
                context.save();
                context.translate(this.x, this.y);
                context.rotate(this.angle);
                context.translate(-radius, -radius);
                this.sprite.update();
                context.restore();
            },
            
            // "Constructor".
            create: function(x, y) {
                return Object.create(this);
            },
        };
        
        // Getters for x and y (in pixels and meters).
        proto.__defineGetter__("x", function() {
            return this.x_in_meters * m3.config.scaling_factor;
        });
        
        proto.__defineGetter__("y", function() {
            return this.y_in_meters * m3.config.scaling_factor;
        });
        
        proto.__defineGetter__("x_in_meters", function() {
            return this.body.GetPosition().x;
        });
        
        proto.__defineGetter__("y_in_meters", function() {
            return this.body.GetPosition().y;
        });
        
        // Getters for radius (in pixels and meters).
        proto.__defineGetter__("radius", function() {
            return this.radius_in_meters * m3.config.scaling_factor;
        });
        
        proto.__defineGetter__("radius_in_meters", function() {
            return this.shape.GetRadius();
        });
        
        // Getter for angle (in radians).
        proto.__defineGetter__("angle", function() {
            return this.body.GetAngle();
        });
        
        return proto;
    }();
});
