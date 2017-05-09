'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
class KeyboardInput {
    constructor() {
        this.keysPressed = {};
    }

    attachEventListeners(emitter) {
        emitter.addEventListener('keydown', this.keyEvent.bind(this));
        emitter.addEventListener('keyup', this.keyEvent.bind(this));
    }

    keyEvent(event) {
        if (event.type == 'keydown') {
            this.keysPressed[event.code] = true;
        } else if (event.type == 'keyup') {
            delete this.keysPressed[event.code];
        }
    }

    applyInput(object) {
        if (this.keysPressed["ArrowLeft"]) {
            object.direction -= Math.PI / 32;
        }
        if (this.keysPressed["ArrowRight"]) {
            object.direction += Math.PI / 32;
        }
        if (this.keysPressed["ArrowUp"]) {
            object.accelerate(0.2);
        }
        if (this.keysPressed["ArrowDown"]) {
            object.accelerate(-0.05);
        }
        if (this.keysPressed["Space"]) {
            object.shoot();
        }
    }
}
exports.default = KeyboardInput;
//# sourceMappingURL=Keyboard.js.map