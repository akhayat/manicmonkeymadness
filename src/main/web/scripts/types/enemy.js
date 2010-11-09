/**
 * enemy.js
 * 
 * This object represents the enemy monkeys found in the fort.
 * 
 */

$(function() {
    m3.types.Enemy = function() {
        var Enemy = Object.create(m3.types.PhysicsObject);
        Enemy.Enemy = Enemy;
        
        // Private members.
        var Sprite = m3.types.Sprite;
            assets = m3.assets.sprites;
        
        var enemies = {
            monkey: {
                small: { s: assets.monkey, h: 49, w: 41 },
                medium:{ s: assets.monkey_helmet, h: 51, w: 41 }
            }
        };
        
        var details = {
            small: { density: 1.25, restitution: 0.25, friction: 0.85, minImpactVelocity: 0.3, destroyThreshold: 1.75 },
            medium:{ density: 1.25, restitution: 0.25, friction: 0.85, minImpactVelocity: 0.3, destroyThreshold: 3.0 }
        };
        
        // Collision callback.
        Enemy.contact = function(other, velocity) {
            if(velocity > this.minImpactVelocity) m3.assets.sfx.monkeyGrunt.play();
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
        };
        
        // When an enemy is destroyed, we check to see if the game has ended.
        Enemy.destroy = function() {
            this.PhysicsObject.destroy.call(this);
            
            if (this.fort.enemies.length <= 0) {
                m3.game.state.endRound((this.fort.owner + 1) % 2);
            }
        };
        
        // Constructor.
        Enemy.create = function(fort, character, type, x, y, angle, container) {
            var e     = m3.types.PhysicsObject.create(x, y, container, this),
                t     = enemies[character][type],
                d     = details[type],
                scale = m3.config.scaling_factor,
                piece = m3.world.createBox(x / scale, y / scale, t.w / scale, t.h / scale, false, d.density, d.restitution, d.friction, false);
               
                piece.body.SetUserData(e);
                e.destroyThreshold  = d.destroyThreshold;
                e.minImpactVelocity = d.minImpactVelocity;
                
                e.body    = piece.body;
                e.shape   = piece.shape;
                e.fort    = fort;
                e.type    = "enemy";
                e.subtype = character + '_' + type;
                e.angle   = angle;
                e.alive   = true;
                e.damage  = 0;                
                e.sprite  = Sprite.create(t.s, t.h, t.w);
                
                if (type === "small") {
                    e.sprite.addAnimation(e.subtype, [0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 2, 2, 3, 3, 2, 2, 3, 3, 2, 2, 0, 0], 0.12);
                }
                else if (type === "medium") {
                    e.sprite.addAnimation(e.subtype, [0, 0, 0, 0, 1, 1, 2, 2, 2, 3, 3, 3, 2, 2, 2, 3, 3, 3], 0.12);
                }
                
                e.sprite.play(e.subtype);
                
                return e;
        };
        
        return Enemy;
    }();
});
