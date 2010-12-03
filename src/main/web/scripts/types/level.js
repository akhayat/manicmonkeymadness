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
        
        var backgrounds  = m3.assets.backgrounds,
            chosen_forts = m3.fort_choices.chosen_forts;
        
        var levels = {
            demo: {
                background: [ 
                    { image: backgrounds.mountain_layer2, offset: 164, scroll_factor: 0.3 },
                    { image: backgrounds.mountain_layer, offset: 84, scroll_factor: 0.5 },
                    { image: backgrounds.tree_layer, offset: 27, scroll_factor: 0.7 },
                    { image: backgrounds.ground_layer, offset: 0, scroll_factor: 1 }
                ]
            }
        };
        
        // Draws a background consisting of multiple layers with parallax scrolling.
        Level.drawBackground = function() {
            var context    = m3.game.context,
                background = this.background;
            
            // Draw a gradient as the base for the background.
            var gradient = context.createLinearGradient(0, 0, 0, m3.config.level_height);
            gradient.addColorStop(0, "#BDE7F5");
            gradient.addColorStop(0.5, "#FFF");
            context.fillStyle = gradient;
            context.fillRect(0, 0, m3.config.level_width, m3.config.level_height);
            
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
            
            if (!m3.world.debugDrawMode()) this.drawBackground();
            
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
                l.fortresses.push(m3.types.Fortress.create(0, chosen_forts[0]));
                l.fortresses.push(m3.types.Fortress.create(1, chosen_forts[1]));
            }
            
            return l;
        };
        
        return Level;
    }();
});
