/**
 * sprite.js 
 * 
 * This type represents a sprite object, handling animation and rendering.
 * 
 */

$(function() {
    m3.types.Sprite = function() {
        // Private members.
        var Vector     = m3.types.Vector,
            context    = m3.game.context;
        
        return {
            // Public members.
            sheet:             null,
            height:            null,
            width:             null,
            x:                 0.0,
            y:                 0.0,
            zoom:              1.0,
            animations:        null,
            current_animation: null,
            index:             0,
            frame:             0,
            time:              0.0,
            grid_size:         null,
            offset:            null,
            
            // Private helper function to update the current frame based on the current
            // animation and index.
            updateFrame: function() {
                var grid_size = this.grid_size,
                    offset    = this.offset,
                    frame     = this.current_animation.frames[this.index];
                
                offset.x = (frame % grid_size.x) * this.width;
                offset.y = parseInt(frame / grid_size.x) * this.height;
                this.frame = frame;
            },
            
            // This function will add an animation to the sprite, which can be played
            // by calling the play method of the sprite, passing in the animation's id.
            // 
            // See the wiki for examples and further documentation.
            addAnimation: function(id, frames, time) {
                this.animations[id] = { frames: frames, time: time };
            },
            
            // Plays the animation with the given id.
            play: function(id) {
                this.current_animation = this.animations[id];
                
                if (this.current_animation !== undefined) {
                    this.index = 0;
                    this.time  = 0.0;
                    this.updateFrame(this.height, this.width);
                }
                else {
                    m3.util.log("Tried to play an animation with id " + id + ", but the animation doesn't exist!");
                }
            },
            
            // Stops the animation of the sprite. The sprite will be suspended
            // in the frame of animation that it was playing when this is called
            // unless you pass in a frame number for it to stay on.
            stop: function(new_frame) {
                this.current_animation = null;
                
                if (new_frame !== undefined) {
                    this.frame = new_frame;
                }
            },
            
            // Update function for the sprite animates and renders the sprite.
            update: function(new_frame) {
                var sheet     = this.sheet,
                    animation = this.current_animation,
                    time      = this.time,
                    index     = this.index,
                    height    = this.height,
                    width     = this.width,
                    x         = this.x,
                    y         = this.y,
                    offset    = this.offset;
                
                // Update the current frame if we're animating and enough time has passed.
                if (animation) {
                    time += m3.game.elapsed;
                    
                    while (time >= animation.time) {
                        time -= animation.time;
                        this.index = (index + 1) % animation.frames.length;
                        this.updateFrame(height, width);
                    }
                    
                    this.time = time;
                }
                
                // Draw the sprite.
                context.drawImage(sheet, offset.x, offset.y, width, height, x, y, width, height);
            },
            
            // "Constructor". The x and y parameters are optional, but the others
            // are required. Height and width are the dimensions of the sprite cells,
            // not the sprite sheet itself.
            create: function(sheet, height, width, x, y) {
                var s = Object.create(this);
                s.sheet  = sheet;
                s.height = height;
                s.width  = width;
                s.x = x || s.x;
                s.y = y || s.y;
                
                s.animations = {};
                s.grid_size  = Vector.create(sheet.width / width, sheet.height / height);
                s.offset     = Vector.create();
                
                // Abort and show a warning if we receive invalid dimensions.
                if (s.grid_size.x !== parseInt(s.grid_size.x) || s.grid_size.y !== parseInt(s.grid_size.y)) {
                    m3.util.log("Sprite " + sheet.src + " was created with invalid dimensions!");
                    return null;
                }
                
                return s;
            }
        };
    }();
});
