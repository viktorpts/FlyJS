import RemotePosition from './RemotePosition.js';
import ServiceLocator from '../utility/ServiceLocator.js';

export default class RemoteSync extends RemotePosition {
    constructor(owner, remoteId) {
        super(owner, remoteId);
    }

    step(order, data) {
        ServiceLocator.Renderer.debug[1] = 'Remote location: ' + data.x.toFixed(0) + ':' + data.y.toFixed(0);

        super.step(order, data);
    }
}