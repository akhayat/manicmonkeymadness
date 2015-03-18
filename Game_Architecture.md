
---


Here is a quick overview of the project architecture, from both physical and logical perspectives;

# Physical Architecture #

The game is physically packaged as a project with the following directory structure:
```
.
├── src
│   ├── META-INF
│   └── manicmonkeymadness
└── war
    ├── WEB-INF
    │   ├── appengine-generated
    │   ├── classes
    │   │   ├── META-INF
    │   │   └── manicmonkeymadness
    │   └── lib
    ├── audio
    │   ├── effects
    │   └── music
    ├── images
    │   ├── backgrounds
    │   ├── icons
    │   └── sprites
    ├── scripts
    │   ├── box2d-2.1
    │   ├── modules
    │   │   └── ui
    │   ├── states
    │   └── types
    ├── styles
    └── test
        └── js
```

The game is deployed as a single war file on the Google App Engine.  Front end tests are deployed so that the test suite can be invoked from the game itself.

# Logical Architecture #

The major divisons in the project are:

  * Java classes for the backend (server-side)
  * The main HTML page
  * JavaScript front-end code
    * Initialization
    * Animation Loop
    * Game States
    * User Interaction
    * Physics
    * Camera
    * Forts
    * Launchers
    * Projectiles
    * Math
    * _and quite a few other subdivisions_
  * Stylesheets
  * Images
    * Sprites
    * Icons
    * Backgrounds
  * Audio
    * Sound Effects
    * Original Music