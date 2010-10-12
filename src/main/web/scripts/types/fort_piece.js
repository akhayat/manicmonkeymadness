/**
 * fort_piece.js
 * 
 * This object represents a chunk of a fort.
 * 
 */

$(function() {
    m3.types.FortPiece = function() {
        var Sprite = m3.types.Sprite,
            assets = m3.assets.sprites.fort_pieces;
        
        var pieces = {
            box: {
                long: {
                    wood: { s: assets.box_long_wood, h: 100, w: 10 }
                },
                short: {
                    wood: { s: assets.box_short_wood, h: 50, w: 10 }
                }
            }
        };
        
        var materials = {
            wood: { density: 1.5, restitution: 0.25, friction: 0.85, minImpactVelocity: 0.5, splitThreshold: 1.5, destroyThreshold: 3.75 }
        };
        
        return {
            // Collision callback.
            contact: function(other, velocity) {
                if (other.type === 'fort_piece') {
                    if (velocity > this.minImpactVelocity) {
                        m3.util.log('fort piece hit fort piece at: ' + velocity.toFixed(2) + 'm/s');
                        other.damage += (velocity * this.mass) / m3.config.damage_factor;
                        m3.util.log('fort piece damage: ' + other.damage.toFixed(2));
                    }
                    
                    if (other.damage > other.destroyThreshold) {
                        other.alive = false;
                        m3.util.log('fort piece destroyed');
                        m3.score.playerDestroyed(other);
                    }
                }
                else if (other.type === 'projectile') {
                    if (velocity > this.minImpactVelocity) {
                        m3.util.log('projectile hit fort piece at: ' + velocity.toFixed(2) + ' m/s');
                        this.damage += (velocity * other.mass) / m3.config.damage_factor;
                        m3.util.log('fort piece damage: ' + this.damage.toFixed(2))
                    }
                    
                    if (this.damage > this.destroyThreshold) {
                        this.alive = false;
                        m3.util.log('fort piece destroyed');
                        m3.score.playerDestroyed(this);
                    }
                }
            },
            
            // "Constructor".
            create: function(fort, shape, size, material, x, y, angle) {
                var object = Object.create(m3.types.PhysicsObject.create(x, y)),
                    t     = pieces[shape][size][material],
                    m     = materials[material],
                    scale = m3.config.scaling_factor,
                    piece = m3.world.createBox(x / scale, y / scale, t.w / scale, t.h / scale,
                                               false, m.density, m.restitution, m.friction, false);
                
                piece.body.SetUserData(object);
                object.contact = this.contact;
                object.fort    = fort;
                object.body    = piece.body;
                object.shape   = piece.shape;
                object.sprite  = Sprite.create(t.s, t.h, t.w);
                object.angle   = angle;
                object.type    = "fort_piece";
                object.alive   = true;
                object.damage  = 0;
                object.destroyThreshold = m.destroyThreshold;
                object.minImpactVelocity = m.minImpactVelocity;
                
                return object;
            },
            
            update: function() {
                m3.util.log('piece update called');
            }
        };
    }();
});
