'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _Cloud = require('./Cloud.js');

var _Cloud2 = _interopRequireDefault(_Cloud);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class FastCloud extends _Cloud2.default {
    constructor(x, y) {
        super(x, y);
    }

    update() {
        this.x += 0.3;
    }
}
exports.default = FastCloud;
//# sourceMappingURL=FastCloud.js.map