import Backdrop from './Backdrop.js';
import Sprite from '../../enums/Sprite.js';

export default class Smoke extends Backdrop {
    constructor(x, y) {
        super(x, y);

        this.sprite = Sprite.SMOKE;
        this.life = 100;
        this.scale = 0.3;
    }

    update() {
        super.update();

        this.direction += 0.01;
        this.y -= 0.2;
        this.scale += 0.005;

        this.life -= 1;
        if (this.life <= 0) {
            this.alive = false;
        }
    }
}