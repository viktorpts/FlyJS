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


export default class ObjectComposer {
    constructor(environment) {
        this.environment = environment;
        this.init();
    }

    init() {
        if (this.environment == Environment.CLIENT) {
            // Pull renderer
            //this.renderer = null;
            // TODO renderer added externally
        } else if (this.environment == Environment.SERVER) {
            // Pull sockets
        }
    }

    setRenderer(renderer) {
        this.renderer = renderer;
    }

    makeShip(x, y, dir) {
        let ship = new Entity(ObjectType.SHIP, x, y, dir);

        if (this.environment === Environment.SERVER) {
            let body = new PhysicsBody(ship);
            ship.addComponent(body);
        } else if (this.environment === Environment.CLIENT) {
            let graphics = new Graphics(ship, SpriteType.PLANE, this.renderer, 5);
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
        let graphics = new Graphics(player, SpriteType.PLANE, this.renderer, 5);
        let input = new Keyboard();
        input.attachEventListeners(window);
        let controls = new PlayerControl(player, input);

        player.addComponent(body);
        player.addComponent(graphics);
        player.addComponent(controls);

        return player;
    }

    // CLIENT ONLY
    makeRemotePlayer(x, y, dir) {
        let remotePlayer = new Entity(ObjectType.SHIP, x, y, dir);

        let graphics = new Graphics(remotePlayer, SpriteType.PLANE, this.renderer, 5);
        // TODO add remote position component, remove direct update from Remote module
        let remotePosition = null;

        remotePlayer.addComponent(graphics);

        return remotePlayer;
    }

    makeCloud(x, y, layer) {
        let cloud = new Entity(ObjectType.CLOUD, x, y);

        if (this.environment === Environment.SERVER) {
            let scroll = new HorizontalScroll(cloud, 1);
            let warp = new HorizontalWarp(cloud);
            cloud.addComponent(scroll);
            cloud.addComponent(warp);
            cloud.layer = layer;
        } else if (this.environment === Environment.CLIENT) {
            let graphics = new Graphics(cloud, SpriteType.CLOUD, this.renderer, layer);
            graphics.scale = 0.5;
            cloud.addComponent(graphics);
        }

        return cloud;
    }

    makeRemoteObject(remoteObj) {
        switch (remoteObj.type) {
            case ObjectType.CLOUD:
                return this.makeCloud(remoteObj.x, remoteObj.y, remoteObj.layer);
            case ObjectType.SHIP:
                let localObj = this.makeShip(remoteObj.x, remoteObj.y, remoteObj.direction);
                return localObj;
        }
    }
}