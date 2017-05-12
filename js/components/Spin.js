import Component from './Component.js';

export default class Spin extends Component {
    constructor(owner, rate) {
        super(owner);

        this.rate = rate;
    }

    update() {
        this.owner.direction += this.rate;
    }
}