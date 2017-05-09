"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _Sprite = require("../enums/Sprite.js");

var _Sprite2 = _interopRequireDefault(_Sprite);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Entity {
    constructor(x = 0, y = 0) {
        if (new.target === Entity) {
            throw new TypeError("Cannot construct abstract instances directly.");
        }

        this.alive = true;
        this.direction = 0;
        this.x = x;
        this.y = y;
        this.sprite = _Sprite2.default.BOX;
        this.scale = 0.1;
    }

    update() {}
}
exports.default = Entity;
//# sourceMappingURL=Entity.js.map