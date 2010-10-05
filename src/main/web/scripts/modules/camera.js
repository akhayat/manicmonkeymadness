/**
 * camera.js 
 * 
 * This module provides support for moving the viewport around via some convenience functions.
 * 
 */

$(function() {
    m3.camera = function() {
        var Vector            = m3.types.Vector,
            following         = null;
            slide_type        = "linear",
            goal              = new Vector(0, 0),
            original_distance = new Vector(0, 0),
            speed             = m3.config.camera_scroll_speed;
        
        var clampPosition = function() {
            var camera = m3.camera,
                math   = m3.math;
            
            camera.position.x = math.clamp(camera.position.x, camera.minBound.x, camera.maxBound.x);
            camera.position.y = math.clamp(camera.position.y, camera.minBound.y, camera.maxBound.y);
        };
        
        return {
            state:    "idle",
            position: new Vector(0, 0),
            minBound: new Vector(0, 0),
            maxBound: new Vector(m3.config.level_width - m3.game.width, m3.config.level_height - m3.game.height),
            
            /**
             * Moves the camera by the specified speed in pixels per second.
             */
            move: function(x, y) {
                this.position.x += x * m3.game.elapsed;
                this.position.y += y * m3.game.elapsed;
                
                clampPosition();
            },
            
            /**
             * Warps the camera instantly to a specified location.
             */
            warp: function(x, y) {
                this.position.x = x;
                this.position.y = y;
                
                clampPosition();
            },
            
            /**
             * Sets the camera to slide to a specified location over time. Speed is measured in pixels per second.
             *
             * Type can be either "linear" or "smooth".
             */
            slideTo: function(x, y, t, s) {
                if (this.state !== "idle")
                    return;
                
                x = m3.math.clamp(x, this.minBound.x, this.maxBound.x);
                y = m3.math.clamp(y, this.minBound.y, this.maxBound.y);
                
                speed      = s || m3.config.camera_scroll_speed;
                slide_type = t || "linear";
                this.state = "sliding";
                
                goal.set(x, y);
                original_distance.set(Math.abs(goal.x - this.position.x), Math.abs(goal.y - this.position.y));
            },
            
            /**
             * Sets the camera to follow a specified object. The only requirement of the object is that it has
             * readable x and y properties.
             */
            follow: function(object) {
                if (this.state !== "idle")
                    return;
                
                this.state = "following";
                following  = object;
            },
            
            /**
             * Stops the camera from following and returns to an idle state.
             */
            stopFollowing: function() {
                if (this.state === "idle")
                    return;
                
                this.state = "idle";
                following = null;
            },
            
            /**
             * The update function performs sliding and actually does the matrix transforms.
             */
            update: function() {
                if (this.state === "sliding") {
                    var scale     = new Vector(speed, speed),
                        direction = new Vector(goal.x - this.position.x, goal.y - this.position.y),
                        distance  = new Vector(Math.abs(direction.x), Math.abs(direction.y));
                    
                    direction.normalize();
                    
                    if (slide_type == "smooth") {
                        scale.x = original_distance.x == 0 ? scale.x : scale.x * 3 * (distance.x / original_distance.x + 0.05);
                        scale.y = original_distance.y == 0 ? scale.y : scale.y * 3 * (distance.y / original_distance.y + 0.05);
                    }
                    
                    this.move(direction.x * scale.x, direction.y * scale.y);
                    
                    if (distance.x <= (speed / 1000) && distance.y <= (speed / 1000)) {
                        this.warp(goal.x, goal.y);
                        this.state = "idle";
                    }
                }
                else if (this.state === "following" && following) {
                    this.warp(following.x - m3.game.width / 2, following.y - m3.game.height / 2);
                }
                else {
                    // Move the camera with the arrow keys.
                    var keys = m3.input.keys;
                    
                    if (keys.RIGHT) {
                        this.move(m3.config.camera_scroll_speed, 0);
                    }
                    
                    if (keys.LEFT) {
                        this.move(-m3.config.camera_scroll_speed, 0);
                    }
                }
                
                m3.game.context.translate(-this.position.x, -this.position.y);
            }
        };
    }();
});
