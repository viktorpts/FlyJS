import Player from './objects/dynamic/Player.js';
import Scene from './objects/Scene.js';
import Generator from './level-maker.js';
import Environment from './enums/Environment.js';

export default class Game {
    constructor(renderer, input, socket) {
        this.socket = socket;

        this.renderer = renderer;
        this.input = input;
        this.player = new Player();
        this.scene = new Scene();
        this.scene.addObject(this.player);
        Generator.populate(this.scene);

        this.lastFrame = false;
    }

    addPlayer(id) {
        let player = new Player(id);
        //player.physics = null;
        this.scene.addObject(player);
    }

    removePlayer(id) {
        this.scene.dynamic.filter(p => p.id == id).forEach(p => p.alive = false);
    }

    updatePosition(players) {
        this.scene.dynamic.filter(p => p instanceof Player).forEach(p => {
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
        this.renderer.draw(this.scene, 400-this.player.x, 300-this.player.y);
        this.renderer.drawControls(this.input);

        // Transmit our position
        this.socket.emit('newPos', {x: this.player.x, y: this.player.y, direction: this.player.direction});

        requestAnimationFrame(this.main.bind(this));
    }
}