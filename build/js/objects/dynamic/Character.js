'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _Entity = require('../Entity.js');

var _Entity2 = _interopRequireDefault(_Entity);

var _Physics = require('../../simulation/Physics.js');

var _Physics2 = _interopRequireDefault(_Physics);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Character extends _Entity2.default {
    constructor(x, y) {
        if (new.target === Character) {
            throw new TypeError("Cannot construct abstract instances directly.");
        }
        super(x, y);

        this.velX = 0;
        this.velY = 0;
        this.physics = new _Physics2.default(this);
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
exports.default = Character;
//# sourceMappingURL=Character.js.map