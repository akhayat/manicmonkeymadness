# Introduction #

The UI module is a "special" module in that it is comprised of several sub-modules. Generally, each element of the HUD should be broken down into a submodule inside the `modules/ui` directory. For example, currently there is a `ui.score` module, which renders the player scores.

The module follows a format similar to many other systems in the game. It implements an `update` function which calls the `update` functions of all of the sub-modules.

Note that the UI modules, as part of the view in the MVC paradigm, should not store data themselves. This is why there is a separate module that handles the scoring data itself rather than the UI score module handling it.

In addition to containing UI sub-modules, the UI module contains UI-related helper functions to be used by the sub-modules.

# Sub-Modules #

  * **Score:** Displays the players' scores.