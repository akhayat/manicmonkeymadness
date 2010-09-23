/**
 * play_state.js
 * 
 * This is the main state of the game in which the game is actually
 * being played.
 * 
 */

$(function() {
    m3.states.PlayState = function() {
        this.image = {
            x: 150,
            y: 150,
            dx: 1,
            dy: 2
        };
        
        this.level = new m3.types.Level();
    };
    
    m3.states.PlayState.prototype.keyHandlers = {
        ENTER: {
            down: function() {
                m3.camera.slideTo(m3.config.level_width - m3.game.width, 0, "smooth");
            }
        }
    };
    
    m3.states.PlayState.prototype.mouseHandlers = {
        down: function(event) {
            m3.launcher.prepareLaunch(event);
        },
        
        up: function(event) {
            m3.launcher.launch(event);
        },
        
        move: function(event) {
        	m3.launcher.aim(event);
        }
    };
    
    m3.states.PlayState.prototype.update = function() {
        var image        = this.image,
            monkey       = new Image(),
            level        = this.level,
            context      = m3.game.context,
            halfWidth    = m3.game.width / 2,
            halfHeight   = m3.game.height / 2;
        
        var left = new Image(),
        up = new Image(),
        right = new Image();
        
        left.src = 'images/sprites/monkeyleft.png';
        up.src = 'images/sprites/monkeyup.png';
        right.src = 'images/sprites/monkeyright.png';
        
        // Update modules.
        m3.camera.update();
        level.update();
        m3.launcher.update();
        
        context.save();
        context.scale(m3.config.scaling_factor, m3.config.scaling_factor);
        context.lineWidth = 0.1;
        m3.world.update();
        context.restore();
        
        //DO NOT REMOVE YET, temporary for changing images.
//        switch(image.count%3) {
//        case 0: context.drawImage(left, image.x, image.y); break;
//        case 1: context.drawImage(up, image.x, image.y); break;
//        case 2: context.drawImage(right, image.x, image.y); break;
//        default: alert("fail"); break;
//        }
        
        context.drawImage(up, image.x, image.y);
        
        // Make it bounce.
        if (image.x + image.dx > m3.game.width || image.x + image.dx < 0 || image.x + image.dx + up.width > m3.game.width)
            image.dx = -image.dx;
        if (image.y + image.dy > m3.game.height || image.y + image.dy < 0 || image.y + image.dy + up.height > m3.game.height)
            image.dy = -image.dy;
        
        // Update location.
        image.x += image.dx;
        image.y += image.dy;

    };
    
});
