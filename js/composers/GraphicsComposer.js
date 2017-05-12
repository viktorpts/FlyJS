import ObjectType from '../enums/ObjectType.js';
import SpriteType from '../enums/SpriteType.js';
import Graphics from '../components/Graphics.js';

export default {
    makeGraphics(obj) {
        let sprite = SpriteType.BOX;
        let scale = 0.1;
        let xOffset = 0;
        let yOffset = 0;
        switch (obj.type) {
            case ObjectType.CLOUD:
                sprite = SpriteType.CLOUD;
                scale = 0.5;
                break;
            case ObjectType.TREE:
                sprite = SpriteType.TREE;
                yOffset = -360;
                break;
            case ObjectType.SHIP:
                sprite = SpriteType.PLANE;
                break;
            case ObjectType.BOX:
                sprite = SpriteType.BOX;
                scale = 0.5;
                break;
        }
        return new Graphics(obj, sprite, scale, xOffset, yOffset);
    }
}