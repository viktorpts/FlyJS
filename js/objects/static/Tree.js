import Backdrop from './Backdrop.js';
import Sprite from '../../enums/SpriteType.js';

export default class Tree extends Backdrop {
    constructor(x, y) {
        super(x, y);

        this.sprite = Sprite.TREE;
        this.wind = 0;
    }
}