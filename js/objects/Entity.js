import Observer from '../utility/Observer.js';
import getId from '../utility/IdProvider.js';

export default class Entity {
    constructor(type, x = 0, y = 0, direction = 0) {
        /*
        if (new.target === Entity) {
            throw new TypeError("Cannot construct abstract instances directly.");
        }
        //*/

        this.id = getId();
        this.type = type;
        this.alive = true;
        this.layer = 5;
        this.x = x;
        this.y = y;
        this.direction = direction;

        this.observer = new Observer();
        this.components = [];
    }

    post(eventType, data) {
        this.observer.fire(eventType, data);
    }

    addComponent(component) {
        component.registerHandlers(this.observer);
        this.components.push(component);
    }

    update() {
        for (let component of this.components) {
            component.update();
        }
    }

    draw() {
        this.post('draw', null);
    }

    serialize() {
        return {
            type: this.type,
            layer: this.layer,
            id: this.id,
            x: this.x,
            y: this.y,
            direction: this.direction
        }
    }

    getSync() {
        return {
            id: this.id,
            x: this.x,
            y: this.y,
            direction: this.direction
        }
    }
}