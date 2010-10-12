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
                //m3.util.log('add');
                
                var object1 = point.shape1.GetBody().GetUserData(),
                    object2 = point.shape2.GetBody().GetUserData(),
                    velocity = point.velocity.Length();
                
                if (object1.type === 'fort_piece') {
                    object1.contact(object2, velocity);
                }
                else if (object1.type === 'projectile') {
                    if (object2.type === 'fort_piece') {
                        if (velocity > object1.minImpactVelocity) {
                            m3.util.log('fort piece hit fort piece at: ' + velocity.toFixed(2) + 'm/s');
                            object2.damage += (velocity * object1.mass) / m3.config.damage_factor;
                            m3.util.log('fort piece damage: ' + object2.damage.toFixed(2));
                        }
                        
                        if (object2.damage > object2.destroyThreshold) {
                            object2.alive = false;
                            m3.util.log('fort piece destroyed');
                        }
                    } else if (object2.type == 'ground') {
                        //m3.util.log('projectile hit ground');
                    }
                } else if (object1.type === 'ground') {
                    if (object2.type === 'fort_piece') {
                        //m3.util.log('fort piece hit fort piece');
                    } else if (object2.type == 'projectile') {
                        //m3.util.log('projectile hit ground');
                    }
                } else {
                    m3.util.log('unknown collision');
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