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
                grey: { s: assets.cannon, h: 60, w: 92, barrelHeight: 41 }
            }       
        };
        
        var details = {
            grey: { density: 2.0, restitution: 0.1, friction: 1.0, power: 200 }
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
            
            // Constructor.
            create: function(fort, skin, type, side, angle, axisOffset, launchOffset) {
                var s = skins[skin][type],
                    d = details[type],
                    x = 0,
                    y = 380;
                
                if (side === "left") {
                    x = m3.config.fort_width + m3.config.level_padding + 50;
                }
                else {
                    x = m3.config.level_width - m3.config.fort_width - m3.config.level_padding - s.w + 42;
                }
                
                var object = Object.create(m3.types.PhysicsObject.create(x, y)),
                    scale  = m3.config.scaling_factor,
                    weapon = m3.world.createBox(x / scale, y / scale, s.w / scale, s.barrelHeight / scale,
                                                true, d.density, d.restitution, d.friction, false);
                
                weapon.body.SetUserData(object);
                object.contact      = this.contact;
                object.type         = 'weapon';
                object.facing       = fort.owner ? 'left' : 'right';
                object.body         = weapon.body;
                object.shape        = weapon.shape;
                object.fort         = fort;
                object.angle        = angle;
                object.alive        = true;
                object.damage       = 0;
                object.axisOffset   = axisOffset;
                object.launchOffset = launchOffset;
                object.weapon       = 0;
                object.power        = d.power;
                object.barrelHeight = s.barrelHeight;
                object.image        = s.s;
                object.pType        = "rock";
                object.pDetails     = "small";
                
                return object;
            }
        };
    }();
});