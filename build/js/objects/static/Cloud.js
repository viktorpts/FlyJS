'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _Backdrop = require('./Backdrop.js');

var _Backdrop2 = _interopRequireDefault(_Backdrop);

var _Sprite = require('../../enums/Sprite.js');

var _Sprite2 = _interopRequireDefault(_Sprite);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Cloud extends _Backdrop2.default {
    constructor(x, y) {
        super(x, y);

        this.sprite = _Sprite2.default.CLOUD;
        this.wind = 0;
        this.scale = 0.2;
    }

    update() {
        this.x += this.wind;
        if (this.x > 5000) {
            this.x = -5000;
        }
    }
}
exports.default = Cloud;
//# sourceMappingURL=Cloud.js.map