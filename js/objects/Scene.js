import Character from './dynamic/Character.js';
import Backdrop from './static/Backdrop.js';
import Bullet from './dynamic/Missile.js';
import Smoke from './static/Smoke.js';

export default class Scene {
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
        if (obj instanceof Character) {
            this.dynamic.push(obj);
        } else if (obj instanceof Backdrop) {
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
            if (obj.shooting) {     // User input - shoot
                let bullet = new Bullet(obj.x, obj.y);
                bullet.direction = obj.direction;
                bullet.accelerate(10);
                this.toAdd.push(bullet);
                obj.shooting = false;
            }
            if (Math.abs(obj.velX) > 0.2 || Math.abs(obj.velY) > 0.2) {     // Particle emitters
                if (this.particleCooldown <= 0) {
                    spawnedParticle = true;
                    let x = obj.x - Math.cos(obj.direction) * 24;
                    let y = obj.y - Math.sin(obj.direction) * 24;

                    this.toAdd.push(new Smoke(x, y));
                }
            }
        }
        if (spawnedParticle) {      // Limit particle emission
            this.particleCooldown = 3;
        }

        for (let i = 0; i < this.toAdd.length; i++) {
            this.addObject(this.toAdd[i]);
        }
        this.toAdd.length = 0;
        for (let i = this.toRemove.length - 1; i >=0 ; i--) {
            this.dynamic.splice(this.toRemove[i], 1);
        }
        this.toRemove.length = 0;
        for (let i = this.toRemoveScenery.length - 1; i >=0 ; i--) {
            this.static.splice(this.toRemoveScenery[i], 1);
        }
        this.toRemoveScenery.length = 0;
    }
}