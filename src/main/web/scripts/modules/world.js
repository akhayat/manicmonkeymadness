/**
 * world.js
 * 
 * This module stores the box2d world object that allows creation of bodies to simulate
 * the needed physics. Units for physics bodies are MKS (meters-kilograms-seconds) and 
 * are scaled to pixels 
 *  
 */

$(function() {
    m3.world = function() {
        //create the world
        var worldAABB = new b2AABB();
        worldAABB.minVertex.Set(0, 0);
        worldAABB.maxVertex.Set(m3.config.level_width / m3.config.scaling_factor, m3.config.level_height / m3.config.scaling_factor);
        var gravity = new b2Vec2(0, 0.5);
        var doSleep = true;
        var world = new b2World(worldAABB, gravity, doSleep);
        
        //create the ground
        var groundBox = new b2BoxDef();
        groundBox.extents.Set((m3.config.level_width / 2) / m3.config.scaling_factor, 1);
        groundBox.restitution = 0.2;
        var groundBody = new b2BodyDef();
        groundBody.AddShape(groundBox);
        groundBody.position.Set((m3.config.level_width / 2) / m3.config.scaling_factor, 21);
        world.CreateBody(groundBody);
        
        //create walls
        //createBox(2, 5, 2, 10, 1.0);
        //createBox(5, 5, 10, 1.0);
        
        //create some bodies
        createBox(15, 17, 1, 3);
        createBox(20, 17, 1, 3);
        //createBox(20, 13.9, 7, 0.1);       
        createBall(18.7, 1, 0.5);
        //createPoly(15, -1, [[4, 3], [0, 0], [0, 3]]);

        
        function createBox(x, y, width, height, density) {
            var boxSd = new b2BoxDef();
            boxSd.extents.Set(width, height);
            var boxBd = new b2BodyDef();
            boxBd.density = density || 1.0;
            boxBd.AddShape(boxSd);
            boxBd.position.Set(x, y);
            return world.CreateBody(boxBd);
        };
        
        function createBall(x, y, radius, density) {
            var ballSd = new b2CircleDef();
            ballSd.density = density || 1.0;
            ballSd.radius = radius || 1.0;
            ballSd.restitution = 1.0;
            ballSd.friction = 0;
            var ballBd = new b2BodyDef();
            ballBd.AddShape(ballSd);
            ballBd.position.Set(x,y);
            return world.CreateBody(ballBd);
        };
        
        function createPoly(x, y, points) {
        	var polySd = new b2PolyDef();
        	polySd.density = 1.0;
        	polySd.vertexCount = points.length;
        	for (var i = 0; i < points.length; i++) {
        		polySd.vertices[i].Set(points[i][0], points[i][1]);
        	}
        	var polyBd = new b2BodyDef();
        	polyBd.AddShape(polySd);
        	polyBd.position.Set(x,y);
        	return world.CreateBody(polyBd);
        };

        
        return {
            update: function() {
                var context = m3.game.context;
                
                context.save();
                context.scale(m3.config.scaling_factor, m3.config.scaling_factor);
                context.lineWidth = 0.1;
                world.Step(m3.config.fps / 60.0, 1);
                m3.graphics.drawWorld(world, m3.game.context);
                context.restore();
            },
            createBox: createBox,
            createBall: createBall
        };
    }();
});
