import Observer from '../utility/Observer.js'

export default class Scene {
    constructor() {
        this._objects = new Map();
        this._observer = new Observer();
    }

    post(eventType, data) {
        this._observer.fire(eventType, data);
    }

    addObject(obj) {
        this._objects.set(obj.id, obj);
        // TODO register observer with object
    }

    removeObject(id) {
        if (this._objects.has(id)) {
            this._objects.get(id).alive = false; // Make sure other collections can register the removal
            this._objects.delete(id);
            // TODO unsubscribe event handlers
        }
    }

    // TODO replace with register functions?
    observer() {
        return this._observer;
    }

    // Update objects
    update(offset) {
        for (let [id, obj] of this._objects.entries()) {
            obj.update(offset);

            // Remove dead entries
            if (!obj.alive) {
                this.removeObject(id);
            }
        }
    }

    serialize() {
        let result = [];
        for (let obj of this._objects) {
            result.push(obj[1].serialize());
        }
        return result;
    }

    getDelta() {
        let result = [];
        for (let obj of this._objects) {
            result.push(obj[1].getDelta());
        }
        return result;
    }
}