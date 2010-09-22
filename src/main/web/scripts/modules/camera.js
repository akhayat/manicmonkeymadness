/**
 * camera.js 
 * 
 * This module provides support for moving the viewport around via some
 * convenience functions.
 * 
 */

$(function() {
    m3.camera = function() {
        var sliding           = false,
            slide_type        = "linear",
            goal              = new m3.types.Vector(0, 0),
            original_distance = new m3.types.Vector(0, 0);
            speed             = m3.config.camera_scroll_speed;
        
        var clampPosition = function () {
            m3.camera.position.x = m3.math.clamp(m3.camera.position.x, m3.camera.minBound.x, m3.camera.maxBound.x);
            m3.camera.position.y = m3.math.clamp(m3.camera.position.y, m3.camera.minBound.y, m3.camera.maxBound.y);
        };
        
        return {
            position: new m3.types.Vector(0, 0),
            minBound: new m3.types.Vector(0, 0),
            maxBound: new m3.types.Vector(m3.config.level_width - m3.game.width, m3.config.level_height - m3.game.height),
            
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
                    var direction = new m3.types.Vector(goal.x - this.position.x, goal.y - this.position.y);
                    var distance  = new m3.types.Vector(Math.abs(direction.x), Math.abs(direction.y));
                    direction.normalize();
                    
                    var scale = new m3.types.Vector(speed, speed);
                    
                    if (slide_type == "smooth") {
                        scale.x = original_distance.x == 0 ? scale.x : scale.x * 3 * (distance.x / original_distance.x + 0.075);
                        scale.y = original_distance.y == 0 ? scale.y : scale.y * 3 * (distance.y / original_distance.y + 0.075);
                    }
                    
                    this.move(direction.x * scale.x, direction.y * scale.y);
                    
                    if (distance.x <= (speed / 1000) && distance.y <= (speed / 1000)) {
                        this.warp(goal.x, goal.y);
                        sliding = false;
                    }
                }
                else {
                    // Move the camera with the arrow keys.
                    if (m3.input.keys.RIGHT) {
                        m3.camera.move(m3.config.camera_scroll_speed, 0);
                    }
                    
                    if (m3.input.keys.LEFT) {
                        m3.camera.move(-m3.config.camera_scroll_speed, 0);
                    }
                }
                
                m3.game.context.translate(-this.position.x, -this.position.y);
            }
        };
    }();
});
