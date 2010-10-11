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
			
				var userData1 = point.shape1.GetBody().GetUserData(),
				    type1 = userData1.type,				    
				    userData2 = point.shape2.GetBody().GetUserData(),
				    type2 = userData2.type;

				if (type1 == 'fort_piece') {
					if (type2 == 'fort_piece') {
						m3.util.log('fort piece hit fort piece');
						//userData1.damage++;
						//userData2.damage++;
					} else if (type2 == 'ground') {
						m3.util.log('fort piece hit ground');
						//userData1.damage++;
					} else if (type2 == 'projectile') {
						m3.util.log('projectile hit fort piece');
						userData1.damage += 5;
					}	
				} else if (type1 == 'projectile') {
					
					if (type2 == 'fort_piece') {
						m3.util.log('fort piece hit ground');						
						userData2.damage +=5;
					} else if (type2 == 'ground') {
						m3.util.log('projectile hit ground');
					}
				} else if (type1 == 'ground') {
					
					if (type2 == 'fort_piece') {
						m3.util.log('fort piece hit fort piece');						
						//userData2.damage++;
					} else if (type2 == 'projectile') {
						m3.util.log('projectile hit ground');
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