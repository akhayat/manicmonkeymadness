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
            
            // The maximum number of enemies in a fort.
            max_enemies: 8,
            
            // How many points are allowed to be used to make a fortress in the level editor.
            fort_points: 500,
            
            // The width of each fortress area.
            fort_width: 640,
            
            // How tall the fortress platform should be.
            fort_platform_height: 75,
            
            // How high in pixels the base ground is from the bottom of the screen.
            ground_height: 30,
            
            // Camera's scroll speed in pixels per second.
            camera_scroll_speed: 1000,
            
            // The maximum amount of time spent per turn, in seconds.
            max_turn_time: 20.0,
            
            // scaling factor (pixels per meter)
            scaling_factor: 20,
            
            // physics world iterations per step
            velocity_iterations: 10,
            position_iterations: 10,
            
            // damage conversion factor given impact velocity (m/s per damage unit)
            damage_factor: 70,
            
            // The radius of the circles drawn on the fort pieces in edit level mode used to drag
            // and drop the pieces.
            grabber_radius: 9.0,

            // How fast the fort pieces should be rotated in edit level mode.
            rotation_speed: 2.5
        };
    }();
});
