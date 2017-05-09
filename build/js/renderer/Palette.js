'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _Sprite = require('../enums/Sprite.js');

var _Sprite2 = _interopRequireDefault(_Sprite);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let required = 0;
let loaded = 0;
let palette = {};
let callback = () => {};

function init(cb) {
    callback = cb;
    for (let sprite in _Sprite2.default) {
        if (_Sprite2.default.hasOwnProperty(sprite)) {
            palette[_Sprite2.default[sprite]] = new Image();
            palette[_Sprite2.default[sprite]].src = 'src/' + _Sprite2.default[sprite] + '.png';
            palette[_Sprite2.default[sprite]].onload = onLoad;
            required++;
        }
    }
}

function onLoad() {
    loaded++;
    if (loaded == required) {
        callback();
    }
}

exports.default = {
    palette,
    init
};
//# sourceMappingURL=Palette.js.map