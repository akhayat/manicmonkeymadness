/**
 * edit_level_state.js
 *
 * This state is for creating and editing fortresses.
 */

$(function () {
    m3.states.EditLevelState = function () {
        var EditLevelState = {};
        EditLevelState.EditLevelState = EditLevelState;
        
        var FortPiece = m3.types.FortPiece,
            Vector    = m3.types.Vector;
        
        EditLevelState.done_button = m3.ui.Button.create(705, 380, 120, 32, "Export", "#550011", "#661122", function() {
            $("#fort_output textarea").html(JSON.stringify(m3.game.state.output));
            $(".fade").fadeIn(180);
            $("#fort_output").fadeIn(180);
        });
        
        // Tracks whether we're dragging something or not.
        EditLevelState.dragging = false;
        
        // Which piece are we currently dragging?
        EditLevelState.active_piece = null;
        
        // This is an array that holds all the fort pieces that can be used to construct a fort.
        EditLevelState.pieces = [
            FortPiece.create(0, "box", "long",  "wood", 650, 60, 0, null, true),
            FortPiece.create(0, "box", "short", "wood", 670, 60, 0, null, true),
            FortPiece.create(0, "box", "long",  "rock", 690, 60, 0, null, true),
            FortPiece.create(0, "box", "short", "rock", 710, 60, 0, null, true)
        ];
        
        // This array holds all the fort pieces that actually make up the fort being constructed.
        EditLevelState.fort = [];
        
        // This state uses a regular level just like the play state does.
        EditLevelState.level = null;
        
        // This is a dummy object that contains a toJSON method that will be called by JSON.stringify
        // to create the JSON output.
        EditLevelState.output = {
            toJSON: function() {
                var output = {
                    pieces:  [],
                    enemies: []
                };
                
                var fort = m3.game.state.fort;
                
                for (var i = 0, n = fort.length; i < n; i++) {
                    var p = fort[i];
                    
                    output.pieces.push({
                        shape: p.piece_shape,
                        size:  p.piece_size,
                        type:  p.piece_material,
                        x:     p.x,
                        y:     p.y,
                        angle: p.angle
                    });
                }
                
                return output;
            }
        };
        
        // Mouse input handlers for the edit level state.
        EditLevelState.mouseHandlers = {
            down: function(event) {
                var state = m3.game.state,
                    mouse = m3.types.Vector.create();
                
                mouse.x = m3.input.mouse.x + m3.camera.position.x;
                mouse.y = m3.input.mouse.y + m3.camera.position.y;
                
                var clicked_piece = state.firstGrabbable(mouse.x, mouse.y);
                
                if (clicked_piece) {
                    state.dragging     = true;
                    state.active_piece = (clicked_piece.is_fort_piece) ? clicked_piece : state.addPiece(clicked_piece);
                }
            },
            
            up: function(event) {
                var state = m3.game.state;
                
                state.dragging     = false;
                state.active_piece = null;
            },
            
            move: function(event) {
                if (m3.game.state.dragging) {
                    var state = m3.game.state;
                    
                    state.active_piece.x = event.pageX - m3.game.x + m3.camera.position.x;
                    state.active_piece.y = event.pageY - m3.game.y + m3.camera.position.y;
                }
            }
        };
        
        // Adds a new piece to the level based on a "template" piece -- one of the pieces in the palette.
        EditLevelState.addPiece = function(t) {
            var piece = m3.types.FortPiece.create(0, t.piece_shape, t.piece_size, t.piece_material, t.x, t.y, t.angle, null, true);
            piece.is_fort_piece = true;
            this.fort.push(piece);
            return piece;
        };
        
        // Returns the first fort piece on the stage for which the given x and y coordinates overlap
        // the piece's grabber.
        EditLevelState.firstGrabbable = function(x, y) {
            var pieces         = this.pieces,
                fort           = this.fort,
                radius_squared = m3.config.grabber_radius * m3.config.grabber_radius;
            
            var overlaps = function(piece) {
                var distance_squared = Vector.create(x - piece.x, y - piece.y).lengthSquared();
                return (distance_squared <= radius_squared);
            }
            
            for (var i = 0, n = pieces.length; i < n; i++) {
                if (overlaps(pieces[i])) {
                    return pieces[i];
                }
            }
            
            for (var i = 0, n = fort.length; i < n; i++) {
                if (overlaps(fort[i])) {
                    return fort[i];
                }
            }
            
            return null;
        };
        
        // Main update function for the edit level state.
        EditLevelState.update = function() {
            var context      = m3.game.context,
                active_piece = this.active_piece,
                pieces       = this.pieces,
                fort         = this.fort;
            
            // Rotate the currently-held piece with the arrow keys.
            if (active_piece) {
                if (m3.input.keys.LEFT || m3.input.keys.DOWN) {
                    active_piece.angle -= m3.config.rotation_speed * m3.game.elapsed;
                }
                
                if (m3.input.keys.RIGHT || m3.input.keys.UP) {
                    active_piece.angle += m3.config.rotation_speed * m3.game.elapsed;
                }
            }
            
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
            
            for (var i = 0, n = fort.length; i < n; i++) {
                fort[i].update();
            }
            
            // Update the done button.
            this.done_button.update();
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
