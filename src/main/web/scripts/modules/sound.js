/**
 * sound.js
 * 
 * Utility functions for sounds
 */

$(function() {
    m3.sound = function() {
        var on = true;
    	
        return {
        	currentSong: m3.assets.music.monkeys,
        	
        	soundOn: function() {
        	    return on;
            },
            
        	toggleSound: function() {
        	    if(on) {
        	    	on = false;
        	        this.currentSong.pause();
        	    }
        	    else{
        	    	on = true;
        	    	this.currentSong.play();
        	    }
            }
            
        	//use the toggle method in the audio wrapper in assets.js
        	
            /*toggle: function(music) {
                music.paused ? music.sound.play() : music.sound.pause();
                music.paused = !music.paused;
            }*/
        }
		
    }();
});
