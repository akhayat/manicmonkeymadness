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
                small: { s: assets.demo, h: 23, w: 25 },
                medium:{ s: assets.demo2, h: 24, w: 33.2}
            }         		
        };
        
        var details = {
                small: { density: 1.25, restitution: 0.25, friction: 0.85, minImpactVelocity: 0.3, destroyThreshold: 3 },
        		medium:{ density: 1.25, restitution: 0.25, friction: 0.85, minImpactVelocity: 0.3, destroyThreshold: 5 }

        };
            
        return {
            // Collision callback.
            contact: function(other, velocity) {
                if (other.type === 'fort_piece') {
                    if (velocity > this.minImpactVelocity) {
                        m3.util.log('fort piece hit enemy at: ' + velocity.toFixed(2) + 'm/s');
                        this.damage += (velocity * other.mass) / m3.config.damage_factor;
                        other.damage += (velocity * this.mass) / m3.config.damage_factor;
                        m3.util.log('enemy damage: ' + this.damage.toFixed(2));
                        m3.util.log('fort piece damage: ' + other.damage.toFixed(2));
                    }
                    
                    if (this.damage > this.destroyThreshold) {
                        this.alive = false;
                        m3.util.log('enemy destroyed');
                        m3.score.playerDestroyed(this);
                    }
                    if (other.damage > other.destroyThreshold) {
                        other.alive = false;
                        m3.util.log('fort piece destroyed');
                        m3.score.playerDestroyed(other);
                    }
                } else if (other.type === 'projectile') {
                    if (velocity > this.minImpactVelocity) {
                        m3.util.log('projectile hit enemy at: ' + velocity.toFixed(2) + ' m/s');
                        this.damage += (velocity * other.mass) / m3.config.damage_factor;
                        m3.util.log('enemy damage: ' + this.damage.toFixed(2));
                    }
                    
                    if (this.damage > this.destroyThreshold) {
                        this.alive = false;
                        m3.util.log('enemy destroyed');
                        m3.score.playerDestroyed(this);
                    }
                } else if (other.type === 'enemy'){
                    if (velocity > other.minImpactVelocity) {
                        m3.util.log('enemy hit enemy at: ' + velocity.toFixed(2) + ' m/s');
                        this.damage += (velocity * other.mass) / m3.config.damage_factor;
                        other.damage += (velocity * this.mass) / m3.config.damage_factor;
                        m3.util.log('enemy damage: ' + this.damage.toFixed(2));
                        m3.util.log('enemy damage: ' + other.damage.toFixed(2));
                    }
                    
                    if (this.damage > this.destroyThreshold) {
                        this.alive = false;
                        m3.util.log('enemy destroyed');
                        m3.score.playerDestroyed(this);
                    }
                    if (other.damage > other.destroyThreshold) {
                        other.alive = false;
                        m3.util.log('enemy destroyed');
                        m3.score.playerDestroyed(other);
                    }
                } else if (other.type === 'ground') {
                	if (velocity > this.minImpactVelocity) {
                		m3.util.log('enemy hit ground at: ' + velocity.toFixed(2) + ' m/s');
                        this.damage += (velocity * other.mass) / m3.config.damage_factor;
                        m3.util.log('enemy damage: ' + this.damage.toFixed(2));
                    }
                        
                    if (this.damage > this.destroyThreshold) {
                    	this.alive = false;
                        m3.util.log('enemy destroyed');
                        m3.score.playerDestroyed(this);
                    }
                }
            },
            // "Constructor".
            create: function(fort, character, type, x, y, angle) {
                var object = Object.create(m3.types.PhysicsObject.create(x, y)),
                    t     = enemies[character][type],
                    d     = details[type],
                    scale = m3.config.scaling_factor,
                    enemy = m3.world.createBox(x / scale, y / scale, t.w / scale, t.h / scale, false, d.density, d.restitution, d.friction, false);
                   
                    enemy.body.SetUserData(object);
                    object.contact = this.contact;
                    object.body   = enemy.body;
                    object.shape  = enemy.shape;
                    object.fort    = fort;
                    object.type   = "enemy";
                    
                    if (type === "small") {
                        object.sprite = Sprite.create(t.s, t.h, t.w);
                        object.sprite.addAnimation("idle", [0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 2, 2, 3, 3, 2, 2, 3, 3, 2, 2, 0, 0], 0.12);
                        object.sprite.play("idle");
                    }
                    else if (type === "medium") {
                        object.sprite = Sprite.create(t.s, t.h, t.w);
                        object.sprite.addAnimation("eating", [0, 0, 0, 0, 1, 1, 2, 2, 2, 3, 3, 3, 2, 2, 2, 3, 3, 3, 4, 4, 4, 4], 0.12);
                        object.sprite.play("eating");
                    }

                    object.angle  = angle;
                    object.type = 'enemy';
                    object.alive = true;
                    object.damage = 0;
                    object.destroyThreshold = d.destroyThreshold;
                               
                    return object;
            },
            
            update: function() {
            	
            	m3.util.log('enemy update called');
            }
        };        
    }();
});