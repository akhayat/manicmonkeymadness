/**
 * sprite.js 
 * 
 * This type represents a sprite object, handling animation and rendering.
 * 
 */

$(function() {
    m3.types.Sprite = function() {
        /**
         * Private members.
         */
        var Vector  = m3.types.Vector,
            context = m3.game.context;
        
        /**
         * Private helper function to update the current frame based on the current
         * animation and index.
         */
        var updateFrame = function(height, width) {
            this.frame    = this.current_animation.frames[this.index];
            this.offset.x = (this.frame % this.grid_size.x) * this.width;
            this.offset.y = parseInt(this.frame / this.grid_size.x) * this.height;
        };
        
        /**
         * This function will add an animation to the sprite, which can be played
         * by calling the play method of the sprite, passing in the animation's id.
         *
         * See the wiki for examples and further documentation.
         */
        var addAnimation = function(id, frames, time) {
            this.animations[id] = { frames: frames, time: time };
        };
        
        /**
         * Plays the animation with the given id.
         */
        var play = function(id) {
            this.current_animation = this.animations[id];
            
            if (typeof(this.current_animation) !== undefined) {
                this.index = 0;
                this.time  = 0.0;
                this.updateFrame(this.height, this.width);
            }
            else {
                m3.util.log("Tried to play an animation with id " + id + ", but the animation doesn't exist!");
            }
        };
        
        /**
         * Stops the animation of the sprite. The sprite will be suspended
         * in the frame of animation that it was playing when this is called
         * unless you pass in a frame number for it to stay on.
         */
        var stop = function(new_frame) {
            this.current_animation = null;
            
            if (typeof(new_frame) !== undefined)
                this.frame = new_frame;
        };
        
        /**
         * Update function for the sprite animates and renders the sprite.
         */
        var update = function() {
            var sheet     = this.sheet,
                animation = this.current_animation,
                index     = this.index,
                height    = this.height,
                width     = this.width,
                x         = this.x,
                y         = this.y
                offset    = this.offset;
            
            // If we're animating, update the current frame if necessary.
            if (animation) {
                this.time += m3.game.elapsed;
                
                while (this.time >= animation.time) {
                    this.time -= animation.time;
                    this.index = (this.index + 1) % animation.frames.length;
                    this.updateFrame(height, width);
                }
            }
            
            // Draw the sprite.
            context.drawImage(sheet, offset.x, offset.y, width, height, x, y, width * this.zoom, height * this.zoom);
        };
        
        /**
         * Constructor. The x and y parameters are optional, but the
         * others are required. Height and width are the dimensions
         * of the sprite cells, not the sprite sheet itself.
         */
        return function(sheet, height, width, x, y) {
            this.sheet             = sheet;
            this.height            = height;
            this.width             = width;
            this.x                 = x || 0.0;
            this.y                 = y || 0.0;
            this.zoom              = 1;
            this.animations        = {};
            this.current_animation = null;
            this.index             = 0;
            this.frame             = 0;
            this.time              = 0.0;
            this.grid_size         = new Vector(this.sheet.width / this.width, this.sheet.height / this.height);
            this.offset            = new Vector();
            
            m3.types.Sprite.prototype.updateFrame  = updateFrame;
            m3.types.Sprite.prototype.addAnimation = addAnimation;
            m3.types.Sprite.prototype.play         = play;
            m3.types.Sprite.prototype.stop         = stop;
            m3.types.Sprite.prototype.update       = update;
            
            // Warn if we receive invalid dimensions.
            var grid_size = this.grid_size;
            if (grid_size.x !== parseInt(grid_size.x) || grid_size.y !== parseInt(grid_size.y)) {
                m3.util.log("Sprite " + sheet.src + " was created with invalid dimensions!");
            }
        };
    }();
});
