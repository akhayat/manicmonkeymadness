/**
 * graphics.js
 * 
 * This module stores the canvas drawing procedures for m3 shapes.
 *  
 */
$(function() {
	m3.graphics = function() {
		var drawBall = function(shape, context) {
			context.fillStyle = '#EE3333';
			context.beginPath();
		   	var circle = shape;
			var pos = circle.m_localPosition;
			var r = circle.m_radius;
			var segments = 50.0;
			var theta = 0.0;
			var dtheta = 2.0 * Math.PI / segments;
			// draw circle
			context.moveTo(pos.x + r, pos.y);
			for (var i = 0; i < segments; i++) {
				var d = new b2Vec2(r * Math.cos(theta), r * Math.sin(theta));
				var v = b2Math.AddVV(pos, d);
				context.lineTo(v.x, v.y);
				theta += dtheta;
			}
			context.lineTo(pos.x + r, pos.y);
		};
				
	    var drawPoly = function(shape, context) {
			context.strokeStyle = '#EE3333';
			context.beginPath();
			var poly = shape;
			var tV = b2Math.AddVV(poly.m_localPosition, b2Math.b2MulMV(poly.m_R, poly.m_vertices[0]));
			context.moveTo(tV.x, tV.y);
			for (var i = 0; i < poly.m_vertexCount; i++) {
				var v = b2Math.AddVV(poly.m_localPosition, b2Math.b2MulMV(poly.m_R, poly.m_vertices[i]));
				context.lineTo(v.x, v.y);
			}
			context.lineTo(tV.x, tV.y);
			context.stroke();
		};	

		return {	

			drawBall: drawBall,
			
			drawPoly: drawPoly,
	
			draw: function(world, context) {
				for (var b = world.m_bodyList; b; b = b.m_next) {
					for (var s = b.GetShapeList(); s != null; s = s.GetNext()) {				        
						if (s.m_type == b2Shape.e_circleShape) {
							drawBall(s, context);
						} else {
							//drawPoly(s, context);
						}
					}
				}    
			},

			drawWorld: function(bodies, context) {
			    for(var i = 0; i < bodies.length; i++){
			        var body = bodies[i];
			        var t = body.m_xf;
			        context.strokeStyle = '#EE3333';
			        context.translate(t.position.x, t.position.y);
			        context.rotate(body.GetAngle());
			        context.fillRect(-body.w, -body.h, body.w*2, body.h*2);
			        context.rotate(-body.GetAngle());
			        context.translate(-t.position.x, -t.position.y);
			    }
			}
		  
		};
	}();
});	