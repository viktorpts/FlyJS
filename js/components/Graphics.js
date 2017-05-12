import Component from './Component.js';
import ServiceLocator from '../utility/ServiceLocator.js';

export default class Graphics extends Component {
    constructor(owner, sprite, scale = 0.1) {
        super(owner);

        this.sprite = sprite;
        this.scale = scale;

        // TODO bit cheeky?
        ServiceLocator.Renderer.addObject(this);
    }
}