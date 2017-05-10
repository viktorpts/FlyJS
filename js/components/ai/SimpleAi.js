import Component from '../Component.js';

export default class SimpleAi extends Component {
    constructor(owner) {
        super(owner);

        this.memory = 0;
        this.currentDir = 1;
    }

    update() {
        this.memory++;
        if (this.memory == 30) {
            this.memory = 0;
            this.currentDir = (Math.round(Math.random()) * 2) - 1;
        }

        if (this.memory < 5) {
            this.owner.post('accelerate', 0.6);
        } else if (this.memory < 25) {
            this.owner.direction += 0.05 * this.currentDir;
        }
    }
}