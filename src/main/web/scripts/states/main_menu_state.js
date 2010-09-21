/**
 * main_menu_state.js
 *
 * This is the initial state of the game. It displays a menu for the user.
 *
 */

$(function() {
    m3.states.MainMenuState = function() {};
    
    m3.states.MainMenuState.prototype.keyHandlers = {
        ENTER: {
            down: function() {
                m3.game.state = new m3.states.PlayState();
            }
        },
        
        SPACE: {
            down: function() {
                m3.util.log("Pressed space!");
            },
            
            up: function() {
                m3.util.log("Released space!");
            }
        }
    };
    
    m3.states.MainMenuState.prototype.update = function () {
        var context    = m3.game.context,
            halfWidth  = m3.game.width / 2,
            halfHeight = m3.game.height / 2;
        
        // Draw the background.
        context.fillStyle = "rgb(200, 220, 250)";
        context.fillRect(0, 0, m3.game.width, m3.game.height);
        
        // Draw the text.
        context.fillStyle = "rgba(0, 0, 0, 0.8)";
        context.font      = "bold 48px sans-serif";
        context.textAlign = "center";
        context.fillText("Manic Monkey Madness!!!", halfWidth, halfHeight);
        
        context.font = "bold 30px sans-serif";
        context.fillText("Press enter to continue!", halfWidth, halfHeight + 80);
    };
});
