/**
 * projectile.js
 *
 * This object represents a projectile fired from a launcher.
 *
 */

$(function() {
    m3.types.Projectile = function() {
        var Projectile = Object.create(m3.types.PhysicsObject);
        Projectile.Projectile = Projectile;

        // Private members.
        var Sprite = m3.types.Sprite,
            Vector = m3.types.Vector,
            b2Vec2 = Box2D.Common.Math.b2Vec2,
            assets = m3.assets.sprites,
            scale  = m3.config.scaling_factor;

        var ammunition = {
            rock: {
                small: { s: assets.rock, h: 38, w: 38, radius: 19,
                         density: 2.0, restitution: 0.1, friction: 2.5, torque: 10, power: 200,
                         spawn: function(x, y) {
                             return m3.world.createBall(x / scale, y / scale, this.radius / scale, false, this.density, this.restitution, this.friction);
                         }
                       }
            },
            banana: {
                single: { s: assets.banana, h: 27, w: 34,
                          density: 1.5, restitution: 0, friction: 1.0, torque: 10, power: 75,
                          vertices: [[8,-16], [13,-10], [14,-5], [8,5], [-2,10], [-13,10], [-20,5]],
                          spriteOffset: Vector.create(20,16),
                          spawn: function(x, y, angle) {
                              return m3.world.createPoly(x / scale, y / scale, m3.util.pixelsToMeters(this.vertices), angle, false, this.density, this.restitution, this.friction);
                          }
                },

                triple: { s: assets.banana_green, h: 25, w: 25, icon: assets.banana_bunch,
                          density: 1.5, restitution: 0, friction: 1.0, torque: 10, power: 50,
                          vertices: [[5,-15], [9,-10], [11,-5], [5,7], [-6,10], [-13,5]],
                          spriteOffset: Vector.create(13,15),
                          spawn: function(x, y, angle) {
                                return m3.world.createPoly(x / scale, y / scale, m3.util.pixelsToMeters(this.vertices), angle, false, this.density, this.restitution, this.friction);
                          }
                }
            },
            watermelon: {
                whole: 	{ s: assets.watermelon_explode, h: 52, w: 72, icon: assets.watermelon,
                              density: 1.2, restitution: 0.1, friction: 0.95, torque: 10, power: 150,
                              vertices: [[8,-16], [23,-5], [23,5], [8,16], [-8,16], [-23,5], [-23,-5], [-8,-16]],
                              spriteOffset: Vector.create(36,26),
                              spawn: function(x, y, angle) {
                               return m3.world.createPoly(x / scale, y / scale, m3.util.pixelsToMeters(this.vertices), angle, false, this.density, this.restitution, this.friction);
                           }
                   }
            },
            monkey: {
                medium: { s: assets.monkey_spike, h: 62, w: 50, icon: assets.proj_monkey,
                          density: 2.0, restitution: 0.3, friction: 1.0, torque: 10, power: 550,
                          spawn: function(x, y, angle) {
                              return m3.world.createBox(x / scale, y / scale, this.w / scale, this.h / scale, angle, false, this.density, this.restitution, this.friction);
                          }
                }
            }
        };

        // Override PhysicsObject update function to keep track of how long we've been alive.
        Projectile.update = function() {
            this.PhysicsObject.update.call(this);
            this.life_time += m3.game.elapsed;
        };

        // "Static" getters
        Projectile.sprite = function(ammo, type) {
            var t = ammunition[ammo][type];

            return t.s;
        };

        Projectile.icon = function(ammo, type) {
            var t = ammunition[ammo][type];

            return !!t.icon ? t.icon : t.s;
        };

        Projectile.power = function(ammo, type) {
            var t = ammunition[ammo][type];

            return t.power;
        };

        // Collision callback.
        Projectile.contact = function(other, velocity) {
            var projectile = this;

            m3.util.log("PROJECTILE contact (" + this + ") with " + other.type + "(" + other + ")");

            // We want to stop following the projectile when it hits something.
            if (projectile.life_time > 1.0) {
                m3.camera.stopFollowing();
            }

            if (m3.launcher.currentLauncher().pType === "watermelon" && projectile.type === "projectile") {
                projectile.type = "broken";
                projectile.body.SetLinearVelocity(new b2Vec2(0,0));
                projectile.sprite.play("ticking");

                setTimeout(function () {
                    projectile.sprite.play("explode");
                    m3.world.explode(new b2Vec2(projectile.x, projectile.y));
                    m3.assets.sfx.splat.play();
                    setTimeout(function () {
                        projectile.type = "done";
                        projectile.alive = false;
                    }, 1000);
                }, 1000);
                return;
            }

            if (other.type === 'fort_piece') {
                if (velocity > other.minImpactVelocity) {
                    other.damage += (velocity * this.mass) / m3.config.damage_factor;

                    m3.util.log('projectile hit fort piece at: ' + velocity.toFixed(2) + ' m/s');
                    m3.util.log('fort piece damage: ' + other.damage.toFixed(2));
                }

                if (other.damage >= other.destroyThreshold / 3 && other.damage < other.destroyThreshold * 2 / 3 && other.sprites.damaged) {
                    other.sprite = other.sprites.damaged;
                }
                else if (other.damage >= other.destroyThreshold * 2 / 3 && other.damage < other.destroyThreshold && other.sprites.destroyed) {
                    other.sprite = other.sprites.destroyed;
                }
                else if (other.damage > other.destroyThreshold) {
                    other.alive = false;
                    m3.score.playerDestroyed(other);

                    m3.util.log('fort piece destroyed');
                }
            }
            else if (other.type === 'enemy') {
                if (velocity > other.minImpactVelocity) {
                    other.damage += (velocity * this.mass) / m3.config.damage_factor;

                    m3.util.log('projectile hit enemy at: ' + velocity.toFixed(2) + ' m/s');
                    m3.util.log('enemy damage: ' + other.damage.toFixed(2));
                }

                if (other.damage > other.destroyThreshold) {
                    other.alive = false;
                    m3.score.playerDestroyed(other);

                    m3.util.log('enemy destroyed');
                }
            }
        };

        // Constructor.
        Projectile.create = function(x, y, angle, impulse, ammo, type) {
            var p     = m3.types.PhysicsObject.create(x, y, null, this),
                t     = ammunition[ammo][type],
                piece = t.spawn(x, y, angle);

            piece.body.SetUserData(p);
            p.contact   = this.contact;
            p.type      = "projectile";
            p.body      = piece.body;
            p.shape     = piece.shape;
            p.alive     = true;
            p.sprite    = Sprite.create(t.s, t.h, t.w);
            p.life_time = 0.0;

            if (t.spriteOffset) p.spriteOffset = t.spriteOffset;

            if (t.icon)	p.icon = t.icon;

            if (ammo === "watermelon") {
                p.sprite.addAnimation("ticking", [0, 1, 0, 1, 0, 1, 0], 0.25);
                p.sprite.addAnimation("explode", [2, 3, 4, 5, 6, 5, 6], 0.20);
            }

            if (impulse) {
                p.body.ApplyImpulse(new b2Vec2(impulse.x, impulse.y), new b2Vec2(p.x_in_meters, p.y_in_meters));

                var torque = (impulse.x < 0) ? -1 * t.torque : t.torque;
                //may be causing bodies to rotate nonstop
                // p.body.ApplyTorque(torque);
            }

            return p;
        };

        return Projectile;
    }();
});
