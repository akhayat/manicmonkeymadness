
---


# M3 Modules #

The major components of the game are broken up into various _modules_ and _types_.  Of course, in JavaScript, we represent both as objects, often built with closures.

All modules are JavaScript objects that are contained in the global `m3` object. Each module contains whatever data and functions it needs to run, and is managed as needed by the game states. Modules are singleton objects that are instantiated at the beginning of the program, as opposed to types, which may have more than one instance and can be instantiated at any time.

## Config ##

This module contains data that is used to configure the game itself.  It contains data in JSON format, with properties such as:

```
            fps: 45,
            level_height: 450,
            level_width:  2800,
            level_padding: 25,
            max_enemies: 8,
            fort_points: 1000,
            fort_width: 640,
            fort_platform_height: 75,
            ground_height: 30,
            camera_scroll_speed: 1000,
            max_turn_time: 20.0,
            scaling_factor: 20,
            velocity_iterations: 10,
            position_iterations: 10,
            damage_factor: 70,
            grabber_radius: 9.0,
            rotation_speed: 2.5
```

## Util ##

This module contains utility functions. Currently it just contains a function to log text to the console beneath the game.

## Input ##

See [Input](Input.md).

## Camera ##

The camera module contains methods to manipulate the game's viewport. To use it in a state, all you need to do is call `m3.camera.update` inside the state's update function. You can then use all of the module's functions. `move` will move the viewport by the given amount, `warp` will instantly teleport the camera to the given location, and `slideTo` will cause the camera to slide to the specified location at the specified speed.

`slideTo` can be given a transition type, which determines how the camera will move. Currently, you can pass in either `linear`, which transitions at a constant rate, or `smooth`, which starts off quick and then slows down so that it looks smoother.

## Assets ##

This is a special module that contains all of the game assets. The purpose of the module is to load all the assets before the game starts so that the game doesn't try to run with partially downloaded assets. Currently the assets are broken into several nested objects for organization.

## Score ##

This module manages the scoring system. For now it just holds the actual score numbers for both players, but eventually it'll probably have stuff like the point values for various actions, saving of high scores, and possibly more.

## World ##

## Launcher ##

## UI ##

See [User\_Interface](User_Interface.md).

## Math ##

This module contains utility functions for math-related things. Currently it just has a utility function to clamp a number within a given range.

# M3 Types #

Types differ from modules in that they have constructors which we use to create instances of that type, whereas modules are singleton objects which are created at load time. The constructors for all the types are placed into the `m3.types` object, so an example of instantiating a Vector could be `var v = m3.types.Vector.create(0, 1);`.

The types are stored in their own files in the scripts/types directory.

## Vector ##

This is a simple type representing a generic vector. It can be used for a variety of purposes. For example, the velocity of an object in 2D space can be modeled as a vector.

The type also contains several useful operations for vectors, such as normalization and finding a vector's length.

## Sprite ##

See [Sprites](Sprites.md).

## Level ##

This object manages the game's level -- things like the fortresses, physics objects, etc. Right now it just draws the level's multi-layered background to the screen using the nifty parallax scrolling technique.

## Physics Object ##

## Weapon ##

## Projectile ##

## Fortress ##

## Fort Piece ##

## Enemy ##