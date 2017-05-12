import Game from './game.js';
import DebugConsole from './renderer/DebugConsole.js';
import io from '/socket.io/socket.io.js';
import Environment from './enums/Environment.js';
import Remote from './remote/Remote.js';
import SceneComposer from './composers/SceneComposer.js';
import ServiceLocator from './utility/ServiceLocator.js';

export default (function () {
    ServiceLocator.init(Environment.CLIENT);

    // Initiate connection
    let socket = io();
    let remote = new Remote(Environment.CLIENT, socket);

    /* Debug console */
    let canvas = document.getElementById('canvas');
    let dev = new DebugConsole(canvas);
    dev.log('Starting console');
    dev.draw();
    /* Debug console */

    socket.on('initScene', function (data) {
        dev.log('Populating scene with remote data');
        dev.draw();

        let game = new Game(Environment.CLIENT,
            new SceneComposer(Environment.CLIENT, data),
            remote);
        makeGame(game);
    });

    socket.on('step', function (data) {
        dev.log('Updating scene');
        dev.draw();
        remote.step(data);
    });

    function makeGame(game) {
        ServiceLocator.InitPalette(start);

        function start() {
            game.start();
        }
    }
})();