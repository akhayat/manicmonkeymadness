/**
 * level.js
 * 
 * This object represents and manages the level of the game -- the fortresses,
 * background, objects, etc.
 * 
 */

$(function() {
    m3.types.Level = function() {
        /**
         * Private variables.
         */
        var background = {
            layers: [],
            num_layers: 3,
        };
        
        // Load the background images.
        for (var i = 0, n = background.num_layers; i < n; i++) {
            background.layers.push({
                image: new Image(),
                scroll_factor: 1.0,
                offset: 0
            });
            
            background.layers[i].image.src = "images/backgrounds/layer_" + i + ".png";
        }
        
        // Configure each layer's scroll factor and offset.
        background.layers[0].scroll_factor = 0.3;
        background.layers[0].offset = 120;
        background.layers[1].scroll_factor = 0.5;
        background.layers[1].offset = 60;
        
        /**
         * Constructor.
         */
        return function() {
            this.background = background;
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
        
        // Draw a small platform at the bottom as the ground. Eventually this
        // should become an actual physics object that other objects collide with.
        var ground_height = 30;
        context.fillStyle = "#332211";
        context.fillRect(0, m3.config.level_height - ground_height, m3.config.level_width, m3.config.level_height);
        
        // Draw the layers of the background itself.
        for (var i = 0, n = background.layers.length; i < n; i++) {
            var image = background.layers[i].image;
            var x = m3.camera.position.x * (1.0 - background.layers[i].scroll_factor);
            var y = m3.game.height - image.height - background.layers[i].offset;
            
            context.drawImage(image, x, y - ground_height);
        }
    };
    
    /**
     * Update function for the level.
     */
    m3.types.Level.prototype.update = function() {
        this.drawBackground();
    };
});
