/**
 * play_state.js
 * 
 * This is the main state of the game in which the game is actually
 * being played.
 * 
 */

$(function() {
    m3.states.PlayState = function() {
        this.level = new m3.types.Level();
    };
    
    m3.states.PlayState.prototype.keyHandlers = {
        ENTER: {
            down: function() {
                m3.camera.slideTo(m3.config.level_width - m3.game.width, 0, "smooth");
            }
        },
        
        S: {
            down: function() {
                m3.score.player_scores[1] += 5.0;
            }
        }
    };
    
    m3.states.PlayState.prototype.mouseHandlers = {
        down: function(event) {
            m3.launcher.prepareLaunch(event);
        },
        
        up: function(event) {
            m3.launcher.launch(event);
        },
        
        move: function(event) {
        	m3.launcher.aim(event);
        }
    };
    
    m3.states.PlayState.prototype.update = function() {
        // Update modules.
        m3.camera.update();
        this.level.update();
        m3.launcher.update();
        m3.world.update();
        m3.ui.update();
    };
});
