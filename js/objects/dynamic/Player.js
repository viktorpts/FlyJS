import Character from './Character.js';
import Sprite from '../../enums/Sprite.js';

export default class Player extends Character {
    constructor(id) {
        super();

        this.sprite = Sprite.PLANE;
        this.shooting = false;
        this.cooldown = 0;
        this.id = id;
    }

    shoot() {
        if (this.cooldown == 0) {
            this.shooting = true;
            this.cooldown = 50;
        }
    }

    update() {
        super.update();
        if (this.cooldown > 0) {
            this.cooldown -= 1;
        } else {
            this.cooldown = 0;
        }
    }
}