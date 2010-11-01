/**
 * level.js
 * 
 * This object represents and manages the level of the game -- the fortresses,
 * background, objects, etc.
 * 
 */

$(function() {
    m3.types.Level = function() {
        return {
            fortresses: null,
            background: null,
            
            // Draws a background consisting of multiple layers with parallax scrolling.
            drawBackground: function() {
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
            },
            
            // Update function for the level.
            update: function() {
                var fortresses = this.fortresses;
                
                this.drawBackground();
                
                for (var i = 0, n = fortresses.length; i < n; i++) {
                    fortresses[i].update();
                }
            },
            
            // "Constructor".
            create: function() {
                var level = Object.create(this);
                
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
                
                level.background = background;
                
                // Set up fortresses.
                level.fortresses = [m3.types.Fortress.create(0), m3.types.Fortress.create(1)];
                
                for (var i = 0; i < 2; i++) {
                    var fort = level.fortresses[i];
                    fort.addPiece("box", "long",  "wood", 100, 295, 0);
                    fort.addPiece("box", "long",  "wood", 150, 295, 0);
                    fort.addPiece("box", "long",  "wood", 200, 295, 0);
                    fort.addPiece("box", "long",  "wood", 100, 195, 0);
                    fort.addPiece("box", "long",  "wood", 150, 195, 0);
                    fort.addPiece("box", "long",  "wood", 200, 195, 0);
                    fort.addPiece("box", "long",  "wood", 150, 140, Math.PI / 2);
                    fort.addPiece("box", "short", "wood", 110, 110, 0);
                    fort.addPiece("box", "short", "wood", 150, 110, 0);
                    fort.addPiece("box", "short", "wood", 190, 110, 0);
                    fort.addPiece("box", "long",  "wood", 150, 80,  Math.PI / 2);
                    fort.addPiece("box", "long",  "rock", 215, 295, 0);
                    fort.addPiece("box", "long",  "rock", 212, 195, 0);
                    fort.addPiece("box", "long",  "rock",  88, 295, 0);
                    fort.addPiece("box", "long",  "rock",  88, 195, 0);
                    fort.addPiece("box", "short", "rock",  88, 120, 0);
                    fort.addPiece("box", "short", "rock", 210, 120, 0);
                    fort.addPiece("box", "long",  "rock", 150, 70,  Math.PI / 2);
                    fort.addEnemy("monkey", "medium", 120, 325, 0);
                    fort.addEnemy("monkey", "medium", 170, 325, 0);
                    fort.addEnemy("monkey", "small",  120, 125, 0);
                    fort.addEnemy("monkey", "small",  170, 125, 0);
                }
                
                level.fortresses[0].addLauncher("cannon", "grey", 0, m3.types.Vector.create(-25, 18), m3.types.Vector.create(46,0));
                level.fortresses[1].addLauncher("cannon", "grey", 0, m3.types.Vector.create(25, 18),  m3.types.Vector.create(-46,0));
                
                return level;
            }
        };
    }();
});
