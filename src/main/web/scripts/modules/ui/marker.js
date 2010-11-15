/**
 * marker.js
 * 
 * Module for drawing the triangle that marks where the projectile is offscreen
 * 
 */

$(function() {
    m3.ui.marker = function() {
   
    	var context = m3.game.context;
            projectile = [];
            arrow = m3.assets.icons.arrow;
    	    
    	return {
    		
    		mark: function(active) {
    		    projectile = active;
    		},
    		
    		update: function() {
    			//draws an arrow for each active projectile
    			for(var i = 0, n = projectile.length; i < n; i+=1) {
    				position = projectile[i].body.GetPosition();
    			    if(position.y * m3.config.scaling_factor < 0) {
		                context.drawImage(arrow, position.x * m3.config.scaling_factor, 0);
    			    }
    			}
    		}
    		
    	}
    	
    }();
});