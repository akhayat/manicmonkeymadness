/**
 * sound.js
 * 
 * Utility functions for sounds
 */

$(function() {
    
    m3.sound = function() {
        
        var isOn = true;
            currentSong = null;
    	
        return {
        	
        	/*
        	 * Changes the current song and plays it
        	 */
        	changeMusic: function(sound, play) {
        	    if(currentSong !== null) currentSong.pause();
        	    currentSong = sound;
        	    if(play) currentSong.play();
        	},
        
        	pauseMusic: function() {
        	    currentSong.pause();
        	},
        	
        	playMusic: function() {
        	    currentSong.play();
        	},
        	
        	toggleMusic: function() {
        		currentSong.toggle();
        	},
        	
        	soundOn: function() {
        	    return isOn;
            },
            
            /*
             * Toggles ALL sound, effects AND music
             */
        	toggleSound: function() {
        	    if(isOn) {
        	    	isOn = false;
        	        currentSong.pause();
        	    }
        	    else{
        	    	isOn = true;
        	    	currentSong.play();
        	    }
            }
            
        	//use the toggle method in the audio wrapper in assets.js
        	
            /*toggleMusic: function(music) {
                music.paused ? music.sound.play() : music.sound.pause();
                music.paused = !music.paused;
            }*/
        }
		
    }();
});
