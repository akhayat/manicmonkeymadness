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
            body:      null,
            shape:     null,
            sprite:    null,
            type:      null,
            alive:     null,
            container: null,
            
            // Removes an object from the world.
            destroy: function() {
                var container = this.container;
                
                m3.world.removeObject(this.body);
                
                if (container) {
                    var i = container.indexOf(this);
                    if (i >= 0) {
                        container.remove(i);
                    }
                }
            },
            
            // Update function draws the sprite onto the object, and destroys the object
            // when it goes off screen.
            update: function() {
                if (this.alive) {
                    var offset = m3.types.Vector.create(0, 0),
                        x      = this.x,
                        type   = this.type;
                    
                    switch (this.shape.GetType()) {
                        // Circle
                        case 0:
                            var r = this.radius;
                            
                            if (type !== "projectile" && (x + r <= 0.0 || x - r >= m3.config.level_width)) {
                                m3.score.playerDestroyed(this);
                                this.destroy();
                            }
                            
                            offset.set(-r, -r);
                            break;
                        
                        // Box
                        case 1:
                            var width    = this.width,
                                height   = this.height,
                                angle    = this.angle,
                                distance = Math.abs(width * Math.cos(angle) + height * Math.sin(angle));
                            
                            if (type !== "projectile" && (x + distance <= 0.0 || x - distance >= m3.config.level_width)) {
                                m3.score.playerDestroyed(this);
                                this.destroy();
                            }
                            
                            offset.set(-width, -height);
                            break;
                    }
                    
                    context.save();
                    context.translate(this.x, this.y);
                    context.rotate(this.angle);
                    context.translate(offset.x, offset.y);
                    if (!!this.sprite) this.sprite.update();
                    context.restore();
                }
                else {
                    this.destroy();
                }
            },
            
            // "Constructor".
            create: function(x, y, container) {
                var o = Object.create(this);
                o.container = container ? container : null;
                return o;
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
        
        // Getters for height and width (in pixels and meters).
        proto.__defineGetter__("height", function() {
            return this.height_in_meters * m3.config.scaling_factor;
        });
        
        proto.__defineGetter__("width", function() {
            return this.width_in_meters * m3.config.scaling_factor;
        });
        
        proto.__defineGetter__("height_in_meters", function() {
            return this.body.h;
        });
        
        proto.__defineGetter__("width_in_meters", function() {
            return this.body.w;
        });
        
        // Getters for radius (in pixels and meters).
        proto.__defineGetter__("radius", function() {
            return this.radius_in_meters * m3.config.scaling_factor;
        });
        
        proto.__defineGetter__("radius_in_meters", function() {
            return this.shape.GetRadius();
        });
        
        // Getter and setter for angle (in radians).
        proto.__defineGetter__("angle", function() {
            return this.body.GetAngle();
        });
        
        proto.__defineSetter__("angle", function(angle) {
            var body = this.body;
            body.SetXForm(body.GetPosition(), angle);
        });
        
        // Getter for mass (in kilograms).
        proto.__defineGetter__("mass", function() {
            return this.body.GetMass();
        });
        
        return proto;
    }();
});
