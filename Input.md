# Introduction #

The input module handles basic mouse and keyboard input and allows the developer to specify input handling cleanly. The implementation of the input module can be found in modules/input.js.


# Keyboard Handling #

There are two methods of handling user input.

## Method 1 ##

A game state may optionally implement an object called `keyHandlers`. This object should consist of other objects whose names correspond to the name of a keyboard button, and who implement a `down` function, an `up` function, or both. A simple example of a `keyHandlers` object could be:

```
m3.game.states.PlayState.prototype.keyHandlers = {
    A: {
        down: function() {
            m3.util.log("Pressed A!");
        },
        
        up: function() {
            m3.util.log("Released A!");
        },
    },
};
```

In this case, a message will be logged to the console whenever the player presses or releases the A key. The keys that you can use are listed as properties of the input module inside modules/input.js, which should include essentially all the keys on a normal keyboard.

Note that the `down` function of a given key will only be executed once for each time the key is pressed, as opposed to the "default" behavior of repeating the keypress many times while the key is held down.

If a state doesn't need to handle keyboard input, it doesn't have to implement `keyHandlers`. Additionally, each key doesn't need to implement both `up` and `down`, it can implement just one of the two if that's all it needs.

## Method 2 ##

The input module also contains an object called keys, which contains boolean values for each of the keys on the keyboard. The value of a given key will be true while the key is being held down and false otherwise. An example:

```
if (m3.input.keys.ENTER) {
    // Do something while enter is held down
}
```

Note that this differs from the previous method in that it will always be true while the key is held down, not just the first time the key is pressed.

# Mouse handling #

Mouse handling is very similar to keyboard handling. A state may choose to implement a `mouseHandlers` object, which implements `down`, `up`, or both for mouse button handling, and `move` for mouse movement. An example:

```
m3.game.states.PlayState.prototype.mouseHandlers = {
    down: function(event) {
        m3.launcher.prepareLaunch(event);
    },
    
    up: function(event) {
        m3.launcher.launch(event);
    },
    
    move: function(event) {
        m3.launcher.aim(event);
    },
};
```

You may use the `event` parameter to get information on the mouse event, such as where the player clicked or released. Info on what information you can access from the event parameter can be seen [here](http://docs.sun.com/source/816-6408-10/handlers.htm#1120635).

Currently only the mouseup, mousedown, and mousemove events are being handled, but support for other mouse events can be added as needed.