/**
 * projectile.js 
 * 
 * Handles the drawing and animation of sprites.
 * 
 */

$(function() {
	
    var timer = new FrameTimer();
    timer.tick();

    var sprites = new SpriteSheet({
        width: 32,
        height: 32,
        sprites: [
            { name: 'left' },
            { name: 'up', x: 0, y: 1 },
            { name: 'right', x: 0, y: 1 },
        ]
    });
    
    var walk = new Animation([
            { sprite: 'left', time: 0.2 },
            { sprite: 'up', time: 0.2 },
            { sprite: 'right', time: 0.2 },
            { sprite: 'up', time: 0.2 }
    ], sprites); 
	
	
    m3.projectile = function() {
        
        return {
        	
        	sprite: { image: m3.assets.images.sprites.monkeysprite },        	
 
        	getHeight: function() {
        		return this.sprite.image.height;
        	},
        	
        	getWidth: function() {
        		return this.sprite.image.width/3;
        	},
        	
            update: function(x, y) {
            	var context = m3.game.context,
            	    sprite	= this.sprite;            	

            	context.save();
                walk.animate(timer.getSeconds());
                var frame = walk.getSprite();
                context.drawImage(sprite.image, frame.x, frame.y, 40, 44, x, y, 50, 50);
                timer.tick();
                context.restore();
            },
        };
    }();
});