/**
 * marker.js
 * 
 * Module for drawing the triangle that marks where the projectile is offscreen
 * 
 */

$(function() {
    m3.ui.marker = function() {
   
    	var context = m3.game.context;
    	    offScreen = false;
    	    follow = 0;
    	    arrow = m3.assets.resources.arrow;
    	    
    	return {
    
    		mark: function(x) {
    		    follow = x;
    		    offScreen = true;
    		},
    		
    		clearMark: function() {
    			offScreen = false;
    		},
    		
    		update: function() {
    			if(offScreen) {
		            context.drawImage(arrow, x, 0);
    			}
    		}
    		
    	}
    	
    }();
});