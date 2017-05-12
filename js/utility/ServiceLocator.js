import IdProvider from './IdProvider.js';
import Renderer from '../renderer/Renderer.js';
import Palette from '../renderer/Palette.js';
import Environment from '../enums/Environment.js';
import Remote from '../remote/Remote.js';

let locator = {
    init: init,
    IdProvider: IdProvider,
    Palette: Palette.palette,
    InitPalette: Palette.init,
    Renderer: null,
    Remote: null
};

function init(environment, socket) {
    locator.Remote = new Remote(environment, socket);
    if (environment === Environment.CLIENT) {
        let canvas = document.getElementById('canvas');
        locator.Renderer = new Renderer(canvas, Palette.palette);
    }
}

export default locator;