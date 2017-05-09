"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
class Physics {
    constructor(obj) {
        this.obj = obj;
    }

    step() {
        // Air resistance
        this.obj.velX *= 0.98;
        this.obj.velY *= 0.98;
        if (Math.abs(this.obj.velX) < 0.003) {
            this.obj.velX = 0;
        }
        if (Math.abs(this.obj.velY) < 0.003) {
            this.obj.velY = 0;
        }

        // Gravity
        this.obj.velY += 0.05;

        // Ground
        if (this.obj.y > 550) {
            if (this.obj.velY > 0) {
                this.obj.velY = 0;
            }
            this.obj.y = 550;
        }

        this.obj.x += this.obj.velX;
        this.obj.y += this.obj.velY;
    }

    accelerate(amount) {
        this.obj.velX += Math.cos(this.obj.direction) * amount;
        this.obj.velY += Math.sin(this.obj.direction) * amount;
    }
}
exports.default = Physics;
//# sourceMappingURL=Physics.js.map