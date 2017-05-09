import Palette from './renderer/Palette.js';
import Game from './game.js';
import Renderer from './renderer/Renderer.js';
import KeyboardController from './input/Keyboard.js';
import io from '/socket.io/socket.io.js';

export default (function () {
    // Initiate connection
    let socket = io();

    Palette.init(start);

    let canvas = document.getElementById('canvas');
    let renderer = new Renderer(canvas, Palette.palette);
    let input = new KeyboardController();

    let game = new Game(renderer, input, socket);
    game.attachEventListeners(window);

    // Register new players
    socket.on('newPlayer', function (data) {
        game.addPlayer(data.id);
    });

    socket.on('playerLeft', function (data) {
        game.removePlayer(data.id)
    });

    socket.on('playerPos', function (data) {
        game.updatePosition(data);
    });

    function start() {
        game.start();
    }
})();