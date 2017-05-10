import SpriteType from '../enums/SpriteType.js';

let required = 0;
let loaded = 0;
let palette = {};
let callback = () => {};

function init(cb) {
    callback = cb;
    for (let sprite in SpriteType) {
        if (SpriteType.hasOwnProperty(sprite)) {
            palette[SpriteType[sprite]] = new Image();
            palette[SpriteType[sprite]].src = 'src/' + SpriteType[sprite] + '.png';
            palette[SpriteType[sprite]].onload = onLoad;
            required++;
        }
    }
}

function onLoad() {
    loaded++;
    if (loaded == required) {
        callback();
    }
}

export default {
    palette,
    init
};