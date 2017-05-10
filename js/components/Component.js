export default class Component {
    constructor(owner) {
        if (new.target === Component) {
            throw new TypeError("Cannot construct abstract instances directly.");
        }

        this.owner = owner;
    }

    registerHandlers(observer) {
    }

    update() {
    }
}