import Sprite from '../enums/Sprite.js';

export default class Entity {
    constructor(x = 0, y = 0) {
        if (new.target === Entity) {
            throw new TypeError("Cannot construct abstract instances directly.");
        }

        this.alive = true;
        this.direction = 0;
        this.x = x;
        this.y = y;
        this.sprite = Sprite.BOX;
        this.scale = 0.1;
    }

    update() {
    }
}