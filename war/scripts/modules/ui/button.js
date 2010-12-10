/**
 * button.js 
 * 
 * This is a UI type that represents a clickable button.
 * 
 */

$(function() {
    m3.ui.Button = function() {
        var Button        = {},
            context       = m3.game.context,
            text_y_offset = 25
            mouse         = m3.input.mouse;
        
        Button.update = function() {
            var x      = this.x,
                y      = this.y,
                width  = this.width,
                height = this.height;
            
            this.hovered = ((mouse.x >= x && mouse.x <= x + width) &&
                            (mouse.y >= y && mouse.y <= y + height));
            
            // Draw the background.
            context.fillStyle = this.hovered ? this.color2 : this.color1;
            context.fillRect(x, y, width, height);
            
            // Draw the text.
            context.fillStyle = "rgba(255, 255, 255, 0.9)";
            context.font      = "bold 24px Tahoma, Geneva, sans-serif";
            context.textAlign = "center";
            context.fillText(this.text, x + width / 2, y + text_y_offset);
            
            // Perform the callback if we've clicked on the button.
            if (this.hovered && mouse.just_pressed) {
                this.callback();
            }
        };
        
        Button.create = function(x, y, width, height, text, color1, color2, callback) {
            var b = Object.create(this);
            
            b.x        = x;
            b.y        = y;
            b.width    = width;
            b.height   = height;
            b.text     = text;
            b.color1   = color1;
            b.color2   = color2;
            b.callback = callback;
            b.hovered  = false;
            
            return b;
        };
        
        return Button;
    }();
});
