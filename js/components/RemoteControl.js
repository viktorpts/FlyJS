import Component from './Component.js';
import ServiceLocator from '../utility/ServiceLocator.js';

export default class RemoteControl extends Component {
    constructor(owner, input) {
        super(owner);

        this.input = input;
    }

    update() {
        // TODO poll input and post events to owner
        if(this.input.keysPressed["ArrowLeft"]) {
            this.owner.direction -= Math.PI / 32;
        }
        if(this.input.keysPressed["ArrowRight"]) {
            this.owner.direction += Math.PI / 32;
        }
        if(this.input.keysPressed["ArrowUp"]) {
            this.owner.post('accelerate', 0.2);
        }
        if(this.input.keysPressed["ArrowDown"]) {
            this.owner.post('accelerate', -0.05);
        }
        /*
        if(this.input.keysPressed["Space"]) {
            this.owner.shoot();
        }
        */
    }
}