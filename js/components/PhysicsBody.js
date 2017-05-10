import Component from './Component.js';

export default class PhysicsBody extends Component {
    constructor(owner) {
        super(owner);

        this.velX = 0;
        this.velY = 0;
    }

    registerHandlers(observer) {
        // Listen for player/ai/remote input
        observer.subscribe('accelerate', this.accelerate.bind(this));
    }

    update() {
        super.update();

        // Air resistance
        this.velX *= 0.98;
        this.velY *= 0.98;
        if (Math.abs(this.velX) < 0.003) {
            this.velX = 0;
        }
        if (Math.abs(this.velY) < 0.003) {
            this.velY = 0;
        }

        // Gravity
        this.velY += 0.05;

        // Ground
        if (this.owner.y > 550) {
            if (this.velY > 0) {
                this.velY = 0;
            }
            this.owner.y = 550;
        }

        this.owner.x += this.velX;
        this.owner.y += this.velY;
    }

    accelerate(amount) {
        this.velX += Math.cos(this.owner.direction) * amount;
        this.velY += Math.sin(this.owner.direction) * amount;
    }
}