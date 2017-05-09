'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _Character = require('./Character.js');

var _Character2 = _interopRequireDefault(_Character);

var _Sprite = require('../../enums/Sprite.js');

var _Sprite2 = _interopRequireDefault(_Sprite);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Player extends _Character2.default {
    constructor(id) {
        super();

        this.sprite = _Sprite2.default.PLANE;
        this.shooting = false;
        this.cooldown = 0;
        this.id = id;
    }

    shoot() {
        if (this.cooldown == 0) {
            this.shooting = true;
            this.cooldown = 50;
        }
    }

    update() {
        super.update();
        if (this.cooldown > 0) {
            this.cooldown -= 1;
        } else {
            this.cooldown = 0;
        }
    }
}
exports.default = Player;
//# sourceMappingURL=Player.js.map