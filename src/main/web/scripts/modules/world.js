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
        
        // create the ground       
        var groundBodyDef = new b2BodyDef();
        var ground_x = (m3.config.level_width / 2) / m3.config.scaling_factor;
        var ground_y = (m3.config.level_height - m3.config.ground_height / 2) / m3.config.scaling_factor;
        groundBodyDef.position.Set(ground_x, ground_y);
        var groundBody = world.CreateBody(groundBodyDef);
        var groundShapeDef = new b2PolygonDef();
        groundShapeDef.restitution = 0.2;
        groundShapeDef.friction = 0.9;
        groundShapeDef.density = 1.0;
        groundBody.w = m3.config.level_width / m3.config.scaling_factor;
        groundBody.h = (m3.config.ground_height / 2) / m3.config.scaling_factor;
        groundShapeDef.SetAsBox(groundBody.w, groundBody.h);
        var groundShape = groundBody.CreateShape(groundShapeDef);
        groundBody.SynchronizeShapes();
        var object = {body: groundBody, shape: groundShape, draw: true, type: 'ground'};
        groundBody.SetUserData(object);
        objects.push(object);

        function createBox(x, y, width, height, fixed, density, restitution, friction, draw) {
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
            var object = { body: body, shape: shape, draw: draw };
            objects.push(object);
            return object;
        };
        
        function createBall(x, y, radius, fixed, density, restitution, friction, draw) {
            var bodyDef = new b2BodyDef();
            bodyDef.position.Set(x, y);
            if(!fixed) bodyDef.isBullet = true;
            bodyDef.angularDamping = 0.1;
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
            var object = { body: body, shape: shape, draw: draw };
            objects.push(object);
            return object;
        };
       
        function createPoly(x, y, points, fixed, density, restitution, friction, draw) {
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
            var object = { body: body, shape: shape, draw: draw };
            objects.push(object);
            return object;
        }
        
        function removeObject(object) {
            for (var i = 0, n = objects.length; i < n; i++) {
                if (object === objects[i].body) {
                    objects.splice(i, 1);
                    world.DestroyBody(object);
                    break;
                }
            }
        };
        
        return {
            universe: world,
            objects: objects,
            createBox: createBox,
            createBall: createBall,
            createPoly: createPoly,
            removeObject: removeObject,
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
