/**
 * contact.js
 * 
 * This module listens for contacts in the physics world, computes the necessary damage 
 * and result of that damage to each object.
 */

$(function() {
    m3.contact = function() {
        
        return {
            /* This function is called when two objects begin to collide */
            Add: function(point) {
                var object1 = point.shape1.GetBody().GetUserData(),
                    object2 = point.shape2.GetBody().GetUserData(),
                    velocity = point.velocity.Length();
                
                if (object1 && object1.contact) {
                    object1.contact(object2, velocity);
                }
                else if (object1.type === "ground") {
                    // It would be nice to move this somewhere else...maybe make a ground type?
                    if (object2.type === 'projectile') {
                        m3.util.log('projectile hit ground at ' + velocity.toFixed(2) + ' m/s');
                    } else if (velocity > object2.minImpactVelocity) {
                        m3.util.log(object2.type + ' hit ground at ' + velocity.toFixed(2) + ' m/s');
                        object2.damage += (velocity * object2.mass) / m3.config.damage_factor;
                        m3.util.log(object2.type + ' damage: ' + object2.damage.toFixed(2));
                        
                        if (object2.damage > object2.destroyThreshold) {
                            object2.alive = false;
                            m3.util.log('fort piece destroyed');
                            m3.score.playerDestroyed(object2);
                        }
                    }
                }
                
                if (object2 && object2.contact) {
                    object2.contact(object1, velocity);
                }             
            },
            
            /* This function is called when two objects continue to collide */
            Persist: function(point) {
                //m3.util.log('persist');
            },
            
            /* This function is called when two objects stop colliding */
            Remove: function(point) {
                //m3.util.log('remove');
            },
            
            Result: function(point) {
                //m3.util.log('result');
            }
        };
    }();
});