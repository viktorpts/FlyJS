import Component from './Component.js';

export default class HorizontalScroll extends Component {
    constructor(owner, rate) {
        super(owner);

        this.rate = rate;
    }

    update() {
        this.owner.x += this.rate;
    }
}