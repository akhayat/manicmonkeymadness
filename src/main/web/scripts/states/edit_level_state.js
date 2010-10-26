/**
 * edit_level_state.js
 *
 * This state is for creating and editing fortresses.
 */

$(function () {
    m3.states.EditLevelState = function () {
        var EditLevelState = {};
        EditLevelState.EditLevelState = EditLevelState;
        
        // Keyboard input handlers for the edit level state.
        EditLevelState.keyHandlers = {
            
        };
        
        // Mouse input handlers for the edit level state.
        EditLevelState.mouseHandlers = {
            
        };
        
        // Main update function for the edit level state.
        EditLevelState.update = function() {
            var context     = m3.game.context,
                half_width  = m3.game.width / 2,
                half_height = m3.game.height / 2;
            
            // Draw the background.
            context.fillStyle = "rgb(250, 170, 160)";
            context.fillRect(0, 0, m3.game.width, m3.game.height);
            
            // Draw the text.
            context.fillStyle = "rgba(0, 0, 0, 0.8)";
            context.font      = "bold 48px sans-serif";
            context.textAlign = "center";
            context.fillText("Psych! Nothing here yet...", half_width, half_height);
        };
        
        // Constructor.
        EditLevelState.create = function() {
            return Object.create(this);
        };
        
        return EditLevelState;
    }();
});
