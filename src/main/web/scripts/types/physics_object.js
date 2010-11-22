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
        var PhysicsObject = {};
        PhysicsObject.PhysicsObject = PhysicsObject;
        
        // Private members.
        var Sprite  = m3.types.Sprite,
            context = m3.game.context;
        
        // This returns the boundaries of the physics object accounting for rotation.
        PhysicsObject.getBounds = function() {
            var vertices = this.shape.m_vertices,
                scale    = m3.config.scaling_factor;
            
            var bounds = {
                left:   vertices[0].x,
                right:  vertices[0].x,
                top:    vertices[0].y,
                bottom: vertices[0].y
            };
            
            for (var i = 1, n = vertices.length; i < n; i++) {
                if (!vertices[i]) {
                    break;
                }
                
                bounds.left   = Math.min(bounds.left,   vertices[i].x);
                bounds.right  = Math.max(bounds.right,  vertices[i].x);
                bounds.top    = Math.min(bounds.top,    vertices[i].y);
                bounds.bottom = Math.max(bounds.bottom, vertices[i].y);
            }
            
            bounds.left   = this.x + bounds.left * scale;
            bounds.right  = this.x + bounds.right * scale;
            bounds.top    = this.y + bounds.top * scale;
            bounds.bottom = this.y + bounds.bottom * scale;
            
            return bounds;
        };
        
        // Removes an object from the world.
        PhysicsObject.destroy = function() {
            var container = this.container;
            
            m3.world.removeObject(this.body);
            
            if (container) {
                var i = container.indexOf(this);
                if (i >= 0) {
                    container.remove(i);
                }
            }
        };
        
        // Update function draws the sprite onto the object, and destroys the object
        // when it goes off screen.
        PhysicsObject.update = function() {
            if (this.alive) {
                var offset = m3.types.Vector.create(0, 0),
                    x      = this.x,
                    type   = this.type;
                
                switch (this.shape.GetType()) {
                    // Circle
                    case 0:
                        var r = this.radius,
                            angle = this.angle;
                        
                        if (type !== "projectile" && (x + r <= 0.0 || x - r >= m3.config.level_width)) {
                            m3.score.playerDestroyed(this);
                            this.destroy();
                        }
                        
                        offset.set(-r, -r);
                        break;
                    
                    // Polygon
                    case 1:
                        var width    = this.width,
                            height   = this.height,
                            angle    = this.angle,
                            spriteOffset = this.spriteOffset;
                            distance = Math.abs(width * Math.cos(angle) + height * Math.sin(angle));
                        
                        if (type !== "projectile" && (x + distance <= 0.0 || x - distance >= m3.config.level_width)) {
                            m3.score.playerDestroyed(this);
                            this.destroy();
                        }
                        
                        // Check for offset otherwise assume a rectangle
                        if (!!spriteOffset) {
                            offset.set(-spriteOffset.x, -spriteOffset.y);
                        }
                        else {
                            offset.set(-width, -height);
                        }    
                        break;
                }
                
                context.save();
                context.translate(this.x, this.y);
                context.rotate(angle);
                context.translate(offset.x, offset.y);
                if (!!this.sprite) this.sprite.update();
                context.restore();
            }
            else {
                this.destroy();
            }
        };
        
        // Constructor.
        PhysicsObject.create = function(x, y, container, prototype) {
            var o = Object.create(prototype || this);
            o.container = container ? container : null;
            return o;
        };
        
        // Getters and setters for x and y (in pixels and meters).
        PhysicsObject.__defineGetter__("x", function() {
            return this.x_in_meters * m3.config.scaling_factor;
        });
        
        PhysicsObject.__defineGetter__("y", function() {
            return this.y_in_meters * m3.config.scaling_factor;
        });
        
        PhysicsObject.__defineSetter__("x", function(x) {
            return this.body.m_xf.position.x = x / m3.config.scaling_factor;
        });
        
        PhysicsObject.__defineSetter__("y", function(y) {
            return this.body.m_xf.position.y = y / m3.config.scaling_factor;
        });
        
        PhysicsObject.__defineGetter__("x_in_meters", function() {
            return this.body.GetPosition().x;
        });
        
        PhysicsObject.__defineGetter__("y_in_meters", function() {
            return this.body.GetPosition().y;
        });
        
        // Getters for height and width (in pixels and meters).
        PhysicsObject.__defineGetter__("height", function() {
            return this.height_in_meters * m3.config.scaling_factor;
        });
        
        PhysicsObject.__defineGetter__("width", function() {
            return this.width_in_meters * m3.config.scaling_factor;
        });
        
        PhysicsObject.__defineGetter__("height_in_meters", function() {
            return this.body.h;
        });
        
        PhysicsObject.__defineGetter__("width_in_meters", function() {
            return this.body.w;
        });
        
        // Getters for radius (in pixels and meters).
        PhysicsObject.__defineGetter__("radius", function() {
            return this.radius_in_meters * m3.config.scaling_factor;
        });
        
        PhysicsObject.__defineGetter__("radius_in_meters", function() {
            return this.shape.GetRadius();
        });
        
        // Getter and setter for angle (in radians).
        PhysicsObject.__defineGetter__("angle", function() {
            return this.body.GetAngle();
        });
        
        PhysicsObject.__defineSetter__("angle", function(angle) {
            var body = this.body;
            body.SetXForm(body.GetPosition(), angle);
        });
        
        // Getter for mass (in kilograms).
        PhysicsObject.__defineGetter__("mass", function() {
            return this.body.GetMass();
        });
        
        return PhysicsObject;
    }();
});
