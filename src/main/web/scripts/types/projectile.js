/**
 * projectile.js
 * 
 * This object represents a projectile fired from a launcher.
 * 
 */

$(function() {
    m3.types.Projectile = function() {
        var Projectile = Object.create(m3.types.PhysicsObject);
        Projectile.Projectile = Projectile;
        
        // Private members.
        var Sprite = m3.types.Sprite;
            assets = m3.assets.sprites;
        
        var ammunition = {
            rock: {
                small: { s: assets.rock, h: 38, w: 38, radius: 19 }
            },
            banana: {
                single: { s: assets.banana, h: 27, w: 34, radius: 19 },
                triple: { s: assets.banana, h: 27, w: 34, radius: 19 }
            }
        
        };
        
        var details = {
            small:  { density: 2.0, restitution: 0.1, friction: 1.25 },
            single: { density: 1.5, restitution: 0,   friction: 1.0 },
            triple: { density: 1.5, restitution: 0,   friction: 1.0 }
        };
        
        // Override PhysicsObject update function to keep track of how long we've been alive.
        Projectile.update = function() {
            this.PhysicsObject.update.call(this);
            this.life_time += m3.game.elapsed;
        };
        
        Projectile.sprite = function(ammo, type) {
        	var t = ammunition[ammo][type];

        	return t.s;
        };
        
        // Collision callback.
        Projectile.contact = function(other, velocity) {
            // We want to stop following the projectile when it hits something.
            if (this.life_time > 1.0) {
                m3.camera.stopFollowing();
            }
            
            if (other.type === 'fort_piece') {
                if (velocity > other.minImpactVelocity) {
                    m3.util.log('projectile hit fort piece at: ' + velocity.toFixed(2) + ' m/s');
                    other.damage += (velocity * this.mass) / m3.config.damage_factor;
                    m3.util.log('fort piece damage: ' + other.damage.toFixed(2));
                }
                
                if (other.damage >= other.destroyThreshold / 3 && other.damage < other.destroyThreshold * 2 / 3 && other.sprites.damaged) {
                    other.sprite = other.sprites.damaged;
                }
                else if (other.damage >= other.destroyThreshold * 2 / 3 && other.damage < other.destroyThreshold && other.sprites.destroyed) {
                    other.sprite = other.sprites.destroyed;
                }
                else if (other.damage > other.destroyThreshold) {
                    other.alive = false;
                    m3.util.log('fort piece destroyed');
                    m3.score.playerDestroyed(other);
                }
            }
            else if (other.type === 'enemy') {
                if (velocity > other.minImpactVelocity) {
                    m3.util.log('projectile hit enemy at: ' + velocity.toFixed(2) + ' m/s');
                    other.damage += (velocity * this.mass) / m3.config.damage_factor;
                    m3.util.log('enemy damage: ' + other.damage.toFixed(2));
                }
                
                if (other.damage > other.destroyThreshold) {
                    other.alive = false;
                    m3.util.log('enemy destroyed');
                    m3.score.playerDestroyed(other);
                }
            }
        };
        
        // Constructor.
        Projectile.create = function(x, y, impulse_x, impulse_y, ammo, type) {
            var p     = Object.inherit(m3.types.PhysicsObject.create(x, y), this),
                t     = ammunition[ammo][type],
                d     = details[type],
                scale = m3.config.scaling_factor,
                piece = m3.world.createBall(x / scale, y / scale, t.radius / scale, false, d.density, d.restitution, d.friction, false);
            
            piece.body.SetUserData(p);
            p.contact   = this.contact;
            p.type      = "projectile";
            p.body      = piece.body;
            p.shape     = piece.shape;
            p.alive     = true;
            p.sprite    = Sprite.create(t.s, t.h, t.w);
            p.life_time = 0.0;
            
            if (impulse_x !== undefined && impulse_y !== undefined) {
                p.body.ApplyImpulse(new b2Vec2(impulse_x, impulse_y), new b2Vec2(p.x_in_meters, p.y_in_meters));
                
                var torque = (impulse_x < 0) ? -800.0 : 800.0;
                p.body.ApplyTorque(torque);
            }
            
            return p;
        };
        
        return Projectile;
    }();
});
