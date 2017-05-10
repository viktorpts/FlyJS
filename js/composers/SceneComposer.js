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

        /*
         for (let i = 0; i < 50; i++) {
         let x = Math.random() * 10000 - 5000;
         let y = Math.random() * 400 - 100;
         let cloud = new Cloud(x, y);
         cloud.wind = 0.2;

         scene.addObject(cloud);
         }

         for (let i = 0; i < 100; i++) {
         let x = Math.random() * 10000 - 5000;
         let y = Math.random() * 200 + 550;
         let tree = new Tree(x, y);

         scene.addObject(tree);
         }
         //*/
    }

    populateFromRemote(scene, composer) {
        for (let obj of this.data) {
            let localObj = composer.makeRemoteObject(obj);
            localObj.id = obj.id; // Explicitly set id, TODO THIS WILL CONFLICT WITH LOCAL PROVIDER
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