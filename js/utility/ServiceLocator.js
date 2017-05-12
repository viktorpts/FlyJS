import IdProvider from './IdProvider.js';
import Renderer from '../renderer/Renderer.js';
import Palette from '../renderer/Palette.js';
import Environment from '../enums/Environment.js';

let locator = {
    init: init,
    IdProvider: IdProvider,
    Palette: Palette.palette,
    InitPalette: Palette.init,
    Renderer: null
};

function init(environment) {
    if (environment === Environment.CLIENT) {
        console.log('Setting up renderer');
        let canvas = document.getElementById('canvas');
        locator.Renderer = new Renderer(canvas, Palette.palette);
    }
}

export default locator;