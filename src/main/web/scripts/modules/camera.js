/**
 * camera.js 
 * 
 * This module provides support for moving the viewport around via some
 * convenience functions.
 * 
 */

$(function() {
    m3.camera = function() {
        var sliding = false,
            goal    = new m3.math.Vector(0, 0),
            speed   = m3.config.camera_scroll_speed;
        
        var clampPosition = function () {
            m3.camera.position.x = m3.math.clamp(m3.camera.position.x, m3.camera.minBound.x, m3.camera.maxBound.x);
            m3.camera.position.y = m3.math.clamp(m3.camera.position.y, m3.camera.minBound.y, m3.camera.maxBound.y);
        };
        
        return {
            position: new m3.math.Vector(0, 0),
            minBound: new m3.math.Vector(0, 0),
            maxBound: new m3.math.Vector(m3.config.level_width - m3.game.width, m3.config.level_height - m3.game.height),
            
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
             */
            slideTo: function(x, y, s) {
                x = m3.math.clamp(x, this.minBound.x, this.maxBound.x);
                y = m3.math.clamp(y, this.minBound.y, this.maxBound.y);
                
                speed   = s || m3.config.camera_scroll_speed;
                goal.x  = x;
                goal.y  = y;
                sliding = true;
            },
            
            /**
             * The update function performs sliding and actually does
             * the matrix transforms.
             */
            update: function() {
                if (sliding) {
                    direction = new m3.math.Vector(goal.x - this.position.x, goal.y - this.position.y);
                    direction.normalize();
                    
                    this.move(direction.x * speed, direction.y * speed);
                    
                    if (Math.abs(this.position.x - goal.x) <= (speed / 1000) && Math.abs(this.position.y - goal.y) <= (speed / 1000)) {
                        this.warp(goal.x, goal.y);
                        sliding = false;
                    }
                }
                
                m3.game.context.translate(-this.position.x, -this.position.y);
            },
        };
    }();
});
