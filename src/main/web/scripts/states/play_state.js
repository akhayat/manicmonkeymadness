/**
 * play_state.js
 * 
 * This is the main state of the game in which the game is actually being played.
 * 
 */

$(function() {
    m3.states.PlayState = function() {
        var PlayState = {};
        PlayState.PlayState = PlayState;
        
        // The state's level.
        PlayState.level = null;
        
        // The state determines what we're doing right now. It can be one of:
        //   
        //   - starting:      The game just loaded, and we're waiting a moment to actually
        //                    start the game.
        //   - waiting:       It's a player's turn, and we're waiting for them to launch
        //                    a projectile.
        //   - attacking:     The player has launched a projectile, and we're letting the
        //                    physics system do its work.
        //   - transitioning: After the attacking state is finished, we're transitioning
        //                    back to the other player.
        //   - done:          One of the players has won and the game has ended. We're
        //                    waiting for the players to choose to start over or return
        //                    to the main menu.
        PlayState.game_state = "starting";
        
        // This keeps track of how long we've been in the current state.
        PlayState.state_time = 0.0;
        
        PlayState.old_time = null;
        
        // This determines whose turn it is. The player who starts is chosen randomly.
        PlayState.active_player = 0;
        
        // This is a reference to the projectile most recently launched.
        PlayState.active_projectile = null;
        
        // Keeps track of who won when the game ends.
        PlayState.winner = null;
        
        // Keyboard input handlers for the play state.
        PlayState.keyHandlers = {
            C: {
                down: function() {
                    $("#console").toggle();
                }
            },
            
            P: {
                down: function() {
                    m3.sound.toggleMusic();
                }
            },
            
            S: {
                down: function() {
                    m3.sound.toggleSound();
                }
            },
            
            W: {
                down: function() {
                    m3.launcher.changeWeapon();
                }
            },
            
            ESCAPE: {
                down: function() {
                    m3.launcher.aiming = false;
                }
            },
            
            Q: {
                down: function() {
                    if (m3.game.state.game_state === "done") {
                        m3.game.state = m3.states.MainMenuState.create();
                    }
                }
            },
            
            N: {
                down: function() {
                    if (m3.game.state.game_state === "done") {
                        m3.game.state = m3.states.PlayState.create();
                    }
                }
            }
        };
        
        // Mouse input handlers for the main menu state.
        PlayState.mouseHandlers = {
            down: function(event) {
                var state = m3.game.state;
                
                if (state.game_state === "waiting") {
                    m3.launcher.prepareLaunch(event);
                }
            },
            
            up: function(event) {
                var state = m3.game.state;
                
                if (state.game_state === "waiting" && m3.launcher.aiming) {
                    m3.launcher.launch(event);
                    state.setState("attacking");
                }
            },
            
            move: function(event) {
                var state = m3.game.state;
                
                if (state.game_state === "waiting") {
                    m3.launcher.aim(event);
                }
            }
        };
        
        // The setter for the state also resets the state timer.
        PlayState.setState = function(new_state) {
            this.game_state = new_state;
            this.state_time = 0.0;
        };
        
        // This is the update function for the starting state.
        PlayState.updateStarting = function() {
            if (this.state_time >= 0.5) {
                this.setState("waiting");
            }
        };
        
        // This is the update function for the waiting state.
        PlayState.updateWaiting = function() {
            // Nothing yet.
        };
        
        // This is the update function for the attacking state.
        PlayState.updateAttacking = function() {
            // Check if the projectile is offscreen.
        	
            var x = this.active_projectile.body.GetPosition().x * m3.config.scaling_factor;
                settled = false;
                
            //This ensures the world is settled for half a second before transitioning
            if (m3.world.allSettled(0.5)) {
            	if(this.old_time === null) this.old_time = this.state_time;
            	else if(this.state_time > this.old_time + 0.5) settled = true;
            } else {
            	this.old_time = null;
            }
            
            var transition = settled ||
                             this.state_time > m3.config.max_turn_time ||
                             x < 0 || x > m3.config.level_width;
            
            if (transition) {
                m3.camera.stopFollowing();
                this.active_projectile.destroy();
                this.active_projectile = null;
                
                var camera_position = (this.active_player === 0) ? m3.config.level_width - m3.game.width : 0;
                m3.camera.slideTo(camera_position, 0, "smooth");
                this.active_player = (this.active_player + 1) % 2;
                this.setState("transitioning");
            }
        };
        
        // This is the update function for the transitioning state.
        PlayState.updateTransitioning = function() {
            // We're done transitioning when the camera is done sliding.
            if (!m3.camera.sliding) {
                this.setState("waiting");
            }
        };
        
        // This is the update function for the done state.
        PlayState.updateDone = function() {
            // Nothing yet.
        };
        
        // Causes the round to end
        PlayState.endRound = function(winner) {
            this.winner = winner;
            this.setState("done");
        };
        
        // This is the main update function which mostly just calls other update functions.
        PlayState.update = function() {
            this.state_time += m3.game.elapsed;
            
            // Update the state itself.
            switch (this.game_state) {
                case ("starting"):
                    this.updateStarting(); break;
                case ("waiting"):
                    this.updateWaiting(); break;
                case ("attacking"):
                    this.updateAttacking(); break;
                case ("transitioning"):
                    this.updateTransitioning(); break;
                case ("done"):
                    this.updateDone(); break;
                default:
                    m3.util.log("Play state has entered an invalid state!");
            }
            
            // Update modules.
            m3.camera.update();
            this.level.update();
            m3.world.update();
            m3.launcher.update();
            
            if (this.active_projectile) {
                this.active_projectile.update();
            }
            
            m3.ui.update();
        };
        
        // "Constructor".
        PlayState.create = function() {
            var s = Object.create(this);
            m3.sound.changeMusic(m3.assets.music.rideTheLightning, true);
            m3.score.reset();
            m3.world.clear();
            m3.world.init();
            
            s.level         = m3.types.Level.create();
            s.active_player = m3.math.randomInteger(0, 1);
            
            // If the second player is starting, we need to warp the camera to their side.
            if (s.active_player === 1) {
                m3.camera.warp(m3.config.level_width - m3.game.width, 0);
            }
            else {
                m3.camera.warp(0, 0);
            }
            
            return s;
        };
        
        return PlayState;
    }();
});
