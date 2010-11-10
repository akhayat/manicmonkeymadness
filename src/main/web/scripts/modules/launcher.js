/**
 * launcher.js 
 * 
 * This module is supposed to determine a launch angle using click and drag. The original
 * click location is supposed to be origin and the angle is determined by where the user 
 * lets go. Similar to crush the castle
 */

$(function() {
    m3.launcher = function() {
        var mouseJoint, 
            mouse_coords = m3.types.Vector.create(0,0),
            mouse_coords_physics = m3.types.Vector.create(0,0);
        
        return {
            aiming:  false,
            cannons: [],
        	projectiles: [{type:"rock", details:"small"}, {type:"banana", details:"single"}, {type:"banana", details:"triple"}],
            
            // Returns the current launcher based on whose turn it is.
            currentLauncher: function() {
                return m3.game.state.level.fortresses[m3.game.state.active_player].weapon;
            },
            
            updateMouseCoords: function(event) {
            	var scale = m3.config.scaling_factor;
            	
                mouse_coords.x = event.pageX - m3.game.x + m3.camera.position.x;
                mouse_coords.y = event.pageY - m3.game.y + m3.camera.position.y;
                
                mouse_coords_physics.x = mouse_coords.x / scale;
                mouse_coords_physics.y = mouse_coords.y / scale;            	
            },
            
            prepareLaunch: function(event) {
            	var launcher = this.currentLauncher();
                
            	this.aiming = true;
                
                this.updateMouseCoords(event);
                
                if (!mouseJoint) 
                	mouseJoint = m3.world.createMouseJoint(launcher.barrel, mouse_coords_physics);
            },
            
            aim: function(event) {
                if (this.aiming) {
                    var launcher = this.currentLauncher();
                    
                    this.updateMouseCoords(event);
                    
                    if (!!mouseJoint) 
                    	mouseJoint.SetTarget(mouse_coords_physics);
                }
            },
            
            launch: function(event) {
                var launcher     = this.currentLauncher(),
                    theta        = launcher.barrel.GetAngle(),
                    axisOffset   = launcher.axisOffset,
                    launchOffset = launcher.launchOffset,
                    power        = launcher.power,
                    pType        = launcher.pType,
                    pDetails     = launcher.pDetails;
                
                this.aiming = false;
                
                m3.assets.sfx.explosion.play();
                
                // Apply an impulse to give the projectile velocity in the x and y directions
                var axisLaunchOffset = m3.types.Vector.create((launchOffset.x - axisOffset.x) * Math.cos(theta), (launchOffset.x - axisOffset.x) * Math.sin(theta));
                
                var launchPoint = m3.types.Vector.create((launcher.x + axisLaunchOffset.x), (launcher.y + axisLaunchOffset.y));
                
                var impulse = m3.types.Vector.create(power * Math.cos(theta), power * Math.sin(theta));
                
                if (launcher.facing === "left") {
                    impulse.x = -impulse.x;
                    impulse.y = -impulse.y;
                }
                
                if (launcher.pDetails === "triple") {
                	m3.game.state.active_projectile[0] = m3.types.Projectile.create(launchPoint.x, launchPoint.y, impulse.x, impulse.y, pType, pDetails);
                	m3.game.state.active_projectile[1] = m3.types.Projectile.create(launchPoint.x, launchPoint.y, impulse.x, impulse.y, pType, pDetails);
                	m3.game.state.active_projectile[2] = m3.types.Projectile.create(launchPoint.x, launchPoint.y, impulse.x, impulse.y, pType, pDetails);
                }
                else {
                	m3.game.state.active_projectile[0] = m3.types.Projectile.create(launchPoint.x, launchPoint.y, impulse.x, impulse.y, pType, pDetails);
                }
                
                m3.camera.follow(m3.game.state.active_projectile[0]);
                
                if (!!mouseJoint) {
                    m3.world.universe.DestroyJoint(mouseJoint);
                    mouseJoint = null;
                }
                
                m3.util.log("fire!!!  Angle = " + (-1 * theta * (180 / Math.PI)).toFixed(2));
            },
            
            changeWeapon: function() {
                var launcher = this.currentLauncher();

            	launcher.weapon = (launcher.weapon + 1) % this.projectiles.length;
        		launcher.pType = this.projectiles[launcher.weapon].type;
        		launcher.pDetails = this.projectiles[launcher.weapon].details;
            },
            
            update: function() {
                var context = m3.game.context;
                
                // Draws both launchers at the appropriate angles.
                for (var i = 0; i < 2; i++) {
                    var fortress = m3.game.state.level.fortresses[i],
                        launcher = fortress.weapon,
                        axisOffset = launcher.axisOffset,
                        barrelHeight = launcher.barrelHeight,
                        image = launcher.image;
                    
                    context.save();
                    
                    // Rotate about the wheel axle
                    context.translate(launcher.x, launcher.y);
                    
                    if (launcher.facing === "left") {
                        context.scale(-1, 1);
                        context.rotate(launcher.joint.GetJointAngle());                        
                        context.translate(image.width / -2, 0);                
                        context.drawImage(image, axisOffset.x, -(barrelHeight / 2 + axisOffset.y));
                    }
                    else {
                        context.rotate(-launcher.joint.GetJointAngle());
                        context.translate(image.width / -2, 0);
                        context.drawImage(image, -axisOffset.x, -(barrelHeight / 2 + axisOffset.y));
                    }
                    
                    context.restore();
                }
            }
        };
    }();
});
