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
            level_width:  2800,
            
            // How much space between each fortress and the edge of the screen.
            level_padding: 25,
            
            // The width of each fortress area.
            fort_width: 640,
            
            // How tall the fortress platform should be.
            fort_platform_height: 75,
            
            // How high in pixels the base ground is from the bottom of the screen.
            ground_height: 30,
            
            // Camera's scroll speed in pixels per second.
            camera_scroll_speed: 1200,
            
            // The maximum amount of time spent per turn, in seconds.
            max_turn_time: 20.0,
            
            // scaling factor (pixels per meter)
            scaling_factor: 20,
            
            // physics world iterations per step
            iterations: 10,
            
            // damage conversion factor given impact velocity (m/s per damage unit)
            damage_factor: 70
        };
    }();
});
