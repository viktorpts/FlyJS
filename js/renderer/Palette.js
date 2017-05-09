import Sprite from '../enums/Sprite.js';

let required = 0;
let loaded = 0;
let palette = {};
let callback = () => {};

function init(cb) {
    callback = cb;
    for (let sprite in Sprite) {
        if (Sprite.hasOwnProperty(sprite)) {
            palette[Sprite[sprite]] = new Image();
            palette[Sprite[sprite]].src = 'src/' + Sprite[sprite] + '.png';
            palette[Sprite[sprite]].onload = onLoad;
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