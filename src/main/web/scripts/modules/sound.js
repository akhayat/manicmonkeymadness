/**
 * sound.js
 * 
 * Utility functions for sounds
 */

$(function() {
    
    m3.sound = function() {
        
        var soundOn = true;
            musicOn = false;
            currentSong = null;
    	
        return {
        	
        	/*
        	 * Changes the current song and plays it
        	 */
        	changeMusic: function(sound, play) {
        	    if(currentSong !== null) currentSong.pause();
        	    currentSong = sound;
        	    if(play && musicOn) currentSong.play();
        	},
        
        	pauseMusic: function() {
        	    currentSong.pause();
        	},
        	
        	playMusic: function() {
        	    if(musicOn) currentSong.play();
        	},
        	
        	soundOn: function() {
        	    return soundOn;
            },
            
            musicOn: function() {
            	return musicOn;
            },
            
            /*
             * Toggles ALL sound, effects AND music
             */
        	toggleSound: function() {
        	    if(soundOn) {
        	    	soundOn = false;
        	        currentSong.pause();
        	    }
        	    else {
        	    	soundOn = true;
        	    	currentSong.play();
        	    }
            },
            
            /*
             * Master switch for music
             */
            toggleMusic: function() {
            	if(musicOn) {
            		musicOn = false;
            		currentSong.pause();
            	}
            	else {
            		musicOn = true;
            		currentSong.play();
            	}
            }
            
        }
		
    }();
});
