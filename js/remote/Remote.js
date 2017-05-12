import Environment from '../enums/Environment.js';

export default class Remote {
    constructor(environment, io) {
        this.environment = environment;
        this.io = io;
        this.timer = null;
        this.scene = null;
        this.remoteComponents = new Map();
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


    // Receive scene delta from server
    step(data) {
        /*
         for (let [id, obj] of this.remoteComponents.entries()) {
         if (!obj.owner.alive) {
         this.removeRemote(id);
         continue;
         }
         obj.step(data);
         }
         //*/

        ///*
        for (let obj of data) {
            if (this.remoteComponents.has(obj.id)) {
                this.remoteComponents.get(obj.id).step(obj);
            }
        }
        //*/

        /*
         // TODO move this method to a more appropriate place/push data to scene, let scene update self?
         // TODO objects on the client have remote position components, send data to them
         for (let obj of data) {
         if (this.scene._objects.has(obj.id)) {
         let current = this.scene._objects.get(obj.id);
         current.x = obj.x;
         current.y = obj.y;
         current.direction = obj.direction;
         }
         }
         //*/
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
        // TODO poll controls, compose packet
        this.emit('command', null);
    }

    emit(event, data) {
        this.io.emit(event, data);
    }

    broadcast(socket, event, data) {
        socket.broadcast.emit(event, data);
    }
}