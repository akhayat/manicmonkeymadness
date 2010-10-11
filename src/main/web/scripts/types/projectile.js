/**
 * projectile.js
 * 
 * This object represents a projectile fired from a launcher.
 * 
 */

$(function() {
    m3.types.Projectile = function() {
        var Sprite = m3.types.Sprite;
        
        return {
            // "Constructor".
            create: function(x, y, impulse_x, impulse_y, type) {
                var p          = Object.create(m3.types.PhysicsObject.create(x, y)),
                    projectile = m3.world.createBall(x, y, 1, false, 2, .1, 1, false);
                
                projectile.body.SetUserData(p);
                p.type = 'projectile';
                p.body  = projectile.body;
                p.shape = projectile.shape;
                p.alive = true;
                               
                
                // This will be changed to a switch statement once we develop more weapon types.
                if (type === 0) {
                    p.sprite = Sprite.create(m3.assets.sprites.rock, 40, 40);
                }
                else {
                    p.sprite = Sprite.create(m3.assets.sprites.banana, 40, 30);
                }
                
                if (impulse_x !== undefined && impulse_y !== undefined) {
                    p.body.ApplyImpulse(new b2Vec2(impulse_x, impulse_y), new b2Vec2(p.x_in_meters, p.y_in_meters));
                    
                    var torque = (impulse_x < 0) ? -400.0 : 400.0;
                    p.body.ApplyTorque(torque);
                }
                
                return p;
            }
        };
    }();
});
