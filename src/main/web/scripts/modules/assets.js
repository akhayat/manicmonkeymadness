/**
 * assets.js
 * 
 * This module contains all of our assets (images, sounds, etc). If the game tries
 * to start before our assets are loaded, Bad Stuff will happen. By declaring our
 * assets here, we can start loading them all as soon as the page is loaded and wait
 * to start the game until they're all loaded.
 * 
 */

$(function() {
    /**
     * Returns an image object with the source already loaded. Prefixes
     * "images/" before the source for convenience.
     */
    var imageFromSource = function(source) {
        var image = new Image();
        image.src = "images/" + source;
        return image;
    };
    
    var soundFromSource = function(source, loop) {
    	var sound = $('<audio/>', {
    		loop: loop,
    		preload: "auto"
    	});
    	    paused = true;
    	    mpegPath = "audio/" + source + "mp3";
    	    oggPath = "audio/" + source + ".ogg";
    	
    	$('<source/>').attr('src', mpegPath).appendTo(sound);
    	$('<source/>').attr('src', oggPath).appendTo(sound);
    	sound.appendTo('body');
    	sound = sound.get(0);

        /*
         * Had to make a wrapper around the javascript Audio object
         * in order for toggling the sound on and off to work properly.
         */
        return {
            play: function() {
                if (m3.sound.soundOn()) {
                    sound.play();
                    paused = false;
                }
            },
            
            pause: function() {
                sound.pause();
                paused = true;
            },
            
            toggle: function() {
                if (m3.sound.soundOn() && paused) {
                    paused = false;
                    sound.play();
                }
                else {
                    paused = true;
                    sound.pause();
                }
            }
        }
    };
    
    m3.assets = function() {
        return {
            // Images.
            backgrounds: {
        	    ground_layer :    imageFromSource("backgrounds/ground_layer.png"),
                background_layer: imageFromSource("backgrounds/background_layer.png"),
                mountain_layer:   imageFromSource("backgrounds/mountain_layer.png"),
                tree_layer:       imageFromSource("backgrounds/tree_layer.png")
            },
            
            sprites: {
                cannon:        imageFromSource("sprites/cannon.png"),
                rock:          imageFromSource("sprites/rock.png"),
                banana:        imageFromSource("sprites/banana.png"),
                watermelon:    imageFromSource("sprites/watermelon.png"),
                monkey:        imageFromSource("sprites/monkey.png"),
                monkey_helmet: imageFromSource("sprites/monkey_helmet.png"),
                
                fort_pieces: {
                    box_long_wood: {
                        normal:    imageFromSource("sprites/box_long_wood.png"),
                        damaged:   imageFromSource("sprites/box_long_wood_damaged.png"),
                        destroyed: imageFromSource("sprites/box_long_wood_destroyed.png")
                    },
                    box_short_wood: {
                        normal:    imageFromSource("sprites/box_short_wood.png")
                    },
                    box_long_rock: {
                        normal:    imageFromSource("sprites/box_long_rock.png")
                    },
                    box_short_rock: {
                        normal:    imageFromSource("sprites/box_long_rock.png")
                    }
                }
            },
            
            icons: {
            	arrow:    imageFromSource("icons/arrow.png"),
            	help:     imageFromSource("icons/help.png"),
            	audio:    imageFromSource("icons/audio.png"),
            	no_audio: imageFromSource("icons/no_audio.png"),
            	music:    imageFromSource("icons/music.png"),
            	no_music: imageFromSource("icons/no_music.png")
            },
            
            // Music.
            music: {
                monkeys: soundFromSource("music/monkeys", true),
                rideTheLightning: soundFromSource("music/Ride the Lightning", true)
            },
            
            // Sounds.
            sfx: {
                //from ilovewavs.com
                monkeyScream: soundFromSource("effects/monkey_scream", false),
                monkeyGrunt:  soundFromSource("effects/monkey_grunt", false), 
                //from partnersinrhyme.com
                explosion: soundFromSource("effects/explosion", false)
            }
        };
    }();
});
