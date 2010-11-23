/**
 * world.js
 * 
 * This module stores the box2d world that allows creation of bodies to simulate
 * the physical world. Units for physics bodies are MKS (meters-kilograms-seconds) and 
 * are scaled to pixels 
 *  
 */

$(function() {
    m3.world = function() {
    	
    	//box2d package references (yay actionscript port)
        var b2Vec2 = Box2D.Common.Math.b2Vec2,
     		b2BodyDef = Box2D.Dynamics.b2BodyDef,
     		b2Body = Box2D.Dynamics.b2Body,
     		b2FixtureDef = Box2D.Dynamics.b2FixtureDef,
     		b2Fixture = Box2D.Dynamics.b2Fixture,
     		b2World = Box2D.Dynamics.b2World,
     		b2PolygonShape = Box2D.Collision.Shapes.b2PolygonShape,
     		b2CircleShape = Box2D.Collision.Shapes.b2CircleShape,
     	    b2DebugDraw = Box2D.Dynamics.b2DebugDraw;

        //box2d world
        var world = new b2World(new b2Vec2(0, 9.8), //gravity
                                true);              //allow sleeping bodies
        
        //reference to box2d world objects
        var objects = [];
        
        //box2d native debug drawing
        var debugDrawEnabled = false;
        
        /*
         * Creates a box shaped box2d object with the given parameters
         */         
        var createBox = function(x, y, width, height, angle, fixed, density, restitution, friction) {
        	var bodyDef = new b2BodyDef();
            if (!fixed) {
                bodyDef.type = b2Body.b2_dynamicBody;
                bodyDef.angularDamping = 0.1;
                bodyDef.bullet = true;
            }
            bodyDef.position.x = x;
            bodyDef.position.y = y;
            bodyDef.angle = angle;
            var body = world.CreateBody(bodyDef);
            
            var fixtureDef = new b2FixtureDef();
            fixtureDef.shape = new b2PolygonShape();
            fixtureDef.shape.SetAsBox(width / 2, height / 2);
            fixtureDef.density = density || 1.0;
            fixtureDef.friction = friction || 0.9;
            fixtureDef.restitution = restitution || 0.2;
            var shape = body.CreateFixture(fixtureDef);
            
            var object = { body: body, shape: shape, type: "box" };
            objects.push(object);
            return object;
        };
        
        /*
         * Creates a circle box2d object with the given parameters
         */
        var createCircle = function(x, y, radius, fixed, density, restitution, friction) {
        	var bodyDef = new b2BodyDef();
            if (!fixed) {
                bodyDef.type = b2Body.b2_dynamicBody;
                bodyDef.angularDamping = 1.0;
                bodyDef.bullet = true;
            }
            bodyDef.position.x = x;
            bodyDef.position.y = y;
            var body = world.CreateBody(bodyDef);

            var fixtureDef = new b2FixtureDef();
            fixtureDef.shape = new b2CircleShape(radius);
            fixtureDef.density = density || 1.0;
            fixtureDef.friction = friction || 0.9;
            fixtureDef.restitution = restitution || 0.2;
            var shape = body.CreateFixture(fixtureDef);

            var object = { body: body, shape: shape, type: "circle" };
            objects.push(object);
            return object;
        };
        
        /*
         * Creates a convex polygon box2d object with the given parameters.
         * Points is an array of b2Vec vertices
         */
        var createPoly = function(x, y, points, angle, fixed, density, restitution, friction) {
        	var bodyDef = new b2BodyDef();
            if (!fixed) {
                bodyDef.type = b2Body.b2_dynamicBody;
                bodyDef.angularDamping = 0.1;
                bodyDef.bullet = true;
            }
            bodyDef.position.x = x;
            bodyDef.position.y = y;
            bodyDef.angle = angle || 0;
            var body = world.CreateBody(bodyDef);

            var fixtureDef = new b2FixtureDef();
            fixtureDef.shape = new b2PolygonShape();
            fixtureDef.shape.SetAsArray(points, points.length);
            fixtureDef.density = density || 1.0;
            fixtureDef.friction = friction || 0.9;
            fixtureDef.restitution = restitution || 0.2;
            var shape = body.CreateFixture(fixtureDef);
            
            var object = { body: body, shape: shape, type: "ground" };
            objects.push(object);
            return object;
        };
        
        /*
         * Creates a kinematic body composed of two shapes. Offset is a vector relative to
         * the body center.
         */
        var createCirclePolyComposite = function(x, y, radius, points) {
        	var bodyDef = new b2BodyDef();
            bodyDef.type = b2Body.b2_kinematicBody;
            bodyDef.position.x = x;
            bodyDef.position.y = y;
            var body = world.CreateBody(bodyDef);
            
            var fixtureDef = new b2FixtureDef();
            fixtureDef.shape = new b2CircleShape(radius);
            var shape1 = body.CreateFixture(fixtureDef);
            
            fixtureDef.shape = new b2PolygonShape();
            fixtureDef.shape.SetAsArray(points, points.length);
            var shape2 = body.CreateFixture(fixtureDef);
        	
            var object = { body: body, shape: shape2, shape2: shape2, type: "ground" };
            objects.push(object);
            return object;
        };
        
        /*
         * Initializes the world
         */
        var init = function() {
        	//setup collision detection
        	world.SetContactListener(m3.contact);
        	
            //create ground
        	var bodyDef = new b2BodyDef();
            bodyDef.position.x = (m3.config.level_width / 2) / m3.config.scaling_factor;
            bodyDef.position.y = (m3.config.level_height - m3.config.ground_height / 2) / m3.config.scaling_factor;
            var groundBody = world.CreateBody(bodyDef);
            
            var fixtureDef = new b2FixtureDef();
            fixtureDef.shape = new b2PolygonShape();
            fixtureDef.density = 1.0;
            fixtureDef.friction = 0.9;
            fixtureDef.restitution = 0.2;
            fixtureDef.shape.SetAsBox((m3.config.level_width / 2) / m3.config.scaling_factor, (m3.config.ground_height / 2) / m3.config.scaling_factor);
            var groundShape = groundBody.CreateFixture(fixtureDef);
            
            var object = {body: groundBody, shape: groundShape, type: 'ground'};
            groundBody.SetUserData(object);
            objects.push(object);

            //create platforms
            var scale    = m3.config.scaling_factor,
                p_width  = m3.config.fort_width / scale,
                p_height = m3.config.fort_platform_height / scale;
          
            var platform1 = createPoly(m3.config.level_padding / scale, 
                  (m3.config.level_height - m3.config.ground_height - m3.config.fort_platform_height) / scale,
                  [new b2Vec2(2, 0), new b2Vec2(p_width - 2, 0), new b2Vec2(p_width, p_height), new b2Vec2(0, p_height)], 
                  0, true, 1.0, 0.1, 1.0);
            platform1.body.SetUserData(platform1);
            
       
            var platform2 = createPoly((m3.config.level_width - m3.config.fort_width - m3.config.level_padding) / scale, 
                  (m3.config.level_height - m3.config.ground_height - m3.config.fort_platform_height) / scale,
                  [new b2Vec2(2, 0), new b2Vec2(p_width - 2, 0), new b2Vec2(p_width, p_height), new b2Vec2(0, p_height)],
                  0, true, 1.0, 0.1, 1.0);
            platform2.body.SetUserData(platform2);
            
            //setup debug draw mode
            var debugDraw = new b2DebugDraw();
		    debugDraw.SetSprite(m3.game.context);
			debugDraw.SetDrawScale(m3.config.scaling_factor);
			debugDraw.SetFillAlpha(0.3);
			debugDraw.SetLineThickness(1.0);
			debugDraw.SetFlags(b2DebugDraw.e_shapeBit | b2DebugDraw.e_jointBit);
			world.SetDebugDraw(debugDraw);
        };
        
        /*
         * Simulates an explosion by applying impulses to the surrounding bodies
         */
        var explode = function(position) {
        	var shapes 			= [],
        		xDistance 		= 0,
        		active_player 	= m3.game.state.active_player,
        		level			= m3.game.state.level,
        		scale 			= m3.config.scaling_factor,
        		level_width		= m3.config.level_width;
        	
    		xDistance = position.x / scale;

      		shapes = active_player ? level.fortresses[0].pieces : level.fortresses[1].pieces;
        	
        	for (var i = 0, j = shapes.length; i < j; i+=1) {
        		var b 	= shapes[i],
        		 	fv 	= new b2Vec2(b.x, b.y);
        		
        		if (Math.abs(xDistance - fv.x / scale) <= 5) {
        			fv.Subtract(position);
        			fv.Normalize();
        			fv.Multiply(200);
            		b.body.SetAwake(true);
            		b.body.ApplyImpulse(fv, new b2Vec2(b.x / scale, b.y / scale));
        		}

        	}
        	
        };
        
        /*
         * Returns true if all of the objects in the world 
         * are asleep
         */
        var allSleeping = function() {
            for (var i = 0, n = objects.length; i < n; i+=1) {
                if (!objects[i].body.IsSleeping() && objects[i].type !== "ground") {
                    return false;
                }
            }
            
            return true;
        };
        
        /*
         * Returns true iff the physics have settled  
         */
        var allSettled = function(threshold) {
        	for (var i = 0, n = objects.length; i < n; i+=1) {
        	    var v = objects[i].body.GetLinearVelocity();
                var t = objects[i].body.GetAngularVelocity();
                if (v.Length() > threshold || Math.abs(t) > threshold) {
                	return false;
                }
        	}
        	return true;
        };
        
        /*
         * Removes an object from the box2d world
         */
        var removeObject = function(object) {
            for (var i = 0, n = objects.length; i < n; i++) {
                if (object === objects[i].body) {
                    objects.splice(i, 1);
                    world.DestroyBody(object);
                    break;
                }
            }
        };
        
        /*
         * Destroys all bodies in the box2d world
         */
        var clear = function() {
            for (var i = 0, n = objects.length; i < n; i++) {
                world.DestroyBody(objects[i].body);
            }
            objects = [];
        };
        
        /*
         * Steps the box2d world
         */
        var update = function() {
        	world.Step(1 / m3.config.fps, m3.config.velocity_iterations, m3.config.position_iterations);
            
            if (debugDrawEnabled) world.DrawDebugData();
        };
        
        /*
         * Toggles debug drawing mode
         */
        var toggleDebugDraw = function() {
        	debugDrawEnabled = !debugDrawEnabled;
        	m3.util.log(debugDrawEnabled ? "Debug Drawing Enabled" : "Debug Drawing Disabled");
        };
        
        /*
         * Returns true iff debug drawing mode is enabled
         */
        var debugDrawMode = function() {
        	return debugDrawEnabled;
        };
    	
        return {
            init: init,
            update: update,
            createBox: createBox,
            createBall: createCircle,
            createPoly: createPoly,
            createCirclePolyComposite : createCirclePolyComposite,
            explode: explode,
            allSleeping: allSleeping,
            allSettled: allSettled,
            removeObject: removeObject,
            clear: clear,
            toggleDebugDraw: toggleDebugDraw,
            debugDrawMode: debugDrawMode
        };
    }();
});
