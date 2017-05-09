'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _Palette = require('./renderer/Palette.js');

var _Palette2 = _interopRequireDefault(_Palette);

var _game = require('./game.js');

var _game2 = _interopRequireDefault(_game);

var _Renderer = require('./renderer/Renderer.js');

var _Renderer2 = _interopRequireDefault(_Renderer);

var _Keyboard = require('./input/Keyboard.js');

var _Keyboard2 = _interopRequireDefault(_Keyboard);

var _socketIo = require('/socket.io/socket.io.js');

var _socketIo2 = _interopRequireDefault(_socketIo);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
    // Initiate connection
    let socket = (0, _socketIo2.default)();

    _Palette2.default.init(start);

    let canvas = document.getElementById('canvas');
    let renderer = new _Renderer2.default(canvas, _Palette2.default.palette);
    let input = new _Keyboard2.default();

    let game = new _game2.default(renderer, input, socket);
    game.attachEventListeners(window);

    // Register new players
    socket.on('newPlayer', function (data) {
        game.addPlayer(data.id);
    });

    socket.on('playerLeft', function (data) {
        game.removePlayer(data.id);
    });

    socket.on('playerPos', function (data) {
        game.updatePosition(data);
    });

    function start() {
        game.start();
    }
}();
//# sourceMappingURL=app.js.map