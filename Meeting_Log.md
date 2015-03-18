
---


## August 31 ##
  * Reviewed course [syllabus](http://www.cs.lmu.edu/~ray/classes/se/syllabus/).
  * Brief look at the [Agile Manifesto](http://agilemanifesto.org/).
  * Introduced textbook _[Code Complete](http://www.cc2e.com/)_.
  * Discussed project ideas.
  * Short tour of [Chrome Experiments](http://chromeexperiments.com).
  * Possible projects based on: [Red Remover](http://www.addictinggames.com/redremover.html), [Angry Birds](http://www.rovio.com/index.php?page=angry-birds), and [Crush the Castle](http://www.addictinggames.com/crushthecastle.html).
  * Watched Dan Pink's video on intrinsic motivation from Jeff Atwood's [Coding Horror](http://www.codinghorror.com/blog/) website.
  * **Homework**: Find out what a _standup_ is, and how they should be conducted.

## September 2 ##
  * Reviewed course notes on [computing](http://www.cs.lmu.edu/~ray/notes/computing/).
  * Long discussion on possible projects, with help from Dr. Dionisio.
  * Decided on game type: strategic, physics-based game, monkeys.
  * Discussed possible game names.

## September 7 ##
  * Figured out how to sign up and create a project in Google Code.
  * Decided on a name for the game and created the summary.
  * Created Google Code project for Manic Monkey Madness (m3).
  * Determined that naming was difficult.
  * Quick peek at [Serengeti](http://code.google.com/p/playserengeti/) project for what to expect.
  * **Homework**: Tour the playserengeti wiki.

## September 9 ##
  * Began requirements analysis for manicmonkeymadness.
  * Produced high-level requirements.
  * Discussed possible strategies for iterative design and construction.
  * Discussed layered architectures: clients, web servers, backend service layers.
  * Covered XML and JSON.
  * All students set up their workstations with subversion plugins for their IDEs, checked out the project from Google Code, and performed checkins.
  * **Homework**: get familiar with canvas.

## September 14 ##
  * Standup
    * Discussed Canvas tutorials that were studied over the weekend
    * Looked at one JavaScript physics engine
  * Assigned tasks for next class
    * Creation of background images and sprites (Matt)
    * Monkey sprite initial animation (David)
    * Launcher structure and behavior with good UI techniques (Anthony)
    * Physics engine research and rough fortress collapse demo (Matt and Jarod)
  * **Lecture**: JavaScript objects, constructors, prototypes, information hiding, and anonymous functions.

## September 16 ##
  * Standup
    * Tasks completed: basic architecture, game and menu states, console with logging, rudimentary UI for slingshot launcher, initial background.
    * Tasks planned for next class: physics engine demo, launcher "class", bouncing monkey on game canvas, mostly-functional menu.
  * Sketched some ideas for a variety of monkey launchers (slingshots, canons, teeter-totters)
  * Decided on a virtual canvas size of 2000 x 450, with 900 x 450 visible.
  * Discussion on module structure for the project: should all modules follow the anonymous function call pattern, even when there is no private state?  Tradeoff is between consistency and performance.  Since the functions would be called only once, performance is a non-issue.
  * Reminded students to actively use the wiki.  All ideas, all background research, all problems, all decisions, etc. need to be documented.

## September 21 ##
  * Standup
    * Tasks completed: Virtual canvas size with scrolling, input module, simple monkey sprite, basic fortress components with small falling ball with collision demo, cannon sprite.
    * Tasks planned: Monkey sprite sheet, cannon animation, cannon interactivity using input module, more research on physics libraries (possible fortress collapse?), framework for levels.
  * Decided to wait on world-coordinate system.
  * Talked about the Twitter JavaScript injection exploit.
  * Brief side discussions, including ECMAScript 5 objects (with a look at John Resig's overview).

## September 23 ##
  * Standup
    * Tasks completed: Background image, monkey spritesheet, movable cannon.
    * Tasks planned: Physics implemented, begin projectile and fortress functionality.
  * **Lecture and Discussion**: Ben Cherry's [Javascript: Better and Faster](http://www.bcherry.net/talks/js-better-faster) slides.
  * **Lecture and Discussion**: Nicholas Zakas' [Writing Efficient Javascript](http://www.slideshare.net/nzakas/writing-efficient-javascript) slides.

## September 28 ##
  * Standup
    * Tasks completed: Improved monkey sprite sheet, primitive demo of objects bouncing off of other objects, score objects and associated graphics, bugfix for Firefox rendering problem.
    * Tasks planned: Ground positioning bugfix, data structures and game logic for two players, more realistic use of physics engine, integrate new port of box2d.
  * Brief look at [JSLint](http://jslint.org).
  * Overview of [Douglas Crockford's JavaScript pages](http://www.crockford.com/javascript/).
  * Advice to check out Crockford's Good Parts book and videos.

## September 30 ##
  * Standup
    * Second player's cannon and turn logic added
    * Physical objects now fly from the cannon when fired
  * Lab session: Worked on fixing cannon rotation bug

## October 5 ##
  * Standup
    * Camera follow has been implemented
    * Sprites with arbitrary bitmaps implemented, rocks and bananas now flying
    * Interesting structures with realistic collapse now implemented
    * Progress with bug fixes, including mouse event transitions
  * Discussion about mouse events, and how click events are queued
  * Discussion of different levels (DOM 1 and DOM 2) event handling
  * **Lecture**: jQuery
  * Advice to check out [Eich's video lecture](http://brendaneich.com/2010/07/a-brief-history-of-javascript/) on the history of JavaScript

## October 7 ##
  * Standup
    * Fortress object implemented
    * Textures and physical properties now exist for fortress pieces. The first texture implemented is wood.  Setting the properties are set programmatically; in the future these should come from a level editor
    * The launcher UI has been improved (angle clamping, fine tuning via keyboard, scroll disable during aiming)
    * Monkeys-as-physical objects still in progress
  * Discussion with Prof. Dionisio on progess and UI things to consider
  * Reminded class to use the issue tracker
  * Identified highest priority activities: scores, turn taking through physical settling as opposed to absolute time, monkeys as objects
  * User feedback also identified treasure as being somewhat important

## October 12 ##
  * Standup
    * Completed:
      * Contact listener, taking into account materials, projectiles, impact velocity, damage computation, etc.
      * Scoring -- points awarded for damage, etc.
      * Better internal implementation of pieces (and the fortress they belong to), and callbacks.
      * Monkeys are now physical objects
      * Added new class of monkeys -- the watermelon monkeys, which are harder to destroy
      * Settling computation to determine end of turn
  * Next up:
    * Tweaking physics properties to improve the feel of the game
    * Making the cannon a physics object (so objects can bounce off)
    * Level termination condition
    * Different fortress materials
    * Refactor projectiles to remove hardcoded properties and make them true properties
  * Might want to investigate the game Worms to get other ideas on implementing turn-based games with multiple launchers
  * Long term (nice to have):
    * Textured ground
  * For discussion:
    * Lookup table for damage computation (idea from Dondi)
    * The game is slowing down on Firefox.  This is being worked on!
  * Discussion on frame rates

## October 14 ##
  * Standup:
    * Completed
      * Turn ending at all objects settling, projectiles as individual objects, current weapon in UI, stone fortress piece.
    * Next up:
      * We are now using the issue tracker in Google Code for these.  Students added new issues during class as they were discussed.
  * Group discussions on project scope, progress, and priorities for upcoming tasks.
  * Brief look at article on the [Physics of Angry Birds](http://www.wired.com/wiredscience/2010/10/physics-of-angry-birds/)
  * **Lecture**: QUnit -- the JavaScript Unit Testing Framework

## October 19 ##
  * Standup
    * Completed
      * Alex created a new cannon, new banana, and a collection of demo monkey sprites
      * Progress on switching from launcher module to launcher "type" (pending commit)
      * Win condition
      * Monkeys and fortress pieces destroyed when knocked off screen
    * Next up:
      * Bug fixes
  * Bugs identified:
    * Camera follows projectile, making damage animation occur off screen
    * Rendering problem occurs sometimes
    * Projectiles don't hurt the monkeys. The effect is hilarious as hitting monkeys can make them fly hundreds of meters through the air.... but it isn't realistic.
    * We'd like the cannon wheels stationary
  * Also had a class-long brainstorming session for project next steps.  Very productive.
  * **Lecture and Discussion** on Ben Cherry's blog article on [writing testable JavaScript](http://www.adequatelygood.com/2010/7/Writing-Testable-JavaScript)

## October 21 ##
  * Standup
    * Completed
      * Launcher is now a physical object (generated much discussion about refactoring!)
      * Camera now behaves a little better
      * Big improvements to cannon
      * Bugfix re damage computation (projectile hits were not being counted)
  * Announcements: Upcoming Open House, Job offer in West Hollywood
  * **Homework**: read about [PHUN](http://www.phunland.org) (the graphics engine!); watch video on JavaScript game engine development
  * **Discussion**: "Super" methods in JavaScript

## October 26 ##
  * Standup
    * Completed and in progress:
      * A JavaScript framework for differential inheritance
      * Began investigating HTML 5 audio
      * Began enhancement of HTML page to show help and link to googlecode page, etc.
      * New monkey sprites have arrived!
      * Some cannon improvements
    * Next up:
      * Refinement and documentation of differential inheritance framework
      * Help as a div overlay
      * Overcome box2D limitation of rotation only about the center by using joints
      * Projectile launch point
      * Initial sound integration (callbacks will occur later)
  * **Discussion**: Base64
  * Discussion on issue found by chief tester: monkeys falling behind the cannon can't be easily killed.  Should we raise the fortress, or create a projectile that passes through the cannon, or both?

## October 28 ##
  * Standup
    * Completed
      * Help implemented with div overlay
      * Sound now working
        * Original music composed for the background theme
        * Monkeys grunt when taking damage; scream when dying
      * Projectiles now emanate from launch point
    * In progress
      * Platforms for fortresses
    * Next up
      * Velocity checks on timer
      * Minified JQuery
      * New data structure for projectiles
      * Level editor (to allow players to create their own fortresses)
  * Sound issues: sound not playing on Safari --- need to reorder mp3 and ogg links?
  * Brainstorming: Made fun list of potential new launchers and projectiles

## November 2 ##
  * Standup
    * Completed
      * Velocity checks on timer
      * More sound improvements
      * Sound page added to wiki
      * Ground image from Alex - consensus is that it looks good
      * Banana uses custom polygon
      * Work on joint manipulation -- very frustrating, though, no decent box2d documentation for JavaScript; all tutorials are in ActionScript
      * Minfied JQuery
      * Data structure for bananas
      * Triple banana projectile
      * playstate refactoring
      * Some progress on level editor
      * Bugfixes (win condition)
      * UI component ... number of monkeys remaining
      * Fortress creatiion no longer hardcoded -- fortresses are "read" from JSON structures
    * Next up
      * Get joints working
      * Exploding projectiles
  * **Discussion**: Benefits and risks of adding methods to built-in prototypes in JavaScript.
  * **Discussion**: Sprite code needs to be extended to allow arbitrary polygons; currently we only support boxes and circles.
  * Brainstorming on ways to implement explosions
    * Spawn (in)visible small projectiles?
    * Apply force radially to all objects within a fixed distance of the "bomb"
    * We should implement different techniques and evaluate
  * Outstanding bugs and issues:
    * We still have placeholder graphics -- give suggestions to Alex

## November 4 ##
  * Standup
    * Progress on joints (bugfix: objects with joints were not moving  unless they had mass)
    * Work on explosions --- current blocker due to a reported bug in box2d's world.query.  Currently experimenting with workarounds.
    * Progress on level editor
    * Implementation of sound and music on/off buttons
  * Next up
    * need to complete in-progress items
    * "Little triangle" to track projectiles that are above viewport
  * Discussion on whether or not players can do damage to other players' launchers. Good idea since it introduces strategy, and is "better than" Angry Birds and Crush the Castle.

## November 9 ##
  * Standup
    * Level editor progress
    * Joints working
    * Explosion work is underway, but he initial implementation needs a lot of tuning ([Issue 26](https://code.google.com/p/manicmonkeymadness/issues/detail?id=26))
    * An initial tracker for offscreen projectiles has been implemented
  * Next up
    * Level editor completion (ETA is 9 days)
    * A new version of box2D has been released; Matt will investigate.
    * New projectiles planned in the next couple days
    * Explosions need refinement
  * **Discussion** on the non-standard `__proto__` property and how to avoid its use.
  * **Homework** Read McConnell Chapters 1 and 2, skim Chapters 3-9.

## November 11 ##
  * Standup:
    * Level editor progress: new pieces, generation of JSON
    * Box2D upgrade progress
    * Exploding watermelon progress: the physics of the explosions are worked out and implemented, but the projectile is not shown blowing up.
    * Arrow tracking of multiple bananas is now implemented
  * Next up:
    * Box2D upgrade completion
    * Animation of projectiles exploding
  * Discussion on the use of sprite sheets to show projectiles exploding
  * Discussion of projectile representations to include icons
  * Discussion of JavaScript games and game engines in general, with a look at [Biolab Disaster](http://www.phoboslab.org/biolab/).
  * **Lecture**: Basics of networks and internetworks, protocols, layers, and services, with a tour of the IANA port mappings.
  * **Assignments**: Continue reading McConnell, research Biolab Disaster (including watching the video on the making of the game), research the new HTML5 features Web Workers and Offline Operation.

## November 16 ##
  * Brief standup
  * Small demo of recently added features
  * **Discussion** about persistence: should we make our own webapp (either hosted locally or via GAE) or should be use a social gaming service?
  * Serious planning session for remainder of term:
    * Cannon fixes - Matt
    * New Music - Anthony
    * Fort validation (prevention of illegal or overly complex forts) - Jarod
    * More sophisticated play, e.g. restricted weapon selection) - Anthony
    * Icon improvments (sound, music, help) - David and Alex
    * Main menu L &amp; F - Alex
    * More fort pieces - Matt
    * Explosion effects - David
    * Treasure - David
    * Decision on local web app, GAE, or SGN/Crystal - Everyone
    * Start Prezi for final presentation - Ray
    * Morph wiki into report format - Ray
    * Create a YouTube video, demoing the game - David
    * Submit to Chromeexperiments.com - Ray
    * Ajax implementation (to talk to persistence layer) - Everyone
    * More UAT - Aidan

## November 18 ##
  * Free lab day!  Everyone showed up, coded, and planned, and discussed.

## November 23 ##
  * Standup
    * Work completed
      * Finished port to Box2d 2.1 (HUGE DEAL)
      * Added helmet-spike monkey
      * Poof animation for dying monkeys
      * Rudimentary exploding watermelon animation
      * Cannon fixes
      * Added a "Debug Draw" mode
      * Can now move the cannon with the keyboard (much more precise)
      * Help buttons now in canvas
      * Many fixes related to new Box2D behavior
      * Treasure!
      * Different versions of games (e.g. last monkey standing, demolition derby)
      * Level editor limitations (point values per piece, max number of monkeys)
      * Sophisticated level-editor feedback
    * In progress
      * Weapon "unlocking" -- certain weapons become available per turn
  * Discussion
    * Box2D 2.1 has rewritten collision detection logic, making the game play different (the monkeys are harder to kill)
    * Debugging feature -- unlock all weapons
    * Strontium forts? Nukes? Chicken sandwiches?
  * Next up
    * Video
  * **Lecture**: Web application architectures: servers, clients, HTTP, Ajax

## November 25 ##
  * Ate turkey

## November 30 ##
  * Standup
    * Work completed
      * Fixed issues with Demolition Derby game style.
      * Updated help menu and added "H" hotkey to toggle it.
      * Acquired new sprites.
      * Began using Google App Engine.
      * Added a shot counter for each player.
      * Almost fully implemented unlockable weapons (some bugs still)
      * Edit level mode now limits the number of each monkey type.
  * Brief Discussion
    * Reviewed previous Serengeti presentation to get ideas.
    * Discussed necessary slides for presentation.
  * Notes
    * Presentation date set to December 16 from 2-4p.m.

## December 2 ##
  * Announcements:
    * Hoping to get Dave Pedowitz from FriendBuy.com as guest speaker next week
  * Standup
    * GAE work in progress (Matt)
    * Exploding watermelon bugs - some fixed, but some contact issues remain (David)
    * Mirroring of forts is done!  (Jarod) Solution was to make rotation angles relative to vertical, rather than the horizontal.  Had an interesting discussion about this.
    * Anthony had a theology paper due so he didn't have much to report, other than fixing the weapon unlocking bug.
  * Prezi explorations
  * Saw some Angry Birds three star videos on youtube, and read user comments.  Naturally this lead to a discussion of http://xkcd.com/481/
  * In class discussions among developers regarding friction, points at which Box2D samples the world, odd camera behaviors, etc.

### December 7 ###
  * Standup
    * Work completed
      * New default fort
      * Cut down image pixel sizes and image file size (700KB -> 4KB) to improve performance
      * New original music!! (rather than asking for Metallica's permission to use RIde The Lighting)
      * "Shots Left" widget
      * Clickable weapons box
      * New fort pieces and redid old ones
      * Almost done
        * GAE piece is 95% done
        * Video almost done
    * Next up
      * Damage states for new pieces
  * Go over prezi
  * Discuss one random blogger's take on [10 things developers should know in the next 5 years](http://blogs.techrepublic.com.com/10things/?p=643).

### December 9 ###
  * Standup
    * Completed: new sound effects, many cosmetic changes, new logo, etc.
    * Still working on the collision bug -- why do we sometimes miss callbacks?  box2d bug?
  * **Guest Presentation** from Dave Pedowitz and Patrick Yee currently of friendbuy.com based in WeHo.  Talk covered
    * Background on the presenters - quite impressive!
    * About the tech industry in L.A. and differences between the biz here and N.Y. and S.F.
    * Business model of friendbuy, and of social media in general
    * The friendbuy architecture and main technology stack
  * Fleeting discussion on the upcoming final presentation
  * Filled out course evaluations