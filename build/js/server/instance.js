'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _Environment = require('../enums/Environment.js');

var _Environment2 = _interopRequireDefault(_Environment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Instance {
    constructor(environment, scene) {
        this.environment = environment;
        this.scene = scene;
    }

    step() {
        this.scene.update();
    }
}
exports.default = Instance;
//# sourceMappingURL=Instance.js.map