/**
 * fortress.js
 * 
 * This object represents and manages a player's fortress.
 * 
 */

$(function() {
    m3.types.Fortress = function() {
        var Fortress = {};
        Fortress.Fortress = Fortress;
        
        var FortPiece = m3.types.FortPiece,
            Enemy     = m3.types.Enemy,
            Weapon    = m3.types.Weapon,
            Vector    = m3.types.Vector;
        
        // Adds a fortress piece to the fortress. x and y are in local coordinate
        // space -- they are relative to the fortress's position.
        Fortress.addPiece = function(shape, size, material, x, y, angle) {
            this.pieces.push(FortPiece.create(this, shape, size, material, this.position + x, y, angle, this.pieces));
        };
        
        // Adds an enemy piece to the fortress. x and y are in local coordinate
        // space -- they are relative to the fortress's position.
        Fortress.addEnemy = function(character, type, x, y, angle) {
            this.enemies.push(Enemy.create(this, character, type, this.position + x, y, angle, this.enemies));
        };
        
        // Adds a launcher to the fortress.
        Fortress.addLauncher = function(skin, type, angle, axisOffset, launchOffset) {
            this.weapon = Weapon.create(this, skin, type, this.side, angle, axisOffset, launchOffset);
        };
        
        // Returns whether or not the fort is destroyed. A fort is considered destroyed
        // if all of its monkeys are dead.
        Fortress.isDestroyed = function() {
            return this.enemies.length <= 0;
        };
        
        // Fortress's update function updates all of its pieces.
        Fortress.update = function() {
            // When we update fort pieces and enemies, there is a possibility that they
            // will be destroyed. In doing so, they automatically remove themselves from
            // their containing array. This can cause issues if we're looping through the
            // container itself. Therefore, we instead loop through copies of the containers.
            var pieces  = this.pieces.slice(),
                enemies = this.enemies.slice(),
                weapon  = this.weapon;
            
            for (var i = 0, n = pieces.length; i < n; i++) {
                pieces[i].update();
            }
            
            for (var j = 0, n = enemies.length; j < n; j++) {
                enemies[j].update();
            }
            
            weapon.update();
        };
        
        // Constructor.
        Fortress.create = function(owner, json) {
            var f   = Object.create(this);
            f.owner = owner;
            
            if (owner === 0) {
                f.side     = "left";
                f.position = 0;
            }
            else {
                f.side     = "right";
                f.position = m3.config.level_width - m3.config.fort_width;
                
                // Flip the fort on the right side.
                for (var i = 0, n = json.pieces.length; i < n; i++) {
                    var p = json.pieces[i];
                    p.x -= 2 * p.x - m3.config.fort_width;
                    p.angle *= -1;
                }
                
                for (var i = 0, n = json.enemies.length; i < n; i++) {
                    var e = json.enemies[i];
                    e.x -= 2 * e.x - m3.config.fort_width;
                    e.angle *= -1;
                }
            }
            
            f.pieces  = [];
            f.enemies = [];
            f.weapon  = null;
            
            // Add fort pieces.
            for (var i = 0, n = json.pieces.length; i < n; i++) {
                var p = json.pieces[i];
                f.addPiece(p.shape, p.size, p.type, p.x, p.y, p.angle);
            }
            
            // Add enemies.
            for (var i = 0, n = json.enemies.length; i < n; i++) {
                var e = json.enemies[i];
                f.addEnemy(e.type, e.size, e.x, e.y, e.angle);
            }
            
            // Add launchers.           
            f.addLauncher("cannon", "grey", 0);
            
            return f;
        };
        
        return Fortress;
    }();
});
