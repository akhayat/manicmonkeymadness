/**
 * contact.js
 *
 * This module listens for contacts in the physics world, computes the necessary damage
 * and result of that damage to each object.
 */

$(function () {
    m3.contact = function () {

        var b2WorldManifold = Box2D.Collision.b2WorldManifold,
            b2Math = Box2D.Common.Math.b2Math;

        return {
            /*
             * This is called when two fixtures being to overlap inside a time step
             */
            BeginContact: function(contact) {
               // m3.util.log('begin contact');
            },

            /*
             * This is called when two fixtures cease to overlap
             */
            EndContact: function (contact) {
                //m3.util.log('end contact');
            },

            /*
             * This function is called after collision detection but before collision resolution
             */
            PreSolve: function (contact, oldManifold) {
//                m3.util.log('pre solve');

                var manifold = contact.GetManifold();

                if (manifold.m_pointCount > 0) {
                    var worldManifold = new b2WorldManifold(),
                        body1 = contact.GetFixtureA().GetBody(),
                        body2 = contact.GetFixtureB().GetBody();

                    contact.GetWorldManifold(worldManifold);

                    var contactPoint = worldManifold.m_points[0];

                    var v1 = body1.GetLinearVelocityFromWorldPoint(contactPoint),
                        v2 = body2.GetLinearVelocityFromWorldPoint(contactPoint);

                    var velocity = b2Math.Dot(b2Math.SubtractVV(v2, v1), worldManifold.m_normal);

                    if (velocity > 0) {
                        var object1 = body1.GetUserData(),
                            object2 = body2.GetUserData();

                        if (object1 && object1.contact) {
                            object1.contact(object2, velocity);
                        }
                        else if (object1.type === "ground") {
                            // It would be nice to move this somewhere else...maybe make a ground type?
                            if (object2.type === 'projectile') {
                                m3.util.log('projectile hit ground at ' + velocity.toFixed(2) + ' m/s');
                            } else if (velocity > object2.minImpactVelocity) {
                                object2.damage += (velocity * object2.mass) / m3.config.damage_factor;

                                if (object2.damage > object2.destroyThreshold) {
                                    object2.alive = false;
                                    m3.util.log('fort piece destroyed');
                                    m3.score.playerDestroyed(object2);
                                }

                                m3.util.log(object2.type + ' hit ground at ' + velocity.toFixed(2) + ' m/s');
                                m3.util.log(object2.type + ' damage: ' + object2.damage.toFixed(2));
                               }
                        }

                        if (object2 && object2.contact) {
                            object2.contact(object1, velocity);
                        }
                    }
                }
            },

            /*
             * This function is where you can gather collision impulse results
             */
            PostSolve: function (contact, impulse) {
//                m3.util.log('post solve');
            }
        };
    }();
});
