/**
 * config.js
 * 
 * This module stores any data used to configure the game, such as the frames
 * per second that the game should run at.
 * 
 */

$(function() {
    m3.config = function() {
        return {
            // Frames per second.
            fps: 45,
            
            // Dimensions of the level itself (not the window).
            level_height: 450,
            level_width:  2000,
            
            // How high in pixels the base ground is from the bottom of the screen.
            ground_height: 30,
            
            // Camera's scroll speed in pixels per second.
            camera_scroll_speed: 1200,
            
            // scaling factor (pixels per meter)
            scaling_factor: 20
        };
    }();
});
