import Cloud from './objects/static/Cloud.js';
import Tree from './objects/static/Tree.js';

export default {
    populate: function (scene) {
        for (let i = 0; i < 50; i++) {
            let x = Math.random() * 10000 - 5000;
            let y = Math.random() * 400 - 100;
            let cloud = new Cloud(x, y);
            cloud.wind = 0.1;

            scene.addObject(cloud);
        }

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
    }
}