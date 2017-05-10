export default class Observer {
    constructor() {
        this.subscribers = new Map();
    }

    // Handlers must be bound when passed in!
    subscribe(eventType, handler) {
        if (!this.subscribers.has(eventType)) {
            this.subscribers.set(eventType, []);
        }
        this.subscribers.get(eventType).push(handler);
    }

    unsubscribe(eventType, handler) {
        if (this.subscribers.has(eventType)) {
            let list = this.subscribers.get(eventType);
            for (let i = 0; i < list.length; i++) {
                let obj = list[i];
                if (handler === obj) {
                    list.splice(i, 1);
                    return;
                }
            }
        }
    }

    fire(eventType, data) {
        if (this.subscribers.has(eventType)) {
            let list = this.subscribers.get(eventType);
            for (let handler of list) {
                handler(data);
            }
        }
    }
}