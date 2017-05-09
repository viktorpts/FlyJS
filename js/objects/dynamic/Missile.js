import Character from './Character.js';
import Sprite from '../../enums/Sprite.js';

export default class Missile extends Character {
    constructor(x, y) {
        super(x, y);

        this.sprite = Sprite.MISSILE;
        this.fuel = 3;
        this.life = 10;
        this.scale = 0.04;
    }

    update() {
        super.update();

        this.life -= 0.1;
        if (this.fuel > 0) {
            this.fuel -= 0.1;
            this.accelerate(0.5);
        }
        if (this.life <= 0) {
            this.alive = false;
        }
    }
}