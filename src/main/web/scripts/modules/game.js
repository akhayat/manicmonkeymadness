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
        var lastTime = new Date().getTime();
        
        return {
            // Canvas element and context.
            canvas:  document.getElementById("game_canvas"),
            context: document.getElementById("game_canvas").getContext("2d"),
            
            // Dimensions of the game.
            height: $("#game").height(),
            width:  $("#game").width(),
            
            // Offsets of the canvas element.
            x: $("#game").offset().left,
            y: $("#game").offset().top,
            
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
                var canvas = m3.game.canvas;
                
                m3.game.state = m3.states.MainMenuState.create();
                
                document.onkeydown   = m3.input.processKeyDown;
                document.onkeyup     = m3.input.processKeyUp;
                canvas.onmousedown   = m3.input.processMouseDown;
                document.onmouseup   = m3.input.processMouseUp;
                document.onmousemove = m3.input.processMouseMove;
                
                $("#fort_output .done_link a").click(function(event) {
                    event.preventDefault();
                    $("#fort_output").fadeOut(200);
                    $(".fade").fadeOut(200);
                });
                
                $("#fort_select .done_link a").click(function(event) {
                    event.preventDefault();
                    $("#fort_select").fadeOut(200);
                    $("#game_select").fadeIn(180);
                    
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
                
                $("#game_select .game_lms .lms").click(function(event) {
                	event.preventDefault();
                    $("#game_select").fadeOut(200);
                    $(".fade").fadeOut(200);
                    m3.game_choices.setGameLength(0);
                    m3.game_choices.setGameMode("last monkey standing");
                    m3.game.state = m3.states.PlayState.create();
                });
                
                $("#game_select .game_dd .dd3").click(function(event) {
                	event.preventDefault();
                    $("#game_select").fadeOut(200);
                    $(".fade").fadeOut(200);
                    m3.game_choices.setGameLength(3);
                    m3.game_choices.setGameMode("demolition derby");
                    m3.game.state = m3.states.PlayState.create();
                });
                
                $("#game_select .game_dd .dd5").click(function(event) {
                	event.preventDefault();
                    $("#game_select").fadeOut(200);
                    $(".fade").fadeOut(200);
                    m3.game_choices.setGameLength(5);
                    m3.game_choices.setGameMode("demolition derby");
                    m3.game.state = m3.states.PlayState.create();
                });
                
                $("#game_select .game_dd .dd10").click(function(event) {
                	event.preventDefault();
                    $("#game_select").fadeOut(200);
                    $(".fade").fadeOut(200);
                    m3.game_choices.setGameLength(10);
                    m3.game_choices.setGameMode("demolition derby");
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
            }
        };
    }();
});
