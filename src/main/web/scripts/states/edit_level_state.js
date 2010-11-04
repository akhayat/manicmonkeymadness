/**
 * edit_level_state.js
 *
 * This state is for creating and editing fortresses.
 */

$(function () {
    m3.states.EditLevelState = function () {
        var EditLevelState = {};
        EditLevelState.EditLevelState = EditLevelState;
        
        var FortPiece = m3.types.FortPiece;
        
        // This is an array that holds all the fort pieces that can be used to construct a fort.
        EditLevelState.pieces = [
            FortPiece.create(0, "box", "long",  "wood", 650, 60, 0, []),
            FortPiece.create(0, "box", "short", "wood", 670, 60, 0, []),
            FortPiece.create(0, "box", "long",  "rock", 690, 60, 0, []),
            FortPiece.create(0, "box", "short", "rock", 710, 60, 0, [])
        ];
        
        // This array holds all the fort pieces that actually make up the fort being constructed.
        EditLevelState.fort = [];
        
        // This state uses a regular level just like the play state does.
        EditLevelState.level = null;
        
        // Keyboard input handlers for the edit level state.
        EditLevelState.keyHandlers = {
            
        };
        
        // Mouse input handlers for the edit level state.
        EditLevelState.mouseHandlers = {
            move: function(event) {
                var mouse = m3.types.Vector.create();
                mouse.x = event.pageX - m3.game.x + m3.camera.position.x;
                mouse.y = event.pageY - m3.game.y + m3.camera.position.y;
            }
        };
        
        // Returns the first fort piece on the stage that the given x and y coordinates overlap.
        EditLevelState.firstOverlap = function(x, y) {
            var pieces = this.pieces,
                fort   = this.fort;
            
            var overlaps = function(piece) {
                return (x >= piece.x - piece.width  && y >= piece.y - piece.height &&
                        x <= piece.x  + piece.width && y <= piece.y + piece.height);
            }
            
            for (var i = 0, n = pieces.length; i < n; i++) {
                if (overlaps(pieces[i])) {
                    return pieces[i];
                }
            }
            
            for (var i = 0, n = fort.length; i < n; i++) {
                if (overlaps(pieces[i])) {
                    return pieces[i];
                }
            }
            
            return null;
        };
        
        // Main update function for the edit level state.
        EditLevelState.update = function() {
            var context = m3.game.context,
                pieces  = this.pieces;
            
            this.level.update();
            m3.world.update();
            
            // Render some transparent red rectangles to show the fortress boundaries.
            context.fillStyle = "rgba(255, 0, 0, 0.2)";
            context.fillRect(0, 0, m3.config.level_padding + 45, m3.game.height);
            context.fillRect(m3.config.level_padding + m3.config.fort_width - 35, 0, m3.game.width, m3.game.height);
            
            // Render the pieces.
            for (var i = 0, n = pieces.length; i < n; i++) {
                pieces[i].update();
            }
        };
        
        // Constructor.
        EditLevelState.create = function() {
            var s = Object.create(this);
            m3.world.clear();
            m3.world.init();
            
            s.level = m3.types.Level.create(false);
            
            return s;
        };
        
        return EditLevelState;
    }();
});
