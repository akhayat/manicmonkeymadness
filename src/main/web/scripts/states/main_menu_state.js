/**
 * main_menu_state.js
 *
 * This is the initial state of the game. It displays a menu for the user.
 */

$(function () {
    m3.states.MainMenuState = function () {
        var MainMenuState = {};
        
        // Key handlers.
        MainMenuState.keyHandlers = {
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
        };
        
        // Buttons to progress from the menu.
        var button_y = m3.game.height - 145;
        
        MainMenuState.play_button = m3.ui.Button.create(230, button_y, 200, 32, "Play", "#003322", "#225544", function() {
            m3.game.state = m3.states.PlayState.create();
        });
        
        MainMenuState.edit_button = m3.ui.Button.create(480, button_y, 200, 32, "Edit Level", "#003322", "#225544", function() {
            m3.game.state = m3.states.EditLevelState.create();
        });
        
        // Main update function.
        MainMenuState.update = function() {
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
            
            // Update the buttons.
            this.play_button.update();
            this.edit_button.update();
        };
        
        // Constructor.
        MainMenuState.create = function() {
            m3.sound.changeMusic(m3.assets.music.monkeys, true);
            return Object.create(this);
        };
        
        return MainMenuState;
    }();
});
