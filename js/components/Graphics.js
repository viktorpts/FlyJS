import Component from './Component.js';
import ServiceLocator from '../utility/ServiceLocator.js';

export default class Graphics extends Component {
    constructor(owner, sprite, scale = 0.1, xOffset = 0, yOffset = 0) {
        super(owner);

        this.sprite = sprite;
        this.scale = scale;
        this.xOffset = xOffset;
        this.yOffset = yOffset;

        // TODO bit cheeky?
        ServiceLocator.Renderer.addObject(this);
    }
}