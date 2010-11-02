/**
 * ui/monkey_count.js
 * 
 * This ui widget displays the number of remaining monkeys for both players.
 * 
 */

$(function() {
    m3.ui.monkey_count = function() {
        monkey_count = {};
        
        var context       = m3.game.context,
            monkey_sprite = m3.assets.sprites.monkey,
            monkey_width  = 38,
            monkey_height = 50,
            camera        = m3.camera.position,
            width         = m3.game.width,
            padding       = m3.types.Vector.create(64, 2);
        
        monkey_count.update = function() {
            var forts = m3.game.state.level.fortresses;
            
            // Draw left player's monkeys.
            for (var i = 0, n = forts[0].enemies.length; i < n; i++) {
                var x = camera.x + padding.x + i * monkey_width,
                    y = camera.y + padding.y;
                
                context.drawImage(monkey_sprite, 0, 0, monkey_width, monkey_height, x, y, monkey_width * .55, monkey_height * .55);
            }
            
            // Draw right player's monkeys.
            for (var i = 0, n = forts[1].enemies.length; i < n; i++) {
                var x = camera.x + width - padding.x - i * monkey_width - 22,
                    y = camera.y + padding.y;
                
                context.drawImage(monkey_sprite, 0, 0, monkey_width, monkey_height, x, y, monkey_width * .55, monkey_height * .55);
            }
            
        };
        
        return monkey_count;
    }();
});
