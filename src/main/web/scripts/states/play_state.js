/**
 * play_state.js
 * 
 * This is the main state of the game in which the game is actually
 * being played.
 * 
 */

$(function() {
    m3.game.states.PlayState = function() {
        this.ball = {
            x: 150,
            y: 150,
            dx: 2,
            dy: 4,
        };
    };
    
    m3.game.states.PlayState.prototype.keyHandlers = {
        A: {
            down: function() {
                m3.util.log("Pressed A!");
            },
            
            up: function() {
                m3.util.log("Released A!");
            },
        },
    };
    
    m3.game.states.PlayState.prototype.mouseHandlers = {
        down: function(event) {
            m3.launcher.prepareLaunch(event);
        },
        
        up: function(event) {
            m3.launcher.launch(event);
        },
    };
    
    m3.game.states.PlayState.prototype.update = function() {
        //define the ball
        var ball       = this.ball,
            context    = m3.game.context,
            halfWidth  = m3.game.width / 2,
            halfHeight = m3.game.height / 2;
        
        //draw a circle
        context.beginPath();
        context.arc(ball.x, ball.y, 10, 0, Math.PI*2, true);
        context.closePath();
        context.fill();
        
        //make it bounce
        if (ball.x + ball.dx > m3.game.width || ball.x + ball.dx < 0)
            ball.dx = -ball.dx;
        if (ball.y + ball.dy > m3.game.height || ball.y + ball.dy < 0)
            ball.dy = -ball.dy;
        
        //update location
        ball.x += ball.dx;
        ball.y += ball.dy;
        
    };
});
