/**
 * launcher.js 
 * 
 * This module is supposed to determine a launch angle using click and drag. The original
 * click location is supposed to be origin and the angle is determined by where the user 
 * lets go. Similar to crush the castle
 */

$(function() {
    m3.launcher = function() {
        var mouse_coords = m3.types.Vector.create();
        
        return {
            aiming:  false,
            cannons: [],
            
            // Returns the current launcher based on whose turn it is.
            currentLauncher: function() {
                return m3.game.state.level.fortresses[m3.game.state.active_player].weapon;
            },
            
            prepareLaunch: function(event) {
                this.aiming = true;
            },
            
            aim: function(event) {
                if (this.aiming) {
                    var launcher = this.currentLauncher();
                    
                    mouse_coords.x = event.pageX - m3.game.x + m3.camera.position.x;
                    mouse_coords.y = event.pageY - m3.game.y + m3.camera.position.y;
                    
                    // Since there is a difference between the width of the actual level and the 
                    // width of the canvas, I had to include this so that the rotation of the launcher
                    // would be smooth.
                    var x = launcher.x + launcher.axisOffset.x;
                    var y = launcher.y + launcher.axisOffset.y;
                    
                    // Caps the angle at 90 or 0.
                    if (launcher.facing === "right") {
                        // Calculates the angle using the launcher and the mouse location. Good ole trig.
                        launcher.angle = Math.atan2((mouse_coords.y - y),(mouse_coords.x - x));
                        if (launcher.angle > 0 && launcher.angle <= Math.PI) {
                            launcher.angle = 0;
                        }
                        else if (launcher.angle < -1 * Math.PI / 2) {
                            launcher.angle = -1 * Math.PI / 2;
                        }
                    }
                    else {
                        // I have to negate the x and y values so it fires in the correct direction.
                        launcher.angle = Math.atan2((y - mouse_coords.y),(x - mouse_coords.x));
                        if (launcher.angle < 0) {
                            launcher.angle = 0;
                        }
                        else if (launcher.angle > Math.PI / 2) {
                            launcher.angle = Math.PI / 2;
                        }
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
                m3.util.log("fire!!!  Angle = " + (-1 * theta * (180 / Math.PI)).toFixed(2));
                m3.assets.sfx.explosion.play();
                
                // Apply an impulse to give the projectile velocity in the x and y directions
                var axislaunchOffset = m3.types.Vector.create((launchOffset.x - axisOffset.x) * Math.cos(theta), (launchOffset.x - axisOffset.x) * Math.sin(theta));
                var launchPoint = m3.types.Vector.create((launcher.x + axisOffset.x + axislaunchOffset.x), (launcher.y + axisOffset.y + axislaunchOffset.y));
                var impulse = m3.types.Vector.create(power * Math.cos(theta), power * Math.sin(theta));
                
                if (launcher.facing === "left") {
                    impulse.x = -impulse.x;
                    impulse.y = -impulse.y;
                }
                
                m3.game.state.active_projectile = m3.types.Projectile.create(launchPoint.x, launchPoint.y, impulse.x, impulse.y, pType, pDetails);
                m3.camera.follow(m3.game.state.active_projectile);
            },
            
            changeWeapon: function() {
                var launcher = this.currentLauncher();
                
                if (launcher.weapon < 1) {
                    launcher.weapon += 1;
                    launcher.pType = "banana";
                    launcher.pDetails = "single";
                }
                else {
                    launcher.weapon = 0;
                    launcher.pType = "rock";
                    launcher.pDetails = "small";
                }
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
                        context.translate(-axisOffset.x, axisOffset.y);
                        context.rotate(-launcher.angle);                        
                        context.translate(image.width / -2, 0);                        
                        context.drawImage(image, axisOffset.x, -(barrelHeight / 2 + axisOffset.y));
                    }
                    else {
                        context.translate(axisOffset.x, axisOffset.y);
                        context.rotate(launcher.angle);
                        context.translate(image.width / -2, 0);
                        context.drawImage(image, -axisOffset.x, -(barrelHeight / 2 + axisOffset.y));
                    }
                    
                    context.restore();
                }
            }
        };
    }();
});
