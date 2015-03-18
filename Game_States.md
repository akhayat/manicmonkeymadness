
---


The game states are where the game's logic goes. The constructors for all the states are placed into the `m3.states` object, and the instance of the current state is stored in `m3.game.state`. When you want to transition from one state to another (say, to the Play State), set `m3.game.state` to a new instance of the state you want, as in: `m3.game.state = m3.states.PlayState.create();`.

The actual logic goes into each state's `update` function. The main game loop is set to call the current state's `update` function every frame.

The states are stored in their own files in the scripts/states directory.

# Main Menu State #

This is the initial state of the game when the page is first loaded. It needs to display our splash image and menu options and read input from the player. Currently it just fills in the background and draws the name of the game.

# Play State #

This will be the main state of the game, which is active when the player is actual playing the game. Currently it does nothing.

# Edit Level State #

TODO: Jarod needs to document this