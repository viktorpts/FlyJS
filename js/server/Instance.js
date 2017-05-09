import Environment from '../enums/Environment.js';

export default class Instance {
    constructor(environment, scene) {
        this.environment = environment;
        this.scene = scene;
    }

    step() {
        this.scene.update();
    }
}