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
					if (object2.type === 'fort_piece') {
						if (velocity > object1.minImpactVelocity) {
							m3.util.log('fort piece hit fort piece at: ' + velocity.toFixed(2) + 'm/s');
							
							object1.damage += (velocity * object2.mass) / m3.config.damage_factor;
							object2.damage += (velocity * object1.mass) / m3.config.damage_factor;
							
							m3.util.log('fort piece damage: ' + object1.damage.toFixed(2));
							m3.util.log('fort piece damage: ' + object2.damage.toFixed(2));
						}
						
                        if (object1.damage > object1.destroyThreshold) {
                        	object1.alive = false;
                        	m3.util.log('fort piece destoryed');
                        }
                        if (object2.damage > object2.destroyThreshold) {
                        	object2.alive = false;
                        	m3.util.log('fort piece destoryed');
                        }
					} else if (object2.type === 'ground') {
						//m3.util.log('fort piece hit ground');
					} else if (object2.type === 'projectile') {
						if (velocity > object1.minImpactVelocity) {
							m3.util.log('projectile hit fort piece at: ' + velocity.toFixed(2) + ' m/s');

							object1.damage += (velocity * object2.mass) / m3.config.damage_factor;
						
							m3.util.log('fort piece damage: ' + object1.damage.toFixed(2))
						}
						
                        if (object1.damage > object1.destroyThreshold) {
                        	object1.alive = false;
                        	m3.util.log('fort piece destoryed');
                        }	
					}	
				} else if (object1.type === 'projectile') {
					if (object2.type === 'fort_piece') {
						if (velocity > object1.minImpactVelocity) {
							m3.util.log('fort piece hit fort piece at: ' + velocity.toFixed(2) + 'm/s');
							
							object1.damage += (velocity * object2.mass) / m3.config.damage_factor;
							object2.damage += (velocity * object1.mass) / m3.config.damage_factor;
							
							m3.util.log('fort piece damage: ' + object1.damage.toFixed(2));
							m3.util.log('fort piece damage: ' + object2.damage.toFixed(2));
						}
						
                        if (object1.damage > object1.destroyThreshold) {
                        	object1.alive = false;
                        	m3.util.log('fort piece destoryed');
                        }
                        if (object2.damage > object2.destroyThreshold) {
                        	object2.alive = false;
                        	m3.util.log('fort piece destoryed');
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
		  
		  	/* This function is called when two objects stop to colliding */
		  	Remove: function(point) {
		  		//m3.util.log('remove');
		  	},
		  
		  	
		  	Result: function(point) {
		  		//m3.util.log('result');
		  	}
		};
	}();
});