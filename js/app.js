import Game from './game.js';
import io from '/socket.io/socket.io.js';
import Environment from './enums/Environment.js';
import Remote from './remote/Remote.js';
import SceneComposer from './composers/SceneComposer.js';
import ServiceLocator from './utility/ServiceLocator.js';
import RemotePosition from './components/RemotePosition.js';

export default (function () {
    // Initiate connection
    let socket = io();
    ServiceLocator.init(Environment.CLIENT, socket);

    socket.on('initScene', function (data) {
        let game = new Game(Environment.CLIENT,
            new SceneComposer(Environment.CLIENT, data));
        makeGame(game);

        socket.on('step', function (data) {
            ServiceLocator.Remote.step(data);
        });

        socket.on('joinSuccess', function (data) {
            game.joinSuccess(data);
        });

        socket.on('newPlayer', function (data) {
            let player = game.playerJoined(data);
            player.addComponent(new RemotePosition(player, data.remoteId));
        });

        socket.on('playerLeft', function (data) {
            game.playerLeft(data.remoteId);
        });
    });

    function makeGame(game) {
        ServiceLocator.InitPalette(start);

        function start() {
            game.start();
        }
    }
})();