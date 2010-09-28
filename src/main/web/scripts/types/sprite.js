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
        var Vector            = m3.types.Vector,
            context           = m3.game.context,
            animations        = {},
            current_animation = null,
            index             = 0,
            frame             = 0,
            time              = 0.0,
            looping           = false,
            grid_size         = new Vector(),
            offset            = new Vector();
        
        /**
         * Private helper function to update the current frame based on the current
         * animation and index.
         */
        var updateFrame = function(height, width) {
            frame    = current_animation.frames[index];
            offset.x = (frame % grid_size.x) * width;
            offset.y = parseInt(frame / grid_size.x) * height;
        };
        
        /**
         * This function will add an animation to the sprite, which can be played
         * by calling the play method of the sprite, passing in the animation's id.
         *
         * See the wiki for examples and further documentation.
         */
        var addAnimation = function(id, frames, time) {
            animations[id] = { frames: frames, time: time };
        };
        
        /**
         * Plays the animation with the given id. Can set it to loop or not loop.
         * Defaults to true.
         */
        var play = function(id, loop) {
            current_animation = animations[id];
            
            if (typeof(current_animation) !== undefined) {
                index = 0;
                time  = 0.0;
                updateFrame(this.height, this.width);
                
                if (typeof(loop) === undefined)
                    loop = true;
                
                looping = loop;
            }
            else {
                m3.util.log("Tried to play an animation with id " + id + ", but the animation doesn't exist!");
            }
        };
        
        /**
         * Stops the animation of the sprite. The sprite will be suspended
         * in the frame of animation that it was playing when this is called.
         */
        var stop = function() {
            animation = null;
        };
        
        /**
         * Update function for the sprite animates and renders the sprite.
         */
        var update = function() {
            var sheet  = this.sheet,
                height = this.height,
                width  = this.width,
                x      = this.x,
                y      = this.y;
            
            // If we're animating, update the current frame if necessary.
            if (current_animation) {
                time += m3.game.elapsed;
                
                while (time >= current_animation.time) {
                    time -= current_animation.time;
                    index = (index + 1) % current_animation.frames.length;
                    updateFrame(height, width);
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
            this.sheet  = sheet;
            this.height = height;
            this.width  = width;
            this.x      = x || 0.0;
            this.y      = y || 0.0;
            this.zoom   = 1;
            
            grid_size.x = this.sheet.width / this.width;
            grid_size.y = this.sheet.height / this.height;
            
            m3.types.Sprite.prototype.addAnimation = addAnimation;
            m3.types.Sprite.prototype.play         = play;
            m3.types.Sprite.prototype.stop         = stop;
            m3.types.Sprite.prototype.update       = update;
            
            // Warn if we receive invalid dimensions.
            if (grid_size.x !== parseInt(grid_size.x) || grid_size.y !== parseInt(grid_size.y)) {
                m3.util.log("Sprite " + sheet.src + " was created with invalid dimensions!");
            }
        };
    }();
});
