import Entity from '../Entity.js';
import Physics from '../../simulation/Physics.js'

export default class Character extends Entity {
    constructor(x, y) {
        if (new.target === Character) {
            throw new TypeError("Cannot construct abstract instances directly.");
        }
        super(x, y);

        this.velX = 0;
        this.velY = 0;
        this.physics = new Physics(this);
    }

    update() {
        if (this.physics) {
            this.physics.step();
        }
    }

    accelerate(amount = 0.02) {
        this.physics.accelerate(amount);
    }
}