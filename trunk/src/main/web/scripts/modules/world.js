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
        window.world = world;
        
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
        objects.push({body: groundBody, shape: groundShape});
        
        // create walls
        createBox(0.2, (m3.config.level_height / 2) / m3.config.scaling_factor, 0.1, 15, true);
        createBox(m3.config.level_width / m3.config.scaling_factor - 0.2, (m3.config.level_height / 2) / m3.config.scaling_factor, 0.1, 15, true);
        
        // create some demo bodies  	
        createBox(10, 1, 1, 0.5, false, 1);
        createBox(13, 1, 1, 1, false, 1);
        createBox(15, 3, 0.5, 1, false, 1);
        
        createBox(9, 20, 0.5, 3, false, 1);
        createBox(12, 20, 0.5, 3, false, 1);
        createBox(14, 15, 3, 0.1, false, 1);
        
        createBall(10, 1, 1, false);
        
        function createBox(x, y, width, height, fixed, density, restitution, friction) {
            var bodyDef = new b2BodyDef();
            bodyDef.position.Set(x, y);
            var body = world.CreateBody(bodyDef);
            var shapeDef = new b2PolygonDef();
            shapeDef.restitution = restitution || 0.2;
            shapeDef.density = density || 0.0;
            shapeDef.friction = friction || 0.9;
            body.w = width;
            body.h = height;
            shapeDef.SetAsBox(body.w, body.h);
            var shape = body.CreateShape(shapeDef);
            if(!fixed) body.SetMassFromShapes();
            objects.push({body: body, shape: shape});
            return { 
                body: body,
                shape: shape 
            };
        };
        
        function createBall(x, y, radius, fixed, density, restitution, friction) {
            var bodyDef = new b2BodyDef();
            bodyDef.position.Set(x, y);
            if(!fixed) bodyDef.isBullet = true;
            bodyDef.angularDamping = 0.1;
            var body = world.CreateBody(bodyDef);
            var shapeDef = new b2CircleDef();
            shapeDef.radius = radius || 1.0;
            shapeDef.restitution = restitution || 0.6;
            shapeDef.density = density || 2.0;
            shapeDef.friction = friction || 0.9;
            body.w = 1.0;
            body.h = 1.0;
            var shape = body.CreateShape(shapeDef);
            if(!fixed) body.SetMassFromShapes();
            objects.push({body: body, shape: shape});
            return { 
                body: body,
                shape: shape 
            };
        };
            
        return {
            universe: world,
            objects: objects,
            createBox: createBox,
            createBall: createBall,
            update: function() {
                var context = m3.game.context;                
                context.save();
                context.scale(m3.config.scaling_factor, m3.config.scaling_factor);
                world.Step(1 / m3.config.fps, 100);
                m3.graphics.drawWorld(objects, context);
                context.restore();
            }
        };
    }();
});
