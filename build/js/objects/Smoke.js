'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _Entity = require('./Entity.js');

var _Entity2 = _interopRequireDefault(_Entity);

var _Sprite = require('../enums/Sprite.js');

var _Sprite2 = _interopRequireDefault(_Sprite);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Smoke extends _Entity2.default {
    constructor(x, y) {
        super(x, y);

        this.sprite = _Sprite2.default.SMOKE;
        this.life = 5;
        this.physics = false;
    }

    update() {
        super.update();

        this.direction += 0.01;
        this.y -= 0.1;

        this.life -= 0.1;
        if (this.life <= 0) {
            this.alive = false;
        }
    }
}
exports.default = Smoke;
//# sourceMappingURL=Smoke.js.map