/**
 * game.js
 * 
 * This module stores common objects and fundamental data such as the
 * canvas element, the level dimensions, etc.
 * 
 */

$(function() {
    /**
     * The game object contains common objects such as the canvas.
     */
    m3.game = function() {
        var lastTime = new Date().getTime(),
            jGame = $('#game');
        
        return {
            // Canvas element and context.
            canvas:  document.getElementById("game_canvas"),
            context: document.getElementById("game_canvas").getContext("2d"),
            
            // Dimensions of the game.
            height: jGame.height(),
            width:  jGame.width(),
            
            // Offsets of the canvas element.
            x: jGame.offset().left,
            y: jGame.offset().top,
            
            // The time in seconds elapsed since the last frame.
            elapsed: 0.0,
            
            /**
             * Update the game timer.
             */
            updateTime: function() {
                var thisTime = new Date().getTime();
                this.elapsed  = (thisTime - lastTime) / 1000.0;
                lastTime = thisTime;
            },
            
            /**
             * Initialize the game.
             */
            init: function() {
                var canvas = m3.game.canvas,
                	lightbox = $('#lightbox'),
                	game_select = $('#game_select');
                
                // Create the main menu
                m3.game.state = m3.states.MainMenuState.create();
                
                // Put in the premade forts                
                $("#premade_fort_choices").html(function() {
                    var forts   = m3.fort_choices.premade,
                        choices = "";
                    
                    for (var i = 0, n = forts.length; i < n; i++) {
                        choices += '<input type="button" class="premade_fort" id="fort"' + i + '" value="' + forts[i].id + '" data-index="' + i + '" />';
                    }
                    
                    return choices;
                });
                
                // Setup event handlers
                document.onkeydown   = m3.input.processKeyDown;
                document.onkeyup     = m3.input.processKeyUp;
                canvas.onmousedown   = m3.input.processMouseDown;
                document.onmouseup   = m3.input.processMouseUp;
                document.onmousemove = m3.input.processMouseMove;
                
                $('#sound').click(function(event) {
                	event.preventDefault();
                	m3.sound.toggleSound();
                });
                
                $('#music').click(function(event) {
                	event.preventDefault();
                	m3.sound.toggleMusic();
                });
                
                $("#help, #help_link").click(function(event) {
                	event.preventDefault();
    			    $('#help_screen').fadeIn(200);
    			    lightbox.fadeIn(200);
                });
                
                $(".close").click(function(event) {
                	event.preventDefault();
                	$(this).parent().fadeOut(200);
                    lightbox.fadeOut(200);
                });
                
                $('#buttons').fadeIn();

                $("#lms").click(function(event) {
                	event.preventDefault();
                	game_select.fadeOut(200);
                	$('#fort_select').fadeIn(200);
                    m3.game_choices.setGameLength(0);
                    m3.game_choices.setGameMode("last_monkey_standing");
                });
                
                $("#dd3").click(function(event) {
                	event.preventDefault();
                	game_select.fadeOut(200);
                	$('#fort_select').fadeIn(200);
                    m3.game_choices.setGameLength(3);
                    m3.game_choices.setGameMode("demolition_derby_3");
                });
                
                $("#dd5").click(function(event) {
                	event.preventDefault();
                	game_select.fadeOut(200);
                	$('#fort_select').fadeIn(200);
                    m3.game_choices.setGameLength(5);
                    m3.game_choices.setGameMode("demolition_derby_5");
                });
                
                $("#dd10").click(function(event) {
                	event.preventDefault();
                	game_select.fadeOut(200);
                	$('#fort_select').fadeIn(200);
                    m3.game_choices.setGameLength(10);
                    m3.game_choices.setGameMode("demolition_derby_10");
                });
                
                $("#custom_fort").click(function(event) {
                    event.preventDefault();
                    $("#fort_select").fadeOut(200);
                    $("#lightbox").fadeOut(200);
                    
                    m3.game.state = m3.states.EditLevelState.create();
                });
                
                $(".premade_fort").click(function(event) {
                    event.preventDefault();
                    $("#fort_select").fadeOut(200);
                    $("#lightbox").fadeOut(200);
                    
                    m3.fort_choices.setFortChoice(0, "premade", parseInt($(this).attr("data-index")));
                    m3.fort_choices.setFortChoice(1, "premade", parseInt($(this).attr("data-index")));
                    
                    m3.game.state = m3.states.PlayState.create();
                });
                
                $("#high_score_submit").click(function(event) {
                    event.preventDefault();
                	m3.score.saveHighScore();
                });
                
                $("#high_score_link").click(function(event) {
                    event.preventDefault();
                	m3.score.getHighScores();
                });
            }
        };
    }();
});
