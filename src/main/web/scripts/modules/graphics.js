/**
 * graphics.js
 * 
 * This module stores the canvas drawing procedures for m3 shapes.
 *  
 */
$(function() {
    m3.graphics = function() {
        
        return {
            
            drawWorld: function(objects, context) {
                m3.game.context.fillStyle = "#332200";
                
                for (var i = 0, n = objects.length; i < n; i++) {
                    if (!objects[i].draw) {
                        continue;
                    }
                    
                    var body = objects[i].body;
                    var shape = objects[i].shape;
                    var t = body.m_xf;
                    
                    context.translate(t.position.x, t.position.y);
                    
                    if (shape.m_type == b2Shape.e_circleShape) {
                    	context.beginPath();
                        context.arc(0, 0, shape.m_radius, 0, Math.PI*2, true);
                        context.closePath();
                        context.fill();
                    } else if (shape.m_vertexCount == 4) {
                    	context.rotate(body.GetAngle());
                        context.fillRect(-body.w, -body.h, body.w*2, body.h*2);
                        context.rotate(-body.GetAngle());                    	
                    } else {
                    	context.rotate(body.GetAngle());
                    	context.beginPath();
            			context.moveTo(shape.m_vertices[0].x, shape.m_vertices[0].y);
            			for (var i = 1, n = shape.m_vertexCount; i < n; i++) {
            				context.lineTo(shape.m_vertices[i].x, shape.m_vertices[i].y);
            			}
            			context.lineTo(shape.m_vertices[0].x, shape.m_vertices[0].y);
                        context.closePath();
                        context.fill();
                        context.rotate(-body.GetAngle());
                    }
                    
                    context.translate(-t.position.x, -t.position.y);
                }
            }          
        };
    }();
});	