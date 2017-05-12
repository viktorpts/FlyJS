import Component from './Component.js';

export default class RemoteControl extends Component {
    constructor(owner, remote) {
        super(owner);

        this.remote = remote;
    }
}