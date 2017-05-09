"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _Sprite = require("../enums/Sprite.js");

var _Sprite2 = _interopRequireDefault(_Sprite);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Backdrop {
    constructor(x = 400, y = 300) {
        if (new.target === Backdrop) {
            throw new TypeError("Cannot construct abstract instances directly.");
        }

        this.direction = 0;
        this.x = x;
        this.y = y;
        this.sprite = _Sprite2.default.BOX;
    }

    update() {}
}
exports.default = Backdrop;
//# sourceMappingURL=Backdrop.js.map