/**
 * enemy.js
 * 
 * This object represents the enemy monkeys found in the fort.
 * 
 */

$(function() {
    m3.types.Enemy = function() {
        var Sprite = m3.types.Sprite;
            assets = m3.assets.sprites;
        
        var enemies = {
            monkey: {
                small: { s: assets.monkey, h: 49, w: 41 },
                medium:{ s: assets.monkey_hemlet, h: 51, w: 41 }
            }
        };
        
        var details = {
                small: { density: 1.25, restitution: 0.25, friction: 0.85, minImpactVelocity: 0.3, destroyThreshold: 2 },
                medium:{ density: 1.25, restitution: 0.25, friction: 0.85, minImpactVelocity: 0.3, destroyThreshold: 3.75 }
        };
            
        return {
            // Collision callback.
            contact: function(other, velocity) {
                if (other.type === 'fort_piece') {
                    if (velocity > this.minImpactVelocity) {
                        m3.util.log('fort piece hit enemy at: ' + velocity.toFixed(2) + ' m/s');
                        other.damage += (velocity * this.mass) / m3.config.damage_factor;
                        m3.util.log('enemy damage: ' + this.damage.toFixed(2));
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
                        m3.util.log('enemy hit enemy at: ' + velocity.toFixed(2) + ' m/s');
                        other.damage += (velocity * this.mass) / m3.config.damage_factor;
                        m3.util.log('enemy damage: ' + this.damage.toFixed(2));
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
            create: function(fort, character, type, x, y, angle, container) {
                var object = Object.create(m3.types.PhysicsObject.create(x, y, container)),
                    t     = enemies[character][type],
                    d     = details[type],
                    scale = m3.config.scaling_factor,
                    enemy = m3.world.createBox(x / scale, y / scale, t.w / scale, t.h / scale, false, d.density, d.restitution, d.friction, false);
                   
                    enemy.body.SetUserData(object);
                    object.contact = this.contact;
                    object.body   = enemy.body;
                    object.shape  = enemy.shape;
                    object.fort   = fort;
                    object.type   = "enemy";
                    object.subtype = character + '_' + type;
                    object.angle  = angle;
                    object.alive  = true;
                    object.damage = 0;
                    object.destroyThreshold  = d.destroyThreshold;
                    object.minImpactVelocity = d.minImpactVelocity;
                    
                    if (type === "small") {
                        object.sprite = Sprite.create(t.s, t.h, t.w);
                        object.sprite.addAnimation(object.subtype, [0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 2, 2, 3, 3, 2, 2, 3, 3, 2, 2, 0, 0], 0.12);
                        object.sprite.play(object.subtype);
                    }
                    else if (type === "medium") {
                        object.sprite = Sprite.create(t.s, t.h, t.w);
                        object.sprite.addAnimation(object.subtype, [0, 0, 0, 0, 1, 1, 2, 2, 2, 3, 3, 3, 2, 2, 2, 3, 3, 3], 0.12);
                        object.sprite.play(object.subtype);
                    }

                    return object;
            }
        };
    }();
});
