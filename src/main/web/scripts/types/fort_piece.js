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
                    wood: { s: assets.box_long_wood, h: 100, w: 10 },
                    rock: { s: assets.box_long_rock, h: 100, w: 10 }
                },
                short: {
                    wood: { s: assets.box_short_wood, h: 50, w: 10 },
                    rock: { s: assets.box_short_rock, h: 50, w: 10 }
                }
            }
        };
        
        var materials = {
            wood: { density: 3.0,  restitution: 0.25, friction: 0.8, minImpactVelocity: 0.5,  destroyThreshold: 4.0 },
            rock: { density: 13.0, restitution: 0.5,  friction: 0.9, minImpactVelocity: 0.65, destroyThreshold: 8.0 }
        };
        
        return {
            // Collision callback.
            contact: function(other, velocity) {
                if (other.type === 'fort_piece') {
                    if (velocity > this.minImpactVelocity) {
                        m3.util.log('fort piece hit fort piece at: ' + velocity.toFixed(2) + 'm/s');
                        other.damage += (velocity * this.mass) / m3.config.damage_factor;
                        m3.util.log('fort piece damage: ' + this.damage.toFixed(2));
                        m3.util.log('fort piece damage: ' + other.damage.toFixed(2));
                    }
                    
                    if (other.damage > other.destroyThreshold) {
                        other.alive = false;
                        m3.util.log('fort piece destroyed');
                        m3.score.playerDestroyed(other);
                    }
                }
                else if (other.type === 'enemy') {
                    if (velocity > this.minImpactVelocity) {
                        m3.util.log('fort piece hit enemy at: ' + velocity.toFixed(2) + ' m/s');
                        other.damage += (velocity * this.mass) / m3.config.damage_factor;
                        m3.util.log('fort piece damage: ' + this.damage.toFixed(2));
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
            create: function(fort, shape, size, material, x, y, angle, container) {
                var object = Object.create(m3.types.PhysicsObject.create(x, y, container)),
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
                object.destroyThreshold  = m.destroyThreshold;
                object.minImpactVelocity = m.minImpactVelocity;
                
                return object;
            },
        };
    }();
});
