'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _Entity = require('./Entity.js');

var _Entity2 = _interopRequireDefault(_Entity);

var _Sprite = require('../enums/Sprite.js');

var _Sprite2 = _interopRequireDefault(_Sprite);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Bullet extends _Entity2.default {
    constructor(x, y) {
        super(x, y);

        this.sprite = _Sprite2.default.MISSILE;
        this.fuel = 3;
        this.life = 10;
    }

    update() {
        super.update();

        this.life -= 0.1;
        if (this.fuel > 0) {
            this.fuel -= 0.1;
            this.accelerate(0.5);
        }
        if (this.life <= 0) {
            this.alive = false;
        }
    }
}
exports.default = Bullet;
//# sourceMappingURL=Bullet.js.map