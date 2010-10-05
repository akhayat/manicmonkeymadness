/**
 * projectile.js
 * 
 * This object represents a projectile fired from a launcher.
 * 
 */

$(function() {
    m3.types.Projectile = function() {
        /**
         * Constructor.
         */
        return function(x, y, impulse_x, impulse_y, weapon) {
            var projectile = m3.world.createBall(x, y, 1, false, 2, .1, 1, false);
            this.body  = projectile.body;
            this.shape = projectile.shape;
            
            //This will be changed to a switch statement once we develop more weapon types.
            if (weapon === 0) { 
            	this.sprite = new m3.types.Sprite(m3.assets.sprites.rock, 40, 40); 
            }
            else {
            	this.sprite = new m3.types.Sprite(m3.assets.sprites.banana, 40, 30);
            }            
            
            if (typeof(impulse_x) !== undefined && typeof(impulse_y) !== undefined) {
                this.body.ApplyImpulse(new b2Vec2(impulse_x, impulse_y), new b2Vec2(this.x_in_meters, this.y_in_meters));
            }
  
        };
    }();
    
    /**
     * Getters for x and y (in pixels and in meters).
     */
    m3.types.Projectile.prototype.__defineGetter__("x", function() {
        return this.x_in_meters * m3.config.scaling_factor;
    });
    
    m3.types.Projectile.prototype.__defineGetter__("y", function() {
        return this.y_in_meters * m3.config.scaling_factor;
    });
    
    m3.types.Projectile.prototype.__defineGetter__("x_in_meters", function() {
        return this.body.GetPosition().x;
    });
    
    m3.types.Projectile.prototype.__defineGetter__("y_in_meters", function() {
        return this.body.GetPosition().y;
    });
    
    /**
     * Getter for radius (in pixels and in meters).
     */
    m3.types.Projectile.prototype.__defineGetter__("radius", function() {
        return this.radius_in_meters * m3.config.scaling_factor;
    });
    
    m3.types.Projectile.prototype.__defineGetter__("radius_in_meters", function() {
        return this.shape.GetRadius();
    });
    
    /**
     * Getter for the angle (in radians).
     */
    m3.types.Projectile.prototype.__defineGetter__("angle", function() {
        return this.body.GetAngle();
    });
    
    /**
     * Removes a projectile from the world.
     */
    m3.types.Projectile.prototype.destroy = function() {
        m3.world.removeObject(this.body);
    };
    
    /**
     * Update function draws the sprite onto the projectile.
     */
    m3.types.Projectile.prototype.update = function() {
        var context = m3.game.context;
        
        context.save();
        context.translate(this.x, this.y);
        context.rotate(this.angle);
        context.translate(-this.radius, -this.radius);
        this.sprite.update();
        context.restore();
    };    
});
