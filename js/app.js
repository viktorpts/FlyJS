import Palette from './renderer/Palette.js';
import Game from './game.js';
import Renderer from './renderer/Renderer.js';
import DebugConsole from './renderer/DebugConsole.js';
import KeyboardController from './input/Keyboard.js';
import io from '/socket.io/socket.io.js';
import Environment from './enums/Environment.js';
import ObjectComposer from './composers/ObjectComposer.js'
import ObjectType from './enums/ObjectType.js';
import Remote from './remote/Remote.js';
import SceneComposer from './composers/SceneComposer.js';

export default (function () {
    // Initiate connection
    let socket = io();
    let remote = new Remote(Environment.CLIENT, socket);

    let canvas = document.getElementById('canvas');
    let dev = new DebugConsole(canvas);
    dev.log('Starting console');
    dev.draw();

    socket.on('initScene', function (data) {
        dev.log('Populating scene with remote data');
        dev.draw();
        //console.dir(data);

        let canvas = document.getElementById('canvas');
        let renderer = new Renderer(canvas, Palette.palette);

        let game = new Game(Environment.CLIENT, {
            composer: new SceneComposer(Environment.CLIENT, data),
            renderer,
            remote
        });
        makeGame(game);
    });

    socket.on('step', function (data) {
        dev.log('Updating scene');
        dev.draw();
        //console.log('Receiving remote data...');
        remote.step(data);
    });

    function makeGame(game) {
        Palette.init(start);

        function start() {
            game.start();
        }
    }

    /*
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
     //*/
})();