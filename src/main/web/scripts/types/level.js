/**
 * level.js
 * 
 * This object represents and manages the level of the game -- the fortresses,
 * background, objects, etc.
 * 
 */

$(function() {
    m3.types.Level = function() {
        Level = {};
        Level.Level = Level;
        
        var backgrounds = m3.assets.backgrounds;
        
        var levels = {
            demo: {
        	     background: [ 
        	         { image: backgrounds.background_layer, offset: 0, scroll_factor: 0 },
        	         { image: backgrounds.mountain_layer, offset: 0, scroll_factor: 0.3 },
        	         { image: backgrounds.tree_layer, offset: 0, scroll_factor: 0.55 },
        	         { image: backgrounds.ground_layer, offset: 0, scroll_factor: 1 }
        	     ],
        	     
        	     fortress: {
                     pieces: [
                         { shape: "box", size: "long",  type: "rock", x: 258, y: 305, angle: -Math.PI / 4 },
                         { shape: "box", size: "long",  type: "wood", x: 100, y: 295, angle: 0 },
                         { shape: "box", size: "long",  type: "wood", x: 150, y: 295, angle: 0 },
                         { shape: "box", size: "long",  type: "wood", x: 200, y: 295, angle: 0 },
                         { shape: "box", size: "long",  type: "wood", x: 100, y: 195, angle: 0 },
                         { shape: "box", size: "long",  type: "wood", x: 150, y: 195, angle: 0 },
                         { shape: "box", size: "long",  type: "wood", x: 200, y: 195, angle: 0 },
                         { shape: "box", size: "long",  type: "wood", x: 150, y: 140, angle: Math.PI / 2 },
                         { shape: "box", size: "short", type: "wood", x: 110, y: 110, angle: 0 },
                         { shape: "box", size: "short", type: "wood", x: 150, y: 110, angle: 0 },
                         { shape: "box", size: "short", type: "wood", x: 190, y: 110, angle: 0 },
                         { shape: "box", size: "long",  type: "wood", x: 150, y: 80,  angle: Math.PI / 2 },
                         { shape: "box", size: "long",  type: "rock", x: 215, y: 295, angle: 0 },
                         { shape: "box", size: "long",  type: "rock", x: 215, y: 195, angle: 0 },
                         { shape: "box", size: "long",  type: "rock", x: 88,  y: 295, angle: 0 },
	                     { shape: "box", size: "long",  type: "rock", x: 88,  y: 195, angle: 0 },
	                     { shape: "box", size: "short", type: "rock", x: 88,  y: 120, angle: 0 },
	                     { shape: "box", size: "short", type: "rock", x: 210, y: 120, angle: 0 },
	                     { shape: "box", size: "long",  type: "rock", x: 150, y: 70,  angle: Math.PI / 2 }
	                ],
	                      
	                 enemies: [
	                     { type: "monkey", size: "medium", x: 120, y: 325, angle: 0 },
	                     { type: "monkey", size: "medium", x: 170, y: 325, angle: 0 },
	                     { type: "monkey", size: "small",  x: 120, y: 125, angle: 0 },
	                     { type: "monkey", size: "small",  x: 170, y: 125, angle: 0 }
	                 ]
                }
            }
        };
        
        // Draws a background consisting of multiple layers with parallax scrolling.
        Level.drawBackground = function() {
            var context    = m3.game.context,
                background = this.background;
            
            
            // Draw a gradient as the base for the background.
//            var gradient = context.createLinearGradient(0, 0, 0, m3.config.level_height);
//            gradient.addColorStop(0, "#CCDDFF");
//            gradient.addColorStop(1, "#6699BB");
//            context.fillStyle = gradient;
//            context.fillRect(0, 0, m3.config.level_width, m3.config.level_height);
            
            for (var i = 0, n = background.length; i < n; i++) {

            	var image = background[i].image,
                    x     = m3.camera.position.x * (1.0 - background[i].scroll_factor),
                    y     = m3.game.height - image.height - background[i].offset;
                
                context.drawImage(image, x, y);
            }
        };
        
        // Update function for the level.
        Level.update = function() {
            var fortresses = this.fortresses;
            
            this.drawBackground();
            
            for (var i = 0, n = fortresses.length; i < n; i++) {
                fortresses[i].update();
            }
        };
        
        // "Constructor".
        Level.create = function(level, create_forts) {
            var l = Object.create(this);
            
            var level_data = levels[level];
            
            // Set up background layers
            l.background = level_data.background;
            
            // Set up fortresses.
            l.fortresses = [];
            
            if (create_forts) {
                l.fortresses.push(m3.types.Fortress.create(0, level_data.fortress));
                l.fortresses.push(m3.types.Fortress.create(1, level_data.fortress));
            }
            
            return l;
        };
        
        return Level;
    }();
});
