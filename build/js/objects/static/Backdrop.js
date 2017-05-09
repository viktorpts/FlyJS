"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _Entity = require("../Entity.js");

var _Entity2 = _interopRequireDefault(_Entity);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Backdrop extends _Entity2.default {
    constructor(x, y) {
        if (new.target === Backdrop) {
            throw new TypeError("Cannot construct abstract instances directly.");
        }

        super(x, y);
    }

    update() {}
}
exports.default = Backdrop;
//# sourceMappingURL=Backdrop.js.map