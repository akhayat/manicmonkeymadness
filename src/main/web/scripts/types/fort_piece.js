/**
 * fort_piece.js
 * 
 * This object represents a chunk of a fort.
 * 
 */

$(function() {
    m3.types.FortPiece = function() {
        var Sprite = m3.types.Sprite,
            assets = m3.assets.sprites.fort_pieces;
        
        var pieces = {
            box: {
                long: {
                    wood: { s: assets.box_long_wood, h: 100, w: 10 }
                },
                short: {
                    wood: { s: assets.box_short_wood, h: 50, w: 10 }
                }
            }
        };
        
        var materials = {
            wood: { density: 1.5, restitution: 0.25, friction: 0.85 }
        };
        
        return {
            // "Constructor".
            create: function(shape, size, material, x, y, angle) {
                var object = Object.create(m3.types.PhysicsObject.create(x, y)),
                    t     = pieces[shape][size][material],
                    m     = materials[material],
                    scale = m3.config.scaling_factor,
                    piece = m3.world.createBox(x / scale, y / scale, t.w / scale, t.h / scale,
                                               false, m.density, m.restitution, m.friction, false);
                
                object.body   = piece.body;
                object.shape  = piece.shape;
                object.sprite = Sprite.create(t.s, t.h, t.w);
                object.angle  = angle;
                
                return object;
            },
        };
    }();
});
