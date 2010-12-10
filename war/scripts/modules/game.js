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
                
                m3.game.state = m3.states.MainMenuState.create();
                
                $('#buttons').fadeIn();
                
                document.onkeydown   = m3.input.processKeyDown;
                document.onkeyup     = m3.input.processKeyUp;
                canvas.onmousedown   = m3.input.processMouseDown;
                document.onmouseup   = m3.input.processMouseUp;
                document.onmousemove = m3.input.processMouseMove;
                
                $("#help_screen .close").click(function(event) {
                	event.preventDefault();
                	$("#help_screen").fadeOut(200);
                    lightbox.fadeOut(200);
                });
                
                $("#high_scores .close").click(function(event) {
                	event.preventDefault();
                	$("#high_scores").fadeOut(200);
                    lightbox.fadeOut(200);
                });
                
                $("#new_high_score .close").click(function(event) {
                	event.preventDefault();
                	$("#new_high_score").fadeOut(200);
                    lightbox.fadeOut(200);
                });
                
                $("#fort_output .done a").click(function(event) {
                    event.preventDefault();
                    $("#fort_output").fadeOut(200);
                    lightbox.fadeOut(200);
                });
                
                $("#fort_select .done a").click(function(event) {
                    event.preventDefault();
                    $("#fort_select").fadeOut(200);
                    game_select.fadeIn(180);
                    
                    var choice = $("#fort_select input:checked");
                    
                    if (choice.attr("id") === "custom_fort_choice") {
                        m3.fort_choices.setFortChoice(0, "custom", $("#fort_select textarea").val());
                        m3.fort_choices.setFortChoice(1, "custom", $("#fort_select textarea").val());
                    }
                    else {
                        m3.fort_choices.setFortChoice(0, "premade", parseInt(choice.attr("data-index")));
                        m3.fort_choices.setFortChoice(1, "premade", parseInt(choice.attr("data-index")));
                    }                    
                });
                
                $("#lms").click(function(event) {
                	event.preventDefault();
                	game_select.fadeOut(200);
                    lightbox.fadeOut(200);
                    m3.game_choices.setGameLength(0);
                    m3.game_choices.setGameMode("last_monkey_standing");
                    m3.game.state = m3.states.PlayState.create();
                });
                
                $("#dd3").click(function(event) {
                	event.preventDefault();
                	game_select.fadeOut(200);
                    lightbox.fadeOut(200);
                    m3.game_choices.setGameLength(3);
                    m3.game_choices.setGameMode("demolition_derby_3");
                    m3.game.state = m3.states.PlayState.create();
                });
                
                $("#dd5").click(function(event) {
                	event.preventDefault();
                	game_select.fadeOut(200);
                	lightbox.fadeOut(200);
                    m3.game_choices.setGameLength(5);
                    m3.game_choices.setGameMode("demolition_derby_5");
                    m3.game.state = m3.states.PlayState.create();
                });
                
                $("#dd10").click(function(event) {
                	event.preventDefault();
                	game_select.fadeOut(200);
                	lightbox.fadeOut(200);
                    m3.game_choices.setGameLength(10);
                    m3.game_choices.setGameMode("demolition_derby_10");
                    m3.game.state = m3.states.PlayState.create();
                });
                
                $("#premade_fort_choices").html(function() {
                    var forts   = m3.fort_choices.premade,
                        choices = "";
                    
                    for (var i = 0, n = forts.length; i < n; i++) {
                        choices += "<label for='choice_" + i + "'>";
                        choices += "<input type='radio' name='fort_choices' id='choice_" + i + "' data-index='" + i + "' /> ";
                        choices +=  forts[i].id + "</label><br />";
                    }
                    
                    return choices;
                });
                
                $("#fort_select input[type=\"radio\"]").change(function(event) {
                    if ($("#custom_fort_choice").is(":checked")) {
                        $("#fort_select textarea").removeAttr("disabled");
                    }
                    else {
                        $("#fort_select textarea").attr("disabled", "disabled");
                    }
                });
                
                $("#help, #help_link").click(function() {
    			    $('#help_screen').fadeIn(200);
    			    lightbox.fadeIn(200);
                });
            }
        };
    }();
});
