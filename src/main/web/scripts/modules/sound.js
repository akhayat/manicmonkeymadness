/**
 * sound.js
 * 
 * Utility functions for sounds
 */

$(function() {
    m3.sound = function() {

        return {
            toggle: function(sound) {
                sound.paused ? sound.play() : sound.pause();
                sound.paused = !sound.paused;
            }
        }
		
    }();
});
