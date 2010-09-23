/**
 * camera.js 
 * 
 * This module provides support for moving the viewport around via some
 * convenience functions.
 * 
 */

$(function() {
    m3.camera = function() {
        var Vector            = m3.types.Vector,
            sliding           = false,
            slide_type        = "linear",
            goal              = new Vector(0, 0),
            original_distance = new Vector(0, 0);
            speed             = m3.config.camera_scroll_speed;
        
        var clampPosition = function() {
            var camera = m3.camera,
                math   = m3.math;
            
            camera.position.x = math.clamp(camera.position.x, camera.minBound.x, camera.maxBound.x);
            camera.position.y = math.clamp(camera.position.y, camera.minBound.y, camera.maxBound.y);
        };
        
        return {
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
             * Sets the camera to slide to a specified location over
             * time. Speed is measured in pixels per second.
             *
             * Type can be either "linear" or "smooth".
             */
            slideTo: function(x, y, t, s) {
                x = m3.math.clamp(x, this.minBound.x, this.maxBound.x);
                y = m3.math.clamp(y, this.minBound.y, this.maxBound.y);
                
                speed      = s || m3.config.camera_scroll_speed;
                slide_type = t || "linear";
                sliding    = true;
                
                goal.set(x, y);
                original_distance.set(Math.abs(goal.x - this.position.x), Math.abs(goal.y - this.position.y));
            },
            
            /**
             * The update function performs sliding and actually does
             * the matrix transforms.
             */
            update: function() {
                if (sliding) {
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
                        sliding = false;
                    }
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
