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
        
        // Draws a background consisting of multiple layers with parallax scrolling.
        Level.drawBackground = function() {
            var context    = m3.game.context,
                background = this.background;
            
            // Draw a gradient as the base for the background.
            var gradient = context.createLinearGradient(0, 0, 0, m3.config.level_height);
            gradient.addColorStop(0, "#CCDDFF");
            gradient.addColorStop(1, "#6699BB");
            context.fillStyle = gradient;
            context.fillRect(0, 0, m3.config.level_width, m3.config.level_height);
            
            // Draw the layers of the background itself.
            for (var i = 0, n = background.layers.length; i < n; i++) {
                var image = background.layers[i].image,
                    x     = m3.camera.position.x * (1.0 - background.layers[i].scroll_factor),
                    y     = m3.game.height - image.height - background.layers[i].offset;
                
                context.drawImage(image, x, y - m3.config.ground_height);
            }
            
            var ground = m3.assets.backgrounds.ground;
            context.drawImage(ground, 0, m3.game.height - ground.height);
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
        Level.create = function() {
            var l = Object.create(this);
            
            // This is a temporarily hard-coded JSON object representing the fort to be created.
            // Later we will have the game read in the JSON object dynamically.
            var test_json_fort = {
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
            };
            
            // Set up the background.
            var background = {
                layers: [],
                num_layers: 3
            };
            
            // Load the background images.
            var background_images = m3.assets.backgrounds.temp;
            
            for (var i = 0, n = background.num_layers; i < n; i++) {
                background.layers.push({
                    image: background_images["layer_" + i],
                    scroll_factor: 1.0,
                    offset: 0
                });
            }
            
            // Configure each layer's scroll factor and offset.
            background.layers[0].scroll_factor = 0.3;
            background.layers[0].offset = 120;
            background.layers[1].scroll_factor = 0.5;
            background.layers[1].offset = 60;
            background.layers[2].offset = -2;
            
            l.background = background;
            
            // Set up fortresses.
            l.fortresses = [m3.types.Fortress.create(0, test_json_fort), m3.types.Fortress.create(1, test_json_fort)];
            
            return l;
        }
        
        return Level;
    }();
});
