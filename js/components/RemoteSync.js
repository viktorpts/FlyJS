import Component from './Component.js';
import ServiceLocator from '../utility/ServiceLocator.js';

export default class RemoteSync extends Component {
    constructor(owner, remoteId) {
        super(owner);

        this.remoteId = remoteId;

        ServiceLocator.Remote.addRemote(this);
    }

    step(data) {
        // TODO sync with server if there's a discrepancy
        ServiceLocator.Renderer.debug[1] = 'Remote location: ' + data.x.toFixed(0) + ':' + data.y.toFixed(0);
        /*
        this.owner.x = data.x;
        this.owner.y = data.y;
        this.owner.direction = data.direction;
        */
    }
}