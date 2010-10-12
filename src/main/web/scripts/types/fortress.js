/**
 * fortress.js
 * 
 * This object represents and manages a player's fortress.
 * 
 */

$(function() {
    m3.types.Fortress = function() {
        var FortPiece = m3.types.FortPiece;
        var Enemy     = m3.types.Enemy;
        
        return {
            owner:    null,
            position: null,
            pieces:   null,
            enemies:  null,
            
            // Adds a fortress piece to the fortress. x and y are in local coordinate
            // space -- they are relative to the fortress's position.
            addPiece: function(shape, size, material, x, y, angle) {
                this.pieces.push(FortPiece.create(this, shape, size, material, this.position + x, y, angle));
            },
            
            // Adds an enemy piece to the fortress. x and y are in local coordinate
            // space -- they are relative to the fortress's position.
            addEnemy: function(character, type, x, y, angle) {
                this.enemies.push(Enemy.create(this, character, type, this.position + x, y, angle));
            },
            
            // Fortress's update function updates all of its pieces.
            update: function() {
                var pieces = this.pieces;
                var enemies = this.enemies;
                
                for (var i = 0, n = pieces.length; i < n; i++) {
                    pieces[i].update();
                }
                
                for (var j = 0, n = enemies.length; j < n; j++) {
                    enemies[j].update();
                }
            },
            
            // "Constructor".
            create: function(owner, x) {
                var f = Object.create(this);
                f.owner = owner;
                f.position = x;
                f.pieces = [];
                f.enemies = [];
                return f;
            },
        };
    }();
});
