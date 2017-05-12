import Component from './Component.js';
import ServiceLocator from '../utility/ServiceLocator.js';

export default class RemotePosition extends Component {
    constructor(owner, remoteId) {
        super(owner);

        this.remoteId = remoteId;

        ServiceLocator.Remote.addRemote(this);
    }

    step(data) {
        this.owner.x = data.x;
        this.owner.y = data.y;
        this.owner.direction = data.direction;
    }

    // TODO interpolation methods
}