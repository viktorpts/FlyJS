import Environment from '../enums/Environment.js';
import config from '../config.js';

export default class Remote {
    constructor(environment, io) {
        this.environment = environment;
        this.io = io;
        this.timer = null;
        this.scene = null;
        this.remoteComponents = new Map();
        this.input = {};
    }

    addRemote(remoteComponent) {
        this.remoteComponents.set(remoteComponent.remoteId, remoteComponent);
    }

    removeRemote(remoteId) {
        this.remoteComponents.delete(remoteId);
    }

    addScene(scene) {
        this.scene = scene;
    }

    registerControls(input) {
        this.input = input;
    }

    // Receive scene delta from server
    step(order, scene) {
        for (let obj of scene) {
            if (this.remoteComponents.has(obj.id)) {
                this.remoteComponents.get(obj.id).step(order, obj);
            }
        }
    }

    start(interval) {
        if (this.environment === Environment.SERVER) {
            this.timer = setInterval(this.sendDelta.bind(this), interval);
            // TODO remote and game clocks are desynced on the server
            this.order = 0;
        } else if (this.environment === Environment.CLIENT) {
            this.timer = setInterval(this.sendCommand.bind(this), interval);
        }
    }

    stop() {
        clearInterval(this.timer);
    }

    sendDelta() {
        this.emit('step', { order: this.order+=config.SERVER_INTERVAL, scene: this.scene.getDelta() });
    }

    sendCommand() {
        this.emit('command', this.input);
    }

    emit(event, data) {
        this.io.emit(event, data);
    }

    broadcast(socket, event, data) {
        socket.broadcast.emit(event, data);
    }
}