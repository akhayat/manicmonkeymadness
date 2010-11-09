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
            grey: { density: 20, restitution: 0, friction: 1.0, power: 200 }
        };
        
        return {
        	
            //Collision callback.
            contact: function(other, velocity) {
                if (other.type === 'fort_piece') {
                    if (velocity > other.minImpactVelocity) {
                        other.damage += (velocity * this.mass) / m3.config.damage_factor;
                        
                        m3.util.log('fort piece hit weapon: ' + velocity.toFixed(2) + ' m/s');
                        m3.util.log('fort piece damage: ' + other.damage.toFixed(2));
                    }
                    
                    if (other.damage > other.destroyThreshold) {
                        other.alive = false;
                        m3.score.playerDestroyed(other);
                        
                        m3.util.log('fort piece destroyed');
                    }
                }
                else if (other.type === 'enemy') {
                    if (velocity > other.minImpactVelocity) {
                        other.damage += (velocity * this.mass) / m3.config.damage_factor;
                        
                        m3.util.log('enemy hit weapon: ' + velocity.toFixed(2) + ' m/s');
                        m3.util.log('enemy damage: ' + other.damage.toFixed(2));
                    }
                    
                    if (other.damage > other.destroyThreshold) {
                        other.alive = false;
                        m3.score.playerDestroyed(other);
                        
                        m3.util.log('enemy destroyed');
                    }
                }
            },
            
            // Constructor.
            create: function(fort, skin, type, side, angle, axisOffset, launchOffset) {
                var s = skins[skin][type],
                    d = details[type],
                    x = 0,
                    y = m3.config.level_height - m3.config.ground_height - (s.h / 2) - 5,
                    scale  = m3.config.scaling_factor;
                
                if (side === "left") {
                    x = m3.config.fort_width + m3.config.level_padding + 100;
                }
                else {
                    x = m3.config.level_width - m3.config.fort_width - m3.config.level_padding - s.w;
                }
                
                var object = Object.create(m3.types.PhysicsObject.create(x, y)),
                    
                    barrel = m3.world.createBox(x / scale, y / scale, s.w / scale, s.barrelHeight / scale,
                                                false, d.density, d.restituition, d.friction, false),
                
                    wheel = m3.world.createBall((x + axisOffset.x) / scale, (y + axisOffset.y) / scale, axisOffset.y / scale,
                		                        true, 0, d.restituition, d.friction, false),
                		                        
                
                    cannon = m3.world.createRevoluteJoint(barrel.body, wheel.body, wheel.body.GetWorldCenter());
                
                barrel.body.SetUserData(object);
                wheel.body.SetUserData(object);
                object.contact      = this.contact;
                object.type         = 'weapon';
                object.fort         = fort;
                object.alive        = true;
                object.damage       = 0;
                object.body         = wheel.body;
                object.barrel       = barrel.body;
                object.wheel        = wheel.body;
                object.joint        = cannon;
                object.shape        = barrel.shape;
                object.barrelHeight = s.barrelHeight;
                object.facing       = fort.owner ? 'left' : 'right';
                object.axisOffset   = axisOffset;
                object.launchOffset = launchOffset;
                object.weapon       = 0;
                object.power        = d.power;                
                object.image        = s.s;
                object.pType        = "rock";
                object.pDetails     = "small";
                
                return object;
            }
        };
    }();
});
