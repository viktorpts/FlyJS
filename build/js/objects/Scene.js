'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _Character = require('./dynamic/Character.js');

var _Character2 = _interopRequireDefault(_Character);

var _Backdrop = require('./static/Backdrop.js');

var _Backdrop2 = _interopRequireDefault(_Backdrop);

var _Missile = require('./dynamic/Missile.js');

var _Missile2 = _interopRequireDefault(_Missile);

var _Smoke = require('./static/Smoke.js');

var _Smoke2 = _interopRequireDefault(_Smoke);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Scene {
    constructor() {
        this.static = [];
        this.dynamic = [];
        this.toAdd = [];
        this.toRemove = [];
        this.toRemoveScenery = [];
        this.particleCooldown = 0;
    }

    addObject(obj) {
        // Typecheck static or dynamic
        if (obj instanceof _Character2.default) {
            this.dynamic.push(obj);
        } else if (obj instanceof _Backdrop2.default) {
            this.static.push(obj);
        }
    }

    update() {
        let spawnedParticle = false;
        if (this.particleCooldown > 0) {
            this.particleCooldown -= 1;
        }

        // Update scenery
        for (let i = 0; i < this.static.length; i++) {
            let obj = this.static[i];
            obj.update();
            if (!obj.alive) {
                this.toRemoveScenery.push(i);
            }
        }

        // Update objects
        for (let i = 0; i < this.dynamic.length; i++) {
            let obj = this.dynamic[i];
            obj.update();
            if (!obj.alive) {
                this.toRemove.push(i);
                continue;
            }
            if (obj.shooting) {
                // User input - shoot
                let bullet = new _Missile2.default(obj.x, obj.y);
                bullet.direction = obj.direction;
                bullet.accelerate(10);
                this.toAdd.push(bullet);
                obj.shooting = false;
            }
            if (Math.abs(obj.velX) > 0.2 || Math.abs(obj.velY) > 0.2) {
                // Particle emitters
                if (this.particleCooldown <= 0) {
                    spawnedParticle = true;
                    let x = obj.x - Math.cos(obj.direction) * 24;
                    let y = obj.y - Math.sin(obj.direction) * 24;

                    this.toAdd.push(new _Smoke2.default(x, y));
                }
            }
        }
        if (spawnedParticle) {
            // Limit particle emission
            this.particleCooldown = 3;
        }

        for (let i = 0; i < this.toAdd.length; i++) {
            this.addObject(this.toAdd[i]);
        }
        this.toAdd.length = 0;
        for (let i = this.toRemove.length - 1; i >= 0; i--) {
            this.dynamic.splice(this.toRemove[i], 1);
        }
        this.toRemove.length = 0;
        for (let i = this.toRemoveScenery.length - 1; i >= 0; i--) {
            this.static.splice(this.toRemoveScenery[i], 1);
        }
        this.toRemoveScenery.length = 0;
    }
}
exports.default = Scene;
//# sourceMappingURL=Scene.js.map