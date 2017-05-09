'use strict';

let express = require('express');
let app = express();
let server = require('http').Server(app);
let path = require('path');

app.get('/', function (req, res) {
    res.sendFile('/index.html', { 'root': path.join(__dirname, '/../..') });
});
app.use('/node_modules/systemjs/dist', express.static(path.join(__dirname, '/../..') + '/node_modules/systemjs/dist'));
app.use('/build/js', express.static(path.join(__dirname, '/../..') + '/build/js'));
app.use('/src', express.static(path.join(__dirname, '/../..') + '/src'));

let io = require('socket.io')(server);

let CONNECTIONS = new Map();
let PLAYERS = new Map();

io.sockets.on('connection', function (socket) {
    CONNECTIONS.set(socket.id, socket);
    let player = { x: 0, y: 0, direction: 0 };
    // Broadcast to other players
    socket.broadcast.emit('newPlayer', { id: socket.id });
    // Add existing players
    Array.from(PLAYERS.keys()).forEach(p => {
        socket.emit('newPlayer', { id: p });
    });
    // Add to local pool
    PLAYERS.set(socket.id, player);

    // Report active connections
    console.log('Client connected with ID ' + socket.id);
    console.log(PLAYERS);

    // Attach packet listeners
    socket.on('disconnect', function (data) {
        CONNECTIONS.delete(socket.id);
        PLAYERS.delete(socket.id);
        socket.broadcast.emit('playerLeft', { id: socket.id });
        console.log('Client ' + socket.id + ' disconnected');
    });

    socket.on('newPos', function (data) {
        player.x = data.x;
        player.y = data.y;
        player.direction = data.direction;
    });
});

server.listen(3000);

setInterval(update, 15);

function update() {
    let packet = {};
    Array.from(PLAYERS.entries()).forEach(kvp => packet[kvp[0]] = kvp[1]);
    io.emit('playerPos', packet);
}
//# sourceMappingURL=server.js.map