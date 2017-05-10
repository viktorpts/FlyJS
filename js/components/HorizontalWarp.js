import Component from './Component.js';

export default class HorizontalWarp extends Component {
    constructor(owner) {
        super(owner);
    }

    update() {
        // TODO get scene dimensions from actual level
        if (this.owner.x > 5000) {
            this.owner.x -= 10000;
        } else if (this.owner.x < -5000) {
            this.owner.x += 10000;
        }
    }
}