import Environment from '../enums/Environment.js';

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
    step(data) {
        for (let obj of data) {
            if (this.remoteComponents.has(obj.id)) {
                this.remoteComponents.get(obj.id).step(obj);
            }
        }
    }

    start(interval) {
        if (this.environment === Environment.SERVER) {
            this.timer = setInterval(this.sendDelta.bind(this), interval);
        } else if (this.environment === Environment.CLIENT) {
            this.timer = setInterval(this.sendCommand.bind(this), interval);
        }
    }

    stop() {
        clearInterval(this.timer);
    }

    sendDelta() {
        this.emit('step', this.scene.getDelta());
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