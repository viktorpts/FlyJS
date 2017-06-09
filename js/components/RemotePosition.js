import Component from './Component.js';
import ServiceLocator from '../utility/ServiceLocator.js';
import config from '../config.js';

export default class RemotePosition extends Component {
    constructor(owner, remoteId) {
        super(owner);

        this.remoteId = remoteId;
        this.baseFrame = {order: 0, data: this.owner.serialize()};
        this.nextFrame = {order: 1, data: this.owner.serialize()};

        ServiceLocator.Remote.addRemote(this);
    }

    step(order, data) {
        // Add new frame to frame buffer pool and discard old frames

        // If new frame is newer than the next frame, swap frames
        if (this.nextFrame.order < order) {
            [this.nextFrame.order, order] = [order, this.nextFrame.order];
            [this.nextFrame.data, data] = [data, this.nextFrame.data];
        }
        // If new frame is newer than base frame, assume new frame
        if (this.baseFrame.order < order) {
            this.baseFrame.order = order;
            this.baseFrame.data = data;
        }
    }

    update(offset) {
        let currentOffset = offset - this.baseFrame.order;
        let knownOffset = this.nextFrame.order - this.baseFrame.order;

        let x, y, direction;
        x = this.baseFrame.data.x + (this.nextFrame.data.x - this.baseFrame.data.x) * currentOffset / knownOffset;
        y = this.baseFrame.data.y + (this.nextFrame.data.y - this.baseFrame.data.y) * currentOffset / knownOffset;
        direction = this.baseFrame.data.direction + (this.nextFrame.data.direction - this.baseFrame.data.direction) * currentOffset / knownOffset;

        this.owner.x = x;
        this.owner.y = y;
        this.owner.direction = direction;
    }
}