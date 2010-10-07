/**
 * fortress.js
 * 
 * This object represents and manages a player's fortress.
 * 
 */

$(function() {
    m3.types.Fortress = function() {
        var FortPiece = m3.types.FortPiece;
        
        return {
            position: null,
            pieces:   null,
            monkeys:  null,
            
            // Adds a fortress piece to the fortress. x and y are in local coordinate
            // space -- they are relative to the fortress's position.
            addPiece: function(shape, size, material, x, y, angle) {
                this.pieces.push(FortPiece.create(shape, size, material, this.position + x, y, angle));
            },
            
            // Fortress's update function updates all of its pieces.
            update: function() {
                var pieces = this.pieces;
                
                for (var i = 0, n = pieces.length; i < n; i++) {
                    pieces[i].update();
                }
            },
            
            // "Constructor".
            create: function(x) {
                var f = Object.create(this);
                f.position = x;
                f.pieces = [];
                return f;
            },
        };
    }();
});
