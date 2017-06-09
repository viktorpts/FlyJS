import Game from './game.js';
import Environment from './enums/Environment.js';
import Remote from './remote/Remote.js';
import SceneComposer from './composers/SceneComposer.js';
import ServiceLocator from './utility/ServiceLocator.js';
import RemoteControl from './components/RemoteControl.js';
import Keyboard from './input/Keyboard.js';

console.log('Loading components...');

let express = require('express');
let app = express();
let server = require('http').Server(app);
let path = require('path');

app.get('/', function (req, res) {
    res.sendFile('/index.html', {'root': path.join(__dirname, '/../..')});
});
app.use('/node_modules/systemjs/dist', express.static(path.join(__dirname, '/../..') + '/node_modules/systemjs/dist'));
app.use('/build/js', express.static(path.join(__dirname, '/../..') + '/build/js'));
app.use('/src', express.static(path.join(__dirname, '/../..') + '/src'));

console.log('Opening sockets...');
let io = require('socket.io')(server);

ServiceLocator.init(Environment.SERVER, io);

let CONNECTIONS = new Map();
let PLAYERS = new Map();

io.sockets.on('connection', function (socket) {
    CONNECTIONS.set(socket.id, socket);
    let playerPosition = {x: 0, y: -500, direction: 0};
    // Send scene to new player
    socket.emit('initScene', { order: game.currentOffset, scene: game.scene.serialize() });

    let player = game.playerJoined(playerPosition);
    let input = new Keyboard();
    player.addComponent(new RemoteControl(player, input));
    playerPosition.remoteId = player.id;
    // Broadcast to other players
    socket.broadcast.emit('newPlayer', playerPosition);
    // Add existing players
    Array.from(PLAYERS.values()).forEach(p => {
        socket.emit('newPlayer', p);
    });
    // Send back tracking ID and position
    socket.emit('joinSuccess', playerPosition);

    // Add to local pool AFTER transmitting to new player, to prevent adding himself twice
    PLAYERS.set(socket.id, playerPosition);

    // Report new connection
    console.log('Client connected with ID ' + socket.id);

    // Attach packet listeners
    socket.on('disconnect', function (data) {
        CONNECTIONS.delete(socket.id);
        socket.broadcast.emit('playerLeft', PLAYERS.get(socket.id));
        PLAYERS.delete(socket.id);
        game.playerLeft(player.id);
        console.log('Client ' + socket.id + ' disconnected');
    });

    socket.on('command', function (data) {
        if (data) {
            input.keysPressed = data.keysPressed;
        }
    });
});

let game = new Game(Environment.SERVER,
    new SceneComposer(Environment.SERVER));

console.log('Initializing game...');
game.start();

console.log('Starting server on port 3000...');
server.listen(3000);

console.log('Ready.');