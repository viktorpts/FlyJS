import Environment from '../enums/Environment.js';
import ObjectType from '../enums/ObjectType.js';

export default class SceneComposer {
    constructor(environment, data = null) {
        this.environment = environment;
        this.data = data;
    }

    populateLocally(scene, composer) {
        for (let i = 0; i < 30; i++) {
            let x = Math.random() * 10000 - 5000;
            let y = Math.random() * 400 - 100;
            let cloud = composer.makeCloud(x, y, 0);

            scene.addObject(cloud);
        }
        for (let i = 0; i < 30; i++) {
            let x = Math.random() * 10000 - 5000;
            let y = Math.random() * 400 - 100;
            let cloud = composer.makeCloud(x, y, 1);

            scene.addObject(cloud);
        }
        for (let i = 0; i < 30; i++) {
            let x = Math.random() * 10000 - 5000;
            let y = Math.random() * 400 - 100;
            let cloud = composer.makeCloud(x, y, 2);

            scene.addObject(cloud);
        }
        for (let i = 0; i < 30; i++) {
            let x = Math.random() * 10000 - 5000;
            let y = Math.random() * 400 - 100;
            let cloud = composer.makeCloud(x, y, 3);

            scene.addObject(cloud);
        }

        // Add 50 ai ships
        for (let i = 0; i < 50; i++) {
            let x = Math.random() * 10000 - 5000;
            let y = Math.random() * 400 - 100;
            let dir = Math.random() * 2 * Math.PI;
            let myShip = composer.makeAiShip(x, y, dir);
            scene.addObject(myShip);
        }

        // Add foreground trees
        for (let i = 0; i < 20; i++) {
            let x = Math.random() * 10000 - 5000;
            let y = Math.random() * 10 + 586;
            let tree = composer.makeTree(x, y, 6);
            scene.addObject(tree);

            x = Math.random() * 10000 - 5000;
            y = Math.random() * 20 + 596;
            tree = composer.makeTree(x, y, 7);
            scene.addObject(tree);
        }

        // TREES
        for (let i = 0; i < 30; i++) {
            let x = Math.random() * 10000 - 5000;
            let y = 514 - Math.random() * 20;
            let tree = composer.makeTree(x, y, 3);
            scene.addObject(tree);

            x = Math.random() * 10000 - 5000;
            y = y = 494 - Math.random() * 20;
            tree = composer.makeTree(x, y, 2);
            scene.addObject(tree);

            x = Math.random() * 10000 - 5000;
            y = y = 474 - Math.random() * 20;
            tree = composer.makeTree(x, y, 1);
            scene.addObject(tree);

            x = Math.random() * 10000 - 5000;
            y = y = 454 - Math.random() * 20;
            tree = composer.makeTree(x, y, 0);
            scene.addObject(tree);
        }

        // Add origin
        scene.addObject(composer.makeBox(0, 0, 0));
        scene.addObject(composer.makeBox(0, 0, 1));
        scene.addObject(composer.makeBox(0, 0, 2));
        scene.addObject(composer.makeBox(0, 0, 3));
        scene.addObject(composer.makeBox(0, 0, 4));
        scene.addObject(composer.makeBox(0, 0, 5));
        scene.addObject(composer.makeBox(0, 0, 6));
        scene.addObject(composer.makeBox(0, 0, 7));
    }

    populateFromRemote(scene, composer) {
        for (let obj of this.data) {
            let localObj = composer.makeRemoteObject(obj);
            scene.addObject(localObj);
        }
    }

    populate(scene, composer) {
        if (this.environment === Environment.SERVER) {
            this.populateLocally(scene, composer);
        } else if (this.environment === Environment.CLIENT) {
            this.populateFromRemote(scene, composer);
        }
    }
}