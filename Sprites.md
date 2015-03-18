
---


## Introduction ##

Sprites allow you to create animated images using a _sprite sheet_ -- a single image that contains all of the frames of an animation. Here is an example of simple sprite sheet:

<p align='center'>
<img src='http://manicmonkeymadness.googlecode.com/svn/trunk/war/images/sprites/monkey_helmet.png' />
</p>

This sprite sheet has eight frames.  Frames are indexed from left to right, top to bottom starting at zero.  Our sheet has one row and eight columns, so our frame indices are:

| 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 |
|:--|:--|:--|:--|:--|:--|:--|:--|

The number of rows and columns is arbitrary (as long as you can define the proper number of frames), so we could have built the sheet differently.  Here are some other options:

| 0 | 1 | 2 | 3 |
|:--|:--|:--|:--|
| 4 | 5 | 6 | 7 |

| 0 | 1 |
|:--|:--|
| 2 | 3 |
| 4 | 5 |
| 6 | 7 |

Other examples of sprites in M3 include the following:

<p align='center'>
<img src='http://manicmonkeymadness.googlecode.com/svn/trunk/war/images/sprites/monkey_spike.png' />
</p>

<p align='center'>
<img src='http://manicmonkeymadness.googlecode.com/svn/trunk/war/images/sprites/watermelon_explode.png' />
</p>

## Sprite sheet requirements ##

It is important to note that each "cell" in the sprite sheet must be exactly the same width and height. For example, the dimensions of the first example sprite sheet are 400 x 55. Since there are 8 frames in one row, we know the dimensions of each frame are 50 x 55.

PNG format is preferred.

## Usage ##

You can create a sprite with its constructor: `m3.types.Sprite.create(sheet, height, width, x, y)`. Of these parameters, only `x` and `y` are optional. `sheet` is a reference to the image that is the sprite sheet itself. `height` and `width` are the dimensions of each frame, NOT the sprite sheet. `x` and `y` are coordinates where the sprite will be drawn.

An example that uses the monkey sprite from above could be (assuming the sprite sheet image has been loaded into the assets module under `sprites.monkey`):

```
var sprite = m3.types.Sprite.create(m3.assets.sprites.monkey, 50, 55, 600, 400);
```

Once you create a sprite, you can start creating animations with `addAnimation`, like this:

```
sprite.addAnimation("idle", [0,0,0,0,1,0,0,0,0,1,0,0,1,0,0,0,2,2,3,3,2,2,3,3,2,2,0,0], 0.12);
sprite.addAnimation("death", [4,4,5,6,7], 0.25);
```

This creates two animations for the sprite, named "idle" and "death".  The former loops through the frames at a rate of one frame per 0.12 seconds; the second at one frame per 0.25 seconds. When idle, the monkey occasionally looks left and right, and sometimes looks forward wide-eyed and sometimes looks forward naturally.

Finally, you need to actually play the animation, which you can do by calling `play` with the animation id:

```
sprite.play("idle");
```

When you have multiple animations, you can switch them at any time by just calling `play` again with the animation id of the new animation you want to play.

If you need to stop a sprite from playing completely, you can call `stop(new_frame)`. The `new_frame` parameter is optional. If you leave it out, the sprite will stop at the frame it's currently playing. Otherwise it will skip to whatever frame you pass in and wait.

Lastly, in order to actually animate and render the sprite, you'll just need to call its `update` function every frame.

## Single-frame Sprites ##

It is not uncommon to have a sprite with only a single frame, such as rocks, petrified wood, and other objects that do not blow apart or get squished.  These are normally just placed in the canvas as simple images, subject to transformations such as rotations, translations, and scalings.  No sheet is necessary.

Examples of M3 single-frame sprites are:

<p align='center'>
<img src='http://manicmonkeymadness.googlecode.com/svn/trunk/war/images/sprites/cannon.png' />
<img src='http://manicmonkeymadness.googlecode.com/svn/trunk/war/images/sprites/rock.png' />
<img src='http://manicmonkeymadness.googlecode.com/svn/trunk/war/images/sprites/banana.png' />
<img src='http://manicmonkeymadness.googlecode.com/svn/trunk/war/images/sprites/banana_green.png' />
<img src='http://manicmonkeymadness.googlecode.com/svn/trunk/war/images/sprites/banana_bunch.png' />
<img src='http://manicmonkeymadness.googlecode.com/svn/trunk/war/images/sprites/triangle_wood.png' />
<img src='http://manicmonkeymadness.googlecode.com/svn/trunk/war/images/sprites/box_long_wood.png' />
<img src='http://manicmonkeymadness.googlecode.com/svn/trunk/war/images/sprites/box_long_wood_damaged.png' />
<img src='http://manicmonkeymadness.googlecode.com/svn/trunk/war/images/sprites/box_long_wood_destroyed.png' />
<img src='http://manicmonkeymadness.googlecode.com/svn/trunk/war/images/sprites/box_short_wood.png' />
<img src='http://manicmonkeymadness.googlecode.com/svn/trunk/war/images/sprites/box_square_wood.png' />
<img src='http://manicmonkeymadness.googlecode.com/svn/trunk/war/images/sprites/box_wide_wood.png' />
<img src='http://manicmonkeymadness.googlecode.com/svn/trunk/war/images/sprites/box_long_rock.png' />
<img src='http://manicmonkeymadness.googlecode.com/svn/trunk/war/images/sprites/box_wide_rock.png' />
<img src='http://manicmonkeymadness.googlecode.com/svn/trunk/war/images/sprites/box_short_rock.png' />
<img src='http://manicmonkeymadness.googlecode.com/svn/trunk/war/images/sprites/box_square_rock.png' />
<img src='http://manicmonkeymadness.googlecode.com/svn/trunk/war/images/sprites/triangle_rock.png' />
</p>