import Config from './config.js';
import Environment from './enums/Environment.js';
import Player from './objects/dynamic/Player.js';
import Scene from './objects/Scene.js';
import ObjectComposer from './composers/ObjectComposer.js';


export default class Game {
    constructor(environment, componentPack) {
        this.environment = environment;
        this.scene = new Scene();
        this.composer = new ObjectComposer(environment);
        this.lastFrame = null;
        this.delta = 0; // Milliseconds

        // TODO add components based on environment
        this.markDelta = {};
        this.init(componentPack);
    }

    init(componentPack) {
        this.remote = componentPack.remote;
        this.remote.addScene(this.scene);

        // Setup game components based on environment
        if (this.environment === Environment.SERVER) {
            this.markDelta = function () {
                let currentFrame = process.hrtime();
                let delta = (currentFrame[0] - this.lastFrame[0]) * 1e3 + (currentFrame[1] - this.lastFrame[1]) * 1e-6;
                this.lastFrame = currentFrame;
                return delta;
            };
        } else if (this.environment === Environment.CLIENT) {
            this.markDelta = function () {
                let currentFrame = performance.now();
                let delta = Math.floor(currentFrame - this.lastFrame);
                this.lastFrame = currentFrame;
                return delta;
            };
            this.renderer = componentPack.renderer;
            this.composer.setRenderer(this.renderer);
            // TODO add input, register player with server

            // TODO add player from server after request
            // TODO player object ID must be set from provider!
            this.player = this.composer.makePlayer(0, 0, 0);
            this.player.id = 'localPlayer';
            this.scene.addObject(this.player);
        }

        // Load objects into scene (locally or remotely)
        // Needs to be done after renderer is initialized for the composer!
        componentPack.composer.populate(this.scene, this.composer);
    }

    start() {
        if (this.environment === Environment.SERVER) {
            // Initialize starting time
            this.lastFrame = process.hrtime();
            // Start client sync loop
            this.timer = setInterval(this.main.bind(this), Config.SIMULATION_INTERVAL);
            this.remote.start(Config.SERVER_INTERVAL);
        } else if (this.environment === Environment.CLIENT) {
            // Initialize starting time
            this.lastFrame = Math.floor(performance.now());
            // Start command packet loop
            this.remote.start(Config.CLIENT_INTERVAL);
            // Start rendering loop
            let frameRenderer = function () {
                this.main();
                requestAnimationFrame(frameRenderer.bind(this));
            };
            frameRenderer.bind(this)();
        }
    }

    main() {
        this.delta += this.markDelta();
        // Check physics step
        while (this.delta >= Config.SIMULATION_INTERVAL) {
            this.delta -= Config.SIMULATION_INTERVAL;
            this.scene.update();
        }

        if (this.environment === Environment.CLIENT) {
            // TODO replace with draw event
            this.renderer.draw(400-this.player.x, 300-this.player.y);
        }
    }
}