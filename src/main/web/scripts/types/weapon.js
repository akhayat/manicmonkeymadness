/**
 * weapon.js
 * 
 * This object represents the launcher located in each fortress.
 * 
 */

$(function() {
    m3.types.Weapon = function() {
    	    	
        var Sprite = m3.types.Sprite,
            assets = m3.assets.sprites;
        
        var skins = {
            cannon: {
                grey: { s: assets.cannon, h: 60, w: 92 }
            }       
        };
            
        var details = {
            grey: { density: 2.0, restitution: 0.1, friction: 1.0 }
        };
        
        return {
        	
            //Collision callback.
            contact: function(other, velocity) {
                if (other.type === 'fort_piece') {
                    if (velocity > other.minImpactVelocity) {
                        m3.util.log('fort piece hit weapon: ' + velocity.toFixed(2) + ' m/s');
                        other.damage += (velocity * this.mass) / m3.config.damage_factor;
                        m3.util.log('fort piece damage: ' + other.damage.toFixed(2));
                    }
                    
                    if (other.damage > other.destroyThreshold) {
                        other.alive = false;
                        m3.util.log('fort piece destroyed');
                        m3.score.playerDestroyed(other);
                    }
                }
                else if (other.type === 'enemy') {
                    if (velocity > other.minImpactVelocity) {
                        m3.util.log('enemy hit weapon: ' + velocity.toFixed(2) + ' m/s');
                        other.damage += (velocity * this.mass) / m3.config.damage_factor;
                        m3.util.log('enemy damage: ' + other.damage.toFixed(2));
                    }
                    
                    if (other.damage > other.destroyThreshold) {
                        other.alive = false;
                        m3.util.log('enemy destroyed');
                        m3.score.playerDestroyed(other);
                    }
                }
            },
        	
          
            // "Constructor".
            create: function(fort, skin, type, x, y, angle, axis) {
                var object     = Object.create(m3.types.PhysicsObject.create(x, y)),
                    s          = skins[skin][type],
                    d          = details[type],
                    scale = m3.config.scaling_factor,
                    weapon = m3.world.createBox(x / scale, y / scale, s.w / scale, 41 / scale, true, d.density, d.restitution, d.friction, false);
                
                weapon.body.SetUserData(object);
                object.contact = this.contact;
                object.type = 'weapon';
                object.facing = fort.owner ? 'left' : 'right';
                object.body  = weapon.body;
                object.shape = weapon.shape;
                object.fort = fort;
                object.angle = angle;
                object.alive = true;
                object.damage = 0;
                object.axis = axis;
                object.weapon = 0;
                object.pType      = "rock";
                object.pDetails   = "small";
                
                return object;
            }
        };
    }();
});
