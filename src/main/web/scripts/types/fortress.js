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
        var Weapon = m3.types.Weapon;
        
        return {
            owner:    null,
            position: null,
            pieces:   null,
            enemies:  null,
            weapon: null,
            
            // Adds a fortress piece to the fortress. x and y are in local coordinate
            // space -- they are relative to the fortress's position.
            addPiece: function(shape, size, material, x, y, angle) {
                this.pieces.push(FortPiece.create(this, shape, size, material, this.position + x, y, angle, this.pieces));
            },
            
            // Adds an enemy piece to the fortress. x and y are in local coordinate
            // space -- they are relative to the fortress's position.
            addEnemy: function(character, type, x, y, angle) {
                this.enemies.push(Enemy.create(this, character, type, this.position + x, y, angle, this.enemies));
            },
            
            addLauncher: function(skin, type, x, y, angle, axis) {
            	this.weapon = (Weapon.create(this, skin, type, this.position + x, y, angle, axis));
            	
            },
            
            // Returns whether or not the fort is destroyed. A fort is considered destroyed
            // if all of its monkeys are dead.
            isDestroyed: function() {
                return this.enemies.length <= 0;
            },
            
            // Fortress's update function updates all of its pieces.
            update: function() {
                var pieces  = this.pieces.slice(),
                    enemies = this.enemies.slice(),
                    weapon = this.weapon;
                
                for (var i = 0, n = pieces.length; i < n; i++) {
                    pieces[i].update();
                }
                
                for (var j = 0, n = enemies.length; j < n; j++) {
                    enemies[j].update();
                }
                
                weapon.update();
            },
            
            // "Constructor".
            create: function(owner, x) {
                var f = Object.create(this);
                f.owner = owner;
                f.position = x;
                f.pieces = [];
                f.enemies = [];
                f.weapon = null;
                return f;
            },
        };
    }();
});
