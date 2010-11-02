/**
 * main_menu_state.js
 *
 * This is the initial state of the game. It displays a menu for the user.
 */

$(function () {
    m3.states.MainMenuState = function () {
        return {
            // Keyboard input handlers for the main menu state.
            keyHandlers: {
                ENTER: {
                    down: function() {
                        m3.game.state = m3.states.PlayState.create();
                    }
                },
                
                E: {
                    down: function() {
                        m3.game.state = m3.states.EditLevelState.create();
                    }
                },
                
                C: {
                    down: function() {
                        $('#console').toggle();
                    }
                },
                
                P: {
                	down: function() {
                	    m3.sound.toggleMusic();
                    }
                }
            },
            
            // Mouse input handlers for the main menu state.
            mouseHandlers: {
               down: function(event) {
                   m3.game.state = m3.states.PlayState.create();
               }
            },
            
            // Main update function for the main menu state.
            update: function() {
            	//m(m3.assets.music.rideTheLightning);
                var context     = m3.game.context,
                    half_width  = m3.game.width / 2,
                    half_height = m3.game.height / 2;
                
                // Draw the background.
                context.fillStyle = "rgb(200, 220, 250)";
                context.fillRect(0, 0, m3.game.width, m3.game.height);
                
                // Draw the text.
                context.fillStyle = "rgba(0, 0, 0, 0.8)";
                context.font      = "bold 48px sans-serif";
                context.textAlign = "center";
                context.fillText("Manic Monkey Madness!!!", half_width, half_height);
                
                context.font = "bold 30px sans-serif";
                context.fillText("Click to play, or press E to create a fortress!", half_width, half_height + 80);
            },
            
            // "Constructor".
            create: function() {
            	m3.sound.changeMusic(m3.assets.music.monkeys, true);
                return Object.create(this);
            }
        };
    }();
});