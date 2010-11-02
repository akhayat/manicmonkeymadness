/**
 * edit_level_state.js
 *
 * This state is for creating and editing fortresses.
 */

$(function () {
    m3.states.EditLevelState = function () {
        var EditLevelState = {};
        EditLevelState.EditLevelState = EditLevelState;
        
        // This is the
        EditLevelState.level = null;
        
        // Keyboard input handlers for the edit level state.
        EditLevelState.keyHandlers = {
            
        };
        
        // Mouse input handlers for the edit level state.
        EditLevelState.mouseHandlers = {
            
        };
        
        // Main update function for the edit level state.
        EditLevelState.update = function() {
            var context = m3.game.context;
            
            this.level.update();
            m3.world.update();
            
            // Render some transparent red rectangles to show the fortress boundaries.
            context.fillStyle = "rgba(255, 0, 0, 0.2)";
            context.fillRect(0, 0, m3.config.level_padding + 40, m3.game.height);
            context.fillRect(m3.config.level_padding + m3.config.fort_width - 40, 0, m3.game.width, m3.game.height);
        };
        
        // Constructor.
        EditLevelState.create = function() {
            var s = Object.create(this);
            m3.world.clear();
            m3.world.init();
            
            s.level = m3.types.Level.create();
            
            return s;
        };
        
        return EditLevelState;
    }();
});
