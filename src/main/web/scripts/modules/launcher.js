/**
 * launcher.js 
 * 
 * This module is supposed to determine a launch angle using click and drag. The original
 * click location is supposed to be origin and the angle is determined by where the user 
 * lets go. Similar to crush the castle
 */

$(function() {
    m3.launcher = function() {
        var b2Vec2 = Box2D.Common.Math.b2Vec2,            
            mouse_coords = m3.types.Vector.create(0,0);
        
        return {
            aiming:  false,
            cannons: [],
        	projectiles: [{type:"rock", details:"small"}, 
        	              {type:"banana", details:"single"}, 
        	              {type:"banana", details:"triple"}, 
        	              {type:"watermelon", details:"whole"},
        	              {type:"monkey", details:"medium"}],
            
            /*
             * Returns the launcher of the player whose turn it is
             */
            currentLauncher: function() {
                return m3.game.state.level.fortresses[m3.game.state.active_player].weapon;
            },
            
            /*
             * Updates the mouse coordinates of the pixels and physics world
             */
            updateMouseCoords: function(event) {
                mouse_coords.x = event.pageX - m3.game.x + m3.camera.position.x;
                mouse_coords.y = event.pageY - m3.game.y + m3.camera.position.y;
            },
            
            prepareLaunch: function(event) {
            	var launcher = this.currentLauncher();
                
            	this.aiming = true;
                
                this.updateMouseCoords(event);
            },
            
            aim: function(event) {
                if (this.aiming) {
                    var launcher = this.currentLauncher();
                	
                    this.updateMouseCoords(event);
                    
                    var x = launcher.x;
                    var y = launcher.y;

                    if (launcher.facing === "right") {
                    	
                    	var angle = Math.atan2(mouse_coords.y - y, mouse_coords.x - x);
                    	
                    	if (angle > 0 && angle <= Math.PI) {
                    		angle = 0;
                    	} else if (angle < -Math.PI / 2) {
                    		angle = -Math.PI / 2;
                    	}
                    	
                    	launcher.angle = angle;
                    } else {
                    	
                    	var angle = Math.atan2(y - mouse_coords.y, x - mouse_coords.x);
                    	
                    	if (angle < 0) {
                    		angle = 0;
                    	} else if (angle > Math.PI / 2) {
                    		angle = Math.PI / 2;
                    	}
                    	
                    	launcher.angle = angle;
                    }
                }
            },
            
            launch: function(event) {
                var launcher     = this.currentLauncher(),
                    theta        = launcher.angle,
                    axisOffset   = launcher.axisOffset,
                    launchOffset = launcher.launchOffset,
                    power        = launcher.power,
                    pType        = launcher.pType,
                    pDetails     = launcher.pDetails;
                
                this.aiming = false;
                
                m3.assets.sfx.explosion.play();
                
                // Apply an impulse to give the projectile velocity in the x and y directions
                var axislaunchOffset = m3.types.Vector.create((launchOffset.x - axisOffset.x) * Math.cos(theta), (launchOffset.x - axisOffset.x) * Math.sin(theta));
                var launchPoint = m3.types.Vector.create((launcher.x + axisOffset.x + axislaunchOffset.x), (launcher.y + axisOffset.y + axislaunchOffset.y));
                var axisLaunchOffset = m3.types.Vector.create((launchOffset.x - axisOffset.x + 200) * Math.cos(theta), (launchOffset.x - axisOffset.x) * Math.sin(theta));
                
                var launchPoint = m3.types.Vector.create((launcher.x + axisLaunchOffset.x), (launcher.y + axisLaunchOffset.y));
                
                var impulse = m3.types.Vector.create(power * Math.cos(theta), power * Math.sin(theta));
                
                if (launcher.facing === "left") {
                    impulse.x = -impulse.x;
                    impulse.y = -impulse.y;
                    launchPoint.x -= 300;
                }
                
                if (launcher.pDetails === "triple") {
                	m3.game.state.active_projectile[0] = m3.types.Projectile.create(launchPoint.x, launchPoint.y, impulse, pType, pDetails);
                	m3.game.state.active_projectile[1] = m3.types.Projectile.create(launchPoint.x, launchPoint.y, impulse, pType, pDetails);
                	m3.game.state.active_projectile[2] = m3.types.Projectile.create(launchPoint.x, launchPoint.y, impulse, pType, pDetails);
                }
                else {
                	m3.game.state.active_projectile[0] = m3.types.Projectile.create(launchPoint.x, launchPoint.y, impulse, pType, pDetails);
                }
                
                m3.camera.follow(m3.game.state.active_projectile[0]);
                
                m3.util.log("fire!!!  Angle = " + (-1 * theta * (180 / Math.PI)).toFixed(2));
            },
            
            changeWeapon: function() {
                var launcher = this.currentLauncher();

            	launcher.weapon = (launcher.weapon + 1) % this.projectiles.length;
        		launcher.pType = this.projectiles[launcher.weapon].type;
        		launcher.pDetails = this.projectiles[launcher.weapon].details;
            },
            
            update: function() {
            	var launcher = this.currentLauncher(),
            	    angle    = launcher.angle,
            	    speed    = m3.config.rotation_speed,
            	    time     = m3.game.elapsed;

            	//rotate current launcher if keys are being used
            	if (launcher.facing === "left") {
                    if (m3.input.keys.Z && angle > speed * time) {
                	    launcher.angle -= speed * time;
                    }
                
                    if (m3.input.keys.X && angle < Math.PI / 2 - (speed * time)) {
                	    launcher.angle += speed * time;
                    }
            	} else {
                    if (m3.input.keys.Z && angle < -speed * time) {
                	    launcher.angle += speed * time;
                    }
                
                    if (m3.input.keys.X && angle > -Math.PI / 2 + (speed * time)) {
                	    launcher.angle -= speed * time;
                    }
            	}    
            	
            	if (m3.world.debugDrawMode()) return;
            	
                var context = m3.game.context;
                
                // Draws both launchers at the appropriate angles.
                for (var i = 0; i < 2; i++) {
                    var fortress = m3.game.state.level.fortresses[i],
                        launcher = fortress.weapon,
                        axisOffset = launcher.axisOffset,
                        barrel_height = launcher.barrel_height,
                        image = launcher.image;
                    
                    context.save();
                    
                    // Rotate about the wheel axle
                    context.translate(launcher.x, launcher.y);
                    
                    if (launcher.facing === "left") {
                        context.scale(-1, 1);
                        context.rotate(-launcher.angle);                        
                        context.translate(image.width / -2, 0);                
                        context.drawImage(image, axisOffset.x, -(barrel_height / 2 + axisOffset.y));
                    }
                    else {
                        context.rotate(launcher.angle);
                        context.translate(image.width / -2, 0);
                        context.drawImage(image, -axisOffset.x, -(barrel_height / 2 + axisOffset.y));
                    }
                    
                    context.restore();
                }
            }
        };
    }();
});
