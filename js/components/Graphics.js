import Component from './Component.js';

export default class Graphics extends Component {
    constructor(owner, sprite, renderer, layer) {
        super(owner);

        this.sprite = sprite;
        this.scale = 0.1;

        owner.layer = layer;

        renderer.addObject(this, layer);
    }
}