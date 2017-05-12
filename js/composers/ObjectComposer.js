import Entity from '../objects/Entity.js';
import Graphics from '../components/Graphics.js';
import PhysicsBody from '../components/PhysicsBody.js';
import PlayerControl from '../components/PlayerControl.js';
import SpriteType from '../enums/SpriteType.js';
import Keyboard from '../input/Keyboard.js';
import Environment from '../enums/Environment.js';
import ObjectType from '../enums/ObjectType.js';
import HorizontalScroll from '../components/HorizontalScroll.js';
import HorizontalWarp from '../components/HorizontalWarp.js';
import SimpleAi from '../components/ai/SimpleAi.js';
import RemotePosition from '../components/RemotePosition.js';


export default class ObjectComposer {
    constructor(environment) {
        this.environment = environment;
    }

    makeShip(x, y, dir) {
        let ship = new Entity(ObjectType.SHIP, x, y, dir);

        if (this.environment === Environment.SERVER) {
            let body = new PhysicsBody(ship);
            ship.addComponent(body);
        } else if (this.environment === Environment.CLIENT) {
            let graphics = new Graphics(ship, SpriteType.PLANE);
            ship.addComponent(graphics);
        }

        return ship;
    }

    // SERVER ONLY
    makeAiShip(x, y, dir) {
        let ship = new Entity(ObjectType.SHIP, x, y, dir);

        let body = new PhysicsBody(ship);
        let warp = new HorizontalWarp(ship);
        let ai = new SimpleAi(ship);

        ship.addComponent(body);
        ship.addComponent(warp);
        ship.addComponent(ai);

        return ship;
    }

    // CLIENT ONLY
    makePlayer(x, y, dir) {
        let player = new Entity(ObjectType.SHIP, x, y, dir);

        let body = new PhysicsBody(player);
        let graphics = new Graphics(player, SpriteType.PLANE);
        let input = new Keyboard();
        input.attachEventListeners(window);
        let controls = new PlayerControl(player, input);

        player.addComponent(body);
        player.addComponent(graphics);
        player.addComponent(controls);

        return player;
    }

    // CLIENT ONLY
    makeRemotePlayer(x, y, dir, remoteId) {
        let remotePlayer = new Entity(ObjectType.SHIP, x, y, dir);

        let graphics = new Graphics(remotePlayer, SpriteType.PLANE);
        // TODO add remote position component, remove direct update from Remote module
        let remotePosition = new RemotePosition(remotePlayer, remoteId);

        remotePlayer.addComponent(graphics);
        remotePlayer.addComponent(remotePosition);

        return remotePlayer;
    }

    makeCloud(x, y, layer) {
        let cloud = new Entity(ObjectType.CLOUD, x, y, 0, layer);

        if (this.environment === Environment.SERVER) {
            let scroll = new HorizontalScroll(cloud, 1);
            let warp = new HorizontalWarp(cloud);
            cloud.addComponent(scroll);
            cloud.addComponent(warp);
        } else if (this.environment === Environment.CLIENT) {
            let graphics = new Graphics(cloud, SpriteType.CLOUD, 0.5);
            cloud.addComponent(graphics);
        }

        return cloud;
    }

    makeRemoteObject(remoteObj) {
        switch (remoteObj.type) {
            case ObjectType.CLOUD:
                return this.makeCloud(remoteObj.x, remoteObj.y, remoteObj.layer, remoteObj.id);
            case ObjectType.SHIP:
                //let localObj = this.makeShip(remoteObj.x, remoteObj.y, remoteObj.direction);
                let localObj = this.makeRemotePlayer(remoteObj.x, remoteObj.y, remoteObj.direction, remoteObj.id);
                return localObj;
        }
    }
}