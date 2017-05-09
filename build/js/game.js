'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _Player = require('./objects/dynamic/Player.js');

var _Player2 = _interopRequireDefault(_Player);

var _Scene = require('./objects/Scene.js');

var _Scene2 = _interopRequireDefault(_Scene);

var _levelMaker = require('./level-maker.js');

var _levelMaker2 = _interopRequireDefault(_levelMaker);

var _Environment = require('./enums/Environment.js');

var _Environment2 = _interopRequireDefault(_Environment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Game {
    constructor(renderer, input, socket) {
        this.socket = socket;

        this.renderer = renderer;
        this.input = input;
        this.player = new _Player2.default();
        this.scene = new _Scene2.default();
        this.scene.addObject(this.player);
        _levelMaker2.default.populate(this.scene);

        this.lastFrame = false;
    }

    addPlayer(id) {
        let player = new _Player2.default(id);
        //player.physics = null;
        this.scene.addObject(player);
    }

    removePlayer(id) {
        this.scene.dynamic.filter(p => p.id == id).forEach(p => p.alive = false);
    }

    updatePosition(players) {
        this.scene.dynamic.filter(p => p instanceof _Player2.default).forEach(p => {
            if (players[p.id]) {
                p.x = players[p.id].x;
                p.y = players[p.id].y;
                p.direction = players[p.id].direction;
            }
        });
    }

    attachEventListeners(emitter) {
        this.input.attachEventListeners(emitter);
    }

    start() {
        this.main();
    }

    main(timestamp) {
        if (!this.lastFrame) this.lastFrame = timestamp;
        let delta = timestamp - this.lastFrame;

        this.input.applyInput(this.player);

        // Check physics step
        while (delta >= 15) {
            delta -= 15;
            this.scene.update();
            this.lastFrame = timestamp;
        }
        this.renderer.draw(this.scene, 400 - this.player.x, 300 - this.player.y);
        this.renderer.drawControls(this.input);

        // Transmit our position
        this.socket.emit('newPos', { x: this.player.x, y: this.player.y, direction: this.player.direction });

        requestAnimationFrame(this.main.bind(this));
    }
}
exports.default = Game;
//# sourceMappingURL=game.js.map