import Observer from '../utility/Observer.js'

export default class Scene {
    constructor() {
        this._objects = new Map();
        this._observer = new Observer();
    }

    addObject(obj) {
        this._objects.set(obj.id, obj);
        // TODO register observer with object
    }

    removeObject(id) {
        this._objects.delete(id);
        // TODO unsubscribe event handlers
    }

    // TODO replace with register functions?
    observer() {
        return this._observer;
    }

    // Update objects
    update() {
        for (let [id, obj] of this._objects.entries()) {
            obj.update();

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

    getSync() {
        let result = [];
        for (let obj of this._objects) {
            result.push(obj[1].getSync());
        }
        return result;
    }
}