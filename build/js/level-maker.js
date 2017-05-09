'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _Cloud = require('./objects/static/Cloud.js');

var _Cloud2 = _interopRequireDefault(_Cloud);

var _Tree = require('./objects/static/Tree.js');

var _Tree2 = _interopRequireDefault(_Tree);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
    populate: function (scene) {
        for (let i = 0; i < 50; i++) {
            let x = Math.random() * 10000 - 5000;
            let y = Math.random() * 400 - 100;
            let cloud = new _Cloud2.default(x, y);
            cloud.wind = 0.1;

            scene.addObject(cloud);
        }

        for (let i = 0; i < 50; i++) {
            let x = Math.random() * 10000 - 5000;
            let y = Math.random() * 400 - 100;
            let cloud = new _Cloud2.default(x, y);
            cloud.wind = 0.2;

            scene.addObject(cloud);
        }

        for (let i = 0; i < 100; i++) {
            let x = Math.random() * 10000 - 5000;
            let y = Math.random() * 200 + 550;
            let tree = new _Tree2.default(x, y);

            scene.addObject(tree);
        }
    }
};
//# sourceMappingURL=level-maker.js.map