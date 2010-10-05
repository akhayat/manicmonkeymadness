/**
 * level.js
 * 
 * This object represents and manages the level of the game -- the fortresses,
 * background, objects, etc.
 * 
 */

$(function() {
    m3.types.Level = function() {
        var background = {
            layers: [],
            num_layers: 3
        };
        
        // Load the background images.
        var temp_background = m3.assets.backgrounds.temp;
        
        for (var i = 0, n = background.num_layers; i < n; i++) {
            background.layers.push({
                image: temp_background["layer_" + i],
                scroll_factor: 1.0,
                offset: 0
            });
        }
        
        // Configure each layer's scroll factor and offset.
        background.layers[0].scroll_factor = 0.3;
        background.layers[0].offset = 120;
        background.layers[1].scroll_factor = 0.5;
        background.layers[1].offset = 60;
        
        return function() {
            this.background = background;
            
            // Set up a sprite for demo purposes.
            this.demo_sprite = new m3.types.Sprite(m3.assets.sprites.demo, 23, 25, 100, 400);
            this.demo_sprite.addAnimation("idle", [0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 2, 2, 3, 3, 2, 2, 3, 3, 2, 2, 0, 0], 0.12);
            this.demo_sprite.play("idle");
            
            this.demo_sprite2 = new m3.types.Sprite(m3.assets.sprites.demo, 23, 25, 1900, 400);
            this.demo_sprite2.addAnimation("idle", [0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 2, 2, 3, 3, 2, 2, 3, 3, 2, 2, 0, 0], 0.12);
            this.demo_sprite2.play("idle");
        };
    }();
    
    /**
     * Draws a background consisting of multiple layers with parallax scrolling.
     */
    m3.types.Level.prototype.drawBackground = function() {
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
            var image = background.layers[i].image;
            var x = m3.camera.position.x * (1.0 - background.layers[i].scroll_factor);
            var y = m3.game.height - image.height - background.layers[i].offset;
            
            context.drawImage(image, x, y - m3.config.ground_height);
        }
    };
    
    /**
     * Update function for the level.
     */
    m3.types.Level.prototype.update = function() {
        this.drawBackground();
        this.demo_sprite.update();
        this.demo_sprite2.update();
    };
});
