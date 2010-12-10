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
            C: {
                down: function() {
                    m3.util.toggleLog();
                }
            },
            
            D: {
            	down: function() {
            	    m3.world.toggleDebugDraw();
                }
            },
            
            P: {
                down: function() {
                    m3.sound.toggleMusic();
                }
            }
        };
        
        // Buttons to progress from the menu.
        var button_y = m3.game.height - 75;
        
        MainMenuState.play_button = m3.ui.Button.create(215, button_y, 200, 32, "Play", "#003322", "#225544", function() {
            $("#lightbox").fadeIn(180);
            $("#fort_select").fadeIn(180);
        });
        
        MainMenuState.edit_button = m3.ui.Button.create(480, button_y, 200, 32, "Edit Level", "#003322", "#225544", function() {
            m3.game.state = m3.states.EditLevelState.create();
        });
        
        // Main update function.
        MainMenuState.update = function() {
            var context = m3.game.context,
                logo    = m3.assets.logo;
            
            // Draw the background.
            context.fillStyle = "rgb(200, 220, 250)";
            context.fillRect(0, 0, m3.game.width, m3.game.height);
            
            // Draw the logo
            context.drawImage(logo, (m3.game.width / 2) - (0.7 * logo.width / 2), 10, 0.7 * logo.width, 0.7 * logo.height);
            
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
