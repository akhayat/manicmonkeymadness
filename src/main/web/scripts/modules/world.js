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
        // create the world
        var worldAABB = new b2AABB();
        worldAABB.lowerBound.Set(-10000.0, -10000.0);
        worldAABB.upperBound.Set(10000.0, 10000.0);
        var gravity = new b2Vec2(0.0, 9.8);
        var world = new b2World(worldAABB, gravity, true);
        world.SetContactListener(m3.contact);
        
        // reference of the world's objects
        var objects = [];
        
        var createBox = function(x, y, width, height, fixed, density, restitution, friction, draw) {
            var bodyDef = new b2BodyDef();
            bodyDef.position.Set(x, y);
            bodyDef.angularDamping = 0.1;
            var body = world.CreateBody(bodyDef);
            var shapeDef = new b2PolygonDef();
            shapeDef.restitution = restitution || 0.2;
            if(!fixed) shapeDef.density = density || 1.0;
            shapeDef.friction = friction || 0.9;
            body.w = width / 2;
            body.h = height / 2;
            shapeDef.SetAsBox(body.w, body.h);
            var shape = body.CreateShape(shapeDef);
            if (!fixed) body.SetMassFromShapes();
            if (draw === undefined) draw = true;
            var object = { body: body, shape: shape, draw: draw, type: "box" };
            objects.push(object);
            return object;
        };
        
        var createBall = function(x, y, radius, fixed, density, restitution, friction, draw) {
            var bodyDef = new b2BodyDef();
            bodyDef.position.Set(x, y);
            if(!fixed) bodyDef.isBullet = true;
            bodyDef.angularDamping = 1.0;
            var body = world.CreateBody(bodyDef);
            var shapeDef = new b2CircleDef();
            shapeDef.radius = radius || 1.0;
            shapeDef.restitution = restitution || 0.6;
            if(!fixed) shapeDef.density = density || 1.0;
            shapeDef.friction = friction || 0.9;
            body.w = 1.0;
            body.h = 1.0;
            var shape = body.CreateShape(shapeDef);
            if (!fixed) body.SetMassFromShapes();
            if (draw === undefined) draw = true;
            var object = { body: body, shape: shape, draw: draw, type: "ball" };
            objects.push(object);
            return object;
        };
       
        var createPoly = function(x, y, points, fixed, density, restitution, friction, draw) {
            var bodyDef = new b2BodyDef();
            bodyDef.position.Set(x, y);
            bodyDef.angularDamping = 0.1;
            var body = world.CreateBody(bodyDef);
            var shapeDef = new b2PolygonDef();
            shapeDef.restitution = restitution || 0.2;
            if(!fixed) shapeDef.density = density || 1.0;
            shapeDef.friction = friction || 0.9;
            shapeDef.vertexCount = points.length;
            for (var i = 0, n = points.length; i < n; i++) {
                shapeDef.vertices[i].Set(points[i][0], points[i][1]);
            }
            body.w = 1.0;
            body.h = 1.0;
            var shape = body.CreateShape(shapeDef);
            if (!fixed) body.SetMassFromShapes();
            if (draw === undefined) draw = true;
            body.SynchronizeShapes();
            var object = { body: body, shape: shape, draw: draw, type: "ground" };
            body.SetUserData(object);
            objects.push(object);
            return object;
        };
        
        var createRevoluteJoint = function(body1, body2, anchor) {
            var revoluteJointDef = new b2RevoluteJointDef();
            revoluteJointDef.Initialize(body1, body2, anchor);
            revoluteJointDef.motorSpeed = 0;
            revoluteJointDef.maxMotorTorque = 10000000;
            revoluteJointDef.enableMotor = true;
            revoluteJointDef.enableLimit = false;
            var revoluteJoint = world.CreateJoint(revoluteJointDef);
            return revoluteJoint;
        };
        
        var createMouseJoint = function(body, mouse_coords) {
        	var mouseJointDef = new b2MouseJointDef();
        	mouseJointDef.body1 = world.GetGroundBody();
        	mouseJointDef.body2 = body;
        	mouseJointDef.target.Set(mouse_coords.x, mouse_coords.y);
        	mouseJointDef.maxForce = 4500.0 * body.mass;
        	mouseJointDef.timeStep = 1 / m3.config.fps;
    		var mouseJoint = world.CreateJoint(mouseJointDef);
    		return mouseJoint;
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
         * A method to test for settled physics  
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
        
        var removeObject = function(object) {
            for (var i = 0, n = objects.length; i < n; i++) {
                if (object === objects[i].body) {
                    objects.splice(i, 1);
                    world.DestroyBody(object);
                    break;
                }
            }
        };
        
        var clear = function() {
            for (var i = 0, n = objects.length; i < n; i++) {
                world.DestroyBody(objects[i].body);
            }
            objects = [];
        };
        
        var init = function() {
            // // create the ground
            // var groundBodyDef = new b2BodyDef();
            // var ground_x = (m3.config.level_width / 2) / m3.config.scaling_factor;
            // var ground_y = (m3.config.level_height - m3.config.ground_height / 2) / m3.config.scaling_factor;
            // groundBodyDef.position.Set(ground_x, ground_y);
            // var groundBody = world.CreateBody(groundBodyDef);
            // var groundShapeDef = new b2PolygonDef();
            // groundShapeDef.restitution = 0.1;
            // groundShapeDef.friction = 1;
            // groundShapeDef.density = 1.0;
            // groundBody.w = m3.config.level_width / m3.config.scaling_factor;
            // groundBody.h = (m3.config.ground_height / 2) / m3.config.scaling_factor;
            // groundShapeDef.SetAsBox(groundBody.w, groundBody.h);
            // var groundShape = groundBody.CreateShape(groundShapeDef);
            // groundBody.SynchronizeShapes();
            // 
            // var object = {body: groundBody, shape: groundShape, draw: true, type: 'ground'};
            // groundBody.SetUserData(object);
            // objects.push(object);
            
            // create the ground
            var groundBodyDef = new b2BodyDef();
            var ground_x = (m3.config.level_width / 2) / m3.config.scaling_factor;
            var ground_y = (m3.config.level_height - m3.config.ground_height / 2) / m3.config.scaling_factor;
            groundBodyDef.position.Set(ground_x, ground_y);
            var groundBody = world.CreateBody(groundBodyDef);
            var groundShapeDef = new b2PolygonDef();
            groundShapeDef.restitution = 0.1;
            groundShapeDef.friction = 1;
            groundShapeDef.density = 1.0;
            groundBody.w = m3.config.level_width / m3.config.scaling_factor;
            groundBody.h = (m3.config.ground_height / 2) / m3.config.scaling_factor;
            groundShapeDef.SetAsBox(groundBody.w, groundBody.h);
            groundShapeDef.vertexCount = 4;
            groundShapeDef.vertices[0].Set(-groundBody.w, -groundBody.h);
            groundShapeDef.vertices[1].Set( groundBody.w, -groundBody.h);
            groundShapeDef.vertices[2].Set( groundBody.w,  groundBody.h);
            groundShapeDef.vertices[3].Set(-groundBody.w,  groundBody.h);
            var groundShape = groundBody.CreateShape(groundShapeDef);
            groundBody.SynchronizeShapes();
            
            var object = {body: groundBody, shape: groundShape, draw: false, type: 'ground'};
            groundBody.SetUserData(object);
            objects.push(object);
            
            // Create platforms.
            var scale    = m3.config.scaling_factor,
                p_width  = m3.config.fort_width / scale,
                p_height = m3.config.fort_platform_height / scale;
            
            createPoly(m3.config.level_padding / scale, 
                       (m3.config.level_height - m3.config.ground_height - m3.config.fort_platform_height) / scale,
                       [[2, 0], [p_width - 2, 0], [p_width, p_height], [0, p_height]], true, 1.0, 0.1, 1.0, false);
            
            createPoly((m3.config.level_width - m3.config.fort_width - m3.config.level_padding) / scale, 
                       (m3.config.level_height - m3.config.ground_height - m3.config.fort_platform_height) / scale,
                       [[2, 0], [p_width - 2, 0], [p_width, p_height], [0, p_height]], true, 1.0, 0.1, 1.0, false);
            
        };
        
        return {
            universe: world,
            objects: objects,
            createBox: createBox,
            createBall: createBall,
            createPoly: createPoly,
            createRevoluteJoint: createRevoluteJoint,
            createMouseJoint: createMouseJoint,
            allSleeping: allSleeping,
            allSettled: allSettled,
            removeObject: removeObject,
            clear: clear,
            init: init,
            update: function() {
                var context = m3.game.context;
                context.save();
                context.scale(m3.config.scaling_factor, m3.config.scaling_factor);
                world.Step(1 / m3.config.fps, m3.config.iterations);
                m3.graphics.drawWorld(objects, context);
                context.restore();
            }
        };
    }();
});
