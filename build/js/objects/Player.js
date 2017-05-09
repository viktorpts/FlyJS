'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _Entity = require('./Entity.js');

var _Entity2 = _interopRequireDefault(_Entity);

var _Sprite = require('../enums/Sprite.js');

var _Sprite2 = _interopRequireDefault(_Sprite);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Player extends _Entity2.default {
    constructor() {
        super();

        this.sprite = _Sprite2.default.PLANE;
        this.shooting = false;
        this.cooldown = 0;
    }

    shoot() {
        if (this.cooldown == 0) {
            this.shooting = true;
            this.cooldown = 1;
        }
    }

    update() {
        super.update();
        if (this.cooldown > 0) {
            this.cooldown -= 0.02;
        } else {
            this.cooldown = 0;
        }
    }
}
exports.default = Player;
//# sourceMappingURL=Player.js.map