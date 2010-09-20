/**
 * input.js
 * 
 * This file contains the architecture for mouse and keyboard input. It has
 * a big ol' dictonary for essentially all of the keys on the keyboard, and
 * keeps track of whether any of those keys are held down or not.
 *
 * It will call out to the current state's keyHandler and mouseHandler objects
 * based on which key was pressed.
 * 
 */

$(document).ready(function() {
    m3.input = function() {
        return {
            8:  "BACKSPACE",
            13: "ENTER",
            16: "SHIFT",
            17: "CTRL",
            18: "ALT",
            27: "ESCAPE",
            32: "SPACE",
            
            37: "LEFT",
            38: "UP",
            39: "RIGHT",
            40: "DOWN",
            
            48: "ZERO",
            49: "ONE",
            50: "TWO",
            51: "THREE",
            52: "FOUR",
            53: "FIVE",
            54: "SIX",
            55: "SEVEN",
            56: "EIGHT",
            57: "NINE",
            
            65: "A",
            66: "B",
            67: "C",
            68: "D",
            69: "E",
            70: "F",
            71: "G",
            72: "H",
            73: "I",
            74: "J",
            75: "K",
            76: "L",
            77: "M",
            78: "N",
            79: "O",
            80: "P",
            81: "Q",
            82: "R",
            83: "S",
            84: "T",
            85: "U",
            86: "V",
            87: "W",
            88: "X",
            89: "Y",
            90: "Z",
            
            91:  "COMMAND",
            186: "SEMICOLON",
            187: "PLUS",
            188: "COMMA",
            189: "MINUS",
            190: "PERIOD",
            191: "FORWARDSLASH",
            192: "TILDE",
            219: "LEFT_BRACKET",
            220: "BACKSLASH",
            221: "RIGHT_BRACKET",
            222: "QUOTE",
            
            keys: {}
        };
    }();
    
    m3.input.processKeyDown = function(event) {
        // event.preventDefault();
        
        var key = m3.input[event.which];
        
        if (!m3.input.keys[key]) {
            m3.input.keys[key] = true;
            
            if (m3.game.state.keyHandlers && m3.game.state.keyHandlers[key] && m3.game.state.keyHandlers[key].down)
                m3.game.state.keyHandlers[key].down();
        }
    };
    
    m3.input.processKeyUp = function(event) {
        // event.preventDefault();
        
        var key = m3.input[event.which];
        
        m3.input.keys[key] = false;
        
        if (m3.game.state.keyHandlers && m3.game.state.keyHandlers[key] && m3.game.state.keyHandlers[key].up)
            m3.game.state.keyHandlers[key].up();
    };
    
    m3.input.processMouseDown = function(event) {
        if (m3.game.state.mouseHandlers && m3.game.state.mouseHandlers.down)
            m3.game.state.mouseHandlers.down(event);
    };
    
    m3.input.processMouseUp = function(event) {
        if (m3.game.state.mouseHandlers && m3.game.state.mouseHandlers.up)
            m3.game.state.mouseHandlers.up(event);
    };
});
