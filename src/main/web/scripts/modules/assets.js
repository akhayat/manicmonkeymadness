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
    
    m3.assets = function() {
        return {
            /**
             * Images.
             */
            backgrounds: {
                temp: {
                    layer_0: imageFromSource("backgrounds/layer_0.png"),
                    layer_1: imageFromSource("backgrounds/layer_1.png"),
                    layer_2: imageFromSource("backgrounds/layer_2.png")
                }
            },
            
            sprites: {
                demo:         imageFromSource("sprites/demo_monkey.png"),
                demo2:		  imageFromSource("sprites/demo2.png"),
                cannon:       imageFromSource("sprites/cannon.png"),
                monkey_up:    imageFromSource("sprites/monkeyup.png"),
                monkey_right: imageFromSource("sprites/monkeyright.png"),
                monkey_left:  imageFromSource("sprites/monkeyleft.png"),
                rock:         imageFromSource("sprites/rock.png"),
                banana:       imageFromSource("sprites/banana.png"),
                
                fort_pieces: {
                    box_long_wood:  imageFromSource("sprites/box_long_wood.png"),
                    box_short_wood: imageFromSource("sprites/box_short_wood.png"),
                    box_long_rock:  imageFromSource("sprites/box_long_rock.png"),
                    box_short_rock: imageFromSource("sprites/box_short_rock.png"),
                }
            },
        };
    }();
});
