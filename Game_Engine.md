# Introduction #

The core of the M3 game engine is the [Box2D physics engine](http://www.box2d.org).  Box2D is a 2D rigid body simulation library originally written in C++.  M3 is currently running the [box2dweb](http://code.google.com/p/box2dweb/) JavaScript port which was converted from Box2DFlash 2.1a.  The M3 world and contact modules as well as the PhysicsObject type serve as the main wrappers around Box2D objects and classes. Through them all the game's communication with the Box2D simulation takes place.


# Details #

Box2D consists of 3 interconnected modules that together simulate a physics environment: Collision, Dynamics, and Common.  The Collision module defines shapes and manages collision detection.  The Dynamics module simulates the physical world with bodies and fixtures for interactions with forces including gravity. Common holds some math function and other adjustable properties.

The PhysicsObject type is a wrapper around a Box2D object instance consisting of a body and shape.  It also contains data such as sprites and other attributes.  The contact module implements the Box2D contact listener for collision detection that computes the impact velocities for awarding damage.  The world module creates the Box2D world and steps the world simulation at the appropriate time and interval.  It has convenience methods to create physical objects.  These methods are usually called in the constructors for other types.  The signatures of these calls are:

```
   createBox(x, y, width, height, angle, fixed, density, restitution, friction)
   createCircle(x, y, radius, fixed, density, restitution, friction)
   createPoly(x, y, points, angle, fixed, density, restitution, friction) 
```

The parameters include the x and y coordinates in meters of the object's centroid. Fixed is a Boolean that determines if an object will be fixed at a location or will interact with forces such as gravity. Density, friction, and restitution (bounciness) are Box2D physical properties of an object (refer to the [API](http://www.box2d.org/manual.html) for acceptable values).  For createPoly, an array of points is taken that are about the objects centroid as its origin.