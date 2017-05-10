export default class Layer {
    constructor(scale) {
        this.scale = scale;
        this.graphicsComponents = new Map();
    }

    addObject(component) {
        this.graphicsComponents.set(component.owner.id, component);
    }
}