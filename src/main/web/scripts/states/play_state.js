/**
 * play_state.js
 * 
 * This is the main state of the game in which the game is actually
 * being played.
 * 
 */

$(function() {
    m3.game.states.PlayState = function() {
        this.camera = {
            x: 0,
            y: 0
        };
        
        this.ball = {
            x: 150,
            y: 150,
            dx: 2,
            dy: 4
        };
    };
    
    m3.game.states.PlayState.prototype.keyHandlers = {
        ENTER: {
            down: function() {
                m3.camera.slideTo(m3.config.level_width - m3.game.width, 0);
            }
        }
    };
    
    m3.game.states.PlayState.prototype.mouseHandlers = {
        down: function(event) {
            m3.launcher.prepareLaunch(event);
        },
        
        up: function(event) {
            m3.launcher.launch(event);
        }
    };
    
    m3.game.states.PlayState.prototype.update = function() {
        var ball       = this.ball,
            camera     = this.camera,
            context    = m3.game.context,
            halfWidth  = m3.game.width / 2,
            halfHeight = m3.game.height / 2;
        
        // Move the camera with the arrow keys.
        if (m3.input.keys.RIGHT) {
            m3.camera.move(m3.config.camera_scroll_speed, 0);
        }
        
        if (m3.input.keys.LEFT) {
            m3.camera.move(-m3.config.camera_scroll_speed, 0);
        }
        
        // Update the camera.
        m3.camera.update();
        

        
        
        // Draw a level background.
        var gradient = context.createLinearGradient(0, 0, m3.config.level_width, 0);
        gradient.addColorStop(0, "#000000");
        gradient.addColorStop(1, "#FFFFFF");
        context.fillStyle = gradient;
        context.fillRect(0, 0, m3.config.level_width, m3.config.level_height);
 
        // Draw a circle.
        context.fillStyle = "#EE3333";
        context.beginPath();
        context.arc(ball.x, ball.y, 10, 0, Math.PI*2, true);
        context.closePath();
        context.fill();
        
        // Make it bounce.
        if (ball.x + ball.dx > m3.game.width || ball.x + ball.dx < 0)
            ball.dx = -ball.dx;
        if (ball.y + ball.dy > m3.game.height || ball.y + ball.dy < 0)
            ball.dy = -ball.dy;
        
        // Update location.
        ball.x += ball.dx;
        ball.y += ball.dy;
    
        // Update the physics world
        m3.world.update();
    };
    
});
