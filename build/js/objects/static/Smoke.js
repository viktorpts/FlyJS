'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _Backdrop = require('./Backdrop.js');

var _Backdrop2 = _interopRequireDefault(_Backdrop);

var _Sprite = require('../../enums/Sprite.js');

var _Sprite2 = _interopRequireDefault(_Sprite);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Smoke extends _Backdrop2.default {
    constructor(x, y) {
        super(x, y);

        this.sprite = _Sprite2.default.SMOKE;
        this.life = 100;
        this.scale = 0.3;
    }

    update() {
        super.update();

        this.direction += 0.01;
        this.y -= 0.2;
        this.scale += 0.005;

        this.life -= 1;
        if (this.life <= 0) {
            this.alive = false;
        }
    }
}
exports.default = Smoke;
//# sourceMappingURL=Smoke.js.map