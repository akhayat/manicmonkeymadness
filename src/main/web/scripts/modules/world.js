/**
 * world.js
 * 
 * This module stores the box2d world object that allows creation of bodies to simulate
 * the needed physics.
 *  
 */

$(function() {
	m3.world = function() {
		//create the world
		var worldAABB = new b2AABB();
		worldAABB.minVertex.Set(0, 0);
		worldAABB.maxVertex.Set(m3.config.level_width, m3.config.level_height);		
		var gravity = new b2Vec2(0, m3.config.gravity);
		var doSleep = true;
		var world = new b2World(worldAABB, gravity, doSleep);

		//create the ground
		var groundBox = new b2BoxDef();
		groundBox.extents.Set(450, 20);
		groundBox.restitution = 0.2;		
		var groundBody = new b2BodyDef();
		groundBody.AddShape(groundBox);
		groundBody.position.Set(450, 440);
		world.CreateBody(groundBody);				

		//create some bodies
        createBox(400, 345, 10, 80);
        createBox(500, 345, 10, 80);
        createBox(450, 255, 80, 10);       
        createBall(450, 0, 10);
			
		function createBox(x, y, width, height) {			
			var boxSd = new b2BoxDef();
			boxSd.extents.Set(width, height);
			var boxBd = new b2BodyDef();
			boxBd.density = 10.0;
			//boxBd.restitution = 0.2;
			boxBd.AddShape(boxSd);
			boxBd.position.Set(x, y);
			return world.CreateBody(boxBd);			
		};
		
		function createBall(x, y, rad, fixed) {
			var ballSd = new b2CircleDef();
			if (!fixed) ballSd.density = 1.0;
			ballSd.radius = rad || 10;
			ballSd.restitution = 0.2;
			var ballBd = new b2BodyDef();
			ballBd.AddShape(ballSd);
			ballBd.position.Set(x,y);
			return world.CreateBody(ballBd);
		};

		return {			
			update: function() {
				world.Step(60 / 60.0, 1);
				m3.graphics.drawWorld(world, m3.game.context);
			}		
		};
	}();
});