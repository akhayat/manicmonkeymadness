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
        return function(x, y, impulse_x, impulse_y) {
            this.body = m3.world.createBall(x, y, 1, false, 2, .1, 1).body;
            
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
     * Removes a projectile from the world.
     */
    m3.types.Projectile.prototype.destroy = function() {
        m3.world.removeObject(this.body);
    };
});
