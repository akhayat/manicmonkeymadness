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
            soundSrc = "images/resource/audio.png";
            noSoundSrc = "images/resource/no_audio.png";
            musicSrc = "images/resource/music.png";
            noMusicSrc = "images/resource/no_music.png";
            soundButton = $("#sound").get(0);
            musicButton = $("#music").get(0);
            
            soundButton.src = soundSrc;
            musicButton.src = noMusicSrc;
    	
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
        	        soundButton.src = noSoundSrc;
        	        this.pauseMusic();
        	    }
        	    else {
        	    	soundOn = true;
        	    	soundButton.src = soundSrc;
        	    	if(musicOn) this.playMusic();
        	    }
            },
            
            /*
             * Master switch for music
             */
            toggleMusic: function() {
            	if(musicOn) {
            		musicOn = false;
            		currentSong.pause();
            		musicButton.src = noMusicSrc;
            	}
            	else {
            		musicOn = true;
            		currentSong.play();
            		musicButton.src = musicSrc;
            		
            	}
            },
            
        }
		
    }();
});
