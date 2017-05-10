import Backdrop from './Backdrop.js';
import Sprite from '../../enums/SpriteType.js';

export default class Cloud extends Backdrop {
    constructor(x, y) {
        super(x, y);

        this.sprite = Sprite.CLOUD;
        this.wind = 0;
        this.scale = 0.2;
    }

    update() {
        this.x += this.wind;
        if(this.x > 5000) {
            this.x = -5000;
        }
    }
}