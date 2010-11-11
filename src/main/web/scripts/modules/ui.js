/**
 * ui.js
 * 
 * This module maintains the HUD and user interface. It also contains some
 * convenient functions related to the UI.
 * 
 */

$(function() {
    m3.ui = function() {
        var ui      = {},
            context = m3.game.context;
        
        ui.drawStrokedText = function(text, x, y) {
            context.strokeText(text, x, y);
            context.fillText(text, x, y);
        };
        
        ui.update = function() {
            if (m3.game.state.game_state === "done") {
                this.done.update();
            }
            else {
                this.turn.update();
                this.weapon.update();
                this.marker.update();
            }
            
            this.score.update();
            this.monkey_count.update();
        };
        
        return ui;
    }();
});
