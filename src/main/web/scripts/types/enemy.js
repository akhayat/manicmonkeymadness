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
        }
        
        var details = {
                small: { density: 1.25, restitution: 0.25, friction: 0.85 },
        		medium:{ density: 1.25, restitution: 0.25, friction: 0.85 }

        };
            
        return {
            // "Constructor".
            create: function(character, type, x, y, angle) {
                var object = Object.create(m3.types.PhysicsObject.create(x, y)),
                    t     = enemies[character][type],
                    d     = details[type],
                    scale = m3.config.scaling_factor,
                    enemy = m3.world.createBox(x / scale, y / scale, t.w / scale, t.h / scale, false, d.density, d.restitution, d.friction, false);
                   
                    enemy.body.SetUserData(object);                
                    object.body   = enemy.body;
                    object.shape  = enemy.shape;
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
                               
                    return object;
            },
            
            update: function() {
            	
            	m3.util.log('enemy update called');
            }
        };        
    }();
});