
---


During the first week of class, we picked a project and sketched out rough requirements.  As development unfolded, and feedback came in, we filled in our detailed requirements.

# Rough Requirements #

  1. M3 shall run as an application on a web page, inside a `<canvas>` element.
  1. The game shall run on Firefox, Chrome, Opera, and Safari.  It need not run on IE or mobile browsers.
  1. The top level subsystems, or modules, shall include:
    * Domain objects: player, fortress, monkey, projectile, launcher, etc.
    * Physics: collision detection, trajectory computation
    * Graphics: sprites, background, animation engine
    * Sound: native HTML5 `<audio>` element
    * Game logic: turn taking, scoring
    * Persistence: database to track high scores
    * Service layer: to interact with the database

# Detailed Requirements #

## General ##

  1. The game shall be deployed to Google App Engine at `manicmonkeymadness.appspot.com`
  1. The game shall consist of a single page containing
    * A canvas which scrolls horizontally
    * A link to the main project page
    * A link to view the current high scores
    * A link to show help as an overlay div
  1. Communication with the server shall use the Ajax methodology
  1. The game shall begin with configuration options
    * Fort Selection: choose from some premade forts or create a custom fort with the level editor.
    * Game Mode: players can choose from two game modes:
      * Last Monkey Standing: The person to elimate all their opponents monkeys wins.
      * Demolition Derby: Each player gets the same determined amount of shots and the highest score wins.
  1. The game shall be turn-based
  1. During each turn:
    * The current player may select a weapon
    * The current player configures the launcher and fires a projectile
    * The projectile shall be animated and the canvas shall scroll to keep the projectile visible
    * Projectiles flying in the world above the viewport shall be tracked with some indicator that makes sense to a reasonable human player
    * Collisions, if any, shall be tracked and animated, with the corresponding updates applied to the object world.
    * The current player's score (and the corresponding display) is updated as the physics computations are running
    * The turn shall be deemed to have ended according to the following:
      * If in Last Monkey Standing Mode, all of the opposing monkeys have been destroyed
      * In Demolotion Derby Mode, the full number of turns have been taken by each player
  1. At the end of each turn, the game shall determine if the current player has won
    1. If so, the game will indicate the winning player
    1. If not, the other player will become the current player
  1. At the end of the game, the winner's score is checked against the persistent high scores list.
    * If the new score would be one of the top ten high scores for the given game type, the player is offered a change to submit his or her name (and score) to the server to be recorded.

## Display ##

  * The canvas shall be horizontally scrollable
  * The background scroll shall use parallax or similar effect
  * The number of turns taken by each player shall be visible
  * If in Demolition Derby Mode, the number of total turns shall be visible
  * The number of remaining monkeys per player may be tracked
  * Icons for toggling sound, toggling music, and accessing help shall be prominent

## Sound ##

  * Sound effects shall use HTML5 audio, no Flash
  * Music shall be of original composition only

## Fort Editor ##

  * TODO

# Non-Functional Requirements #

  1. People with a little bit of experience with games shall be able to just start playing
  1. The help text shall be written in decent English, without too many spelling and grammar mistakes
  1. The game shall not crash the hosting browser
  1. The game shall make people laugh when they see that monkeys can be shot out of cannons