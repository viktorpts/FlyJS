import Entity from '../Entity.js';

export default class Backdrop extends Entity{
    constructor(x, y) {
        if (new.target === Backdrop) {
            throw new TypeError("Cannot construct abstract instances directly.");
        }

        super(x, y);
    }

    update() {
    }
}