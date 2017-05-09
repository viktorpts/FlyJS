'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _Sprite = require('../enums/Sprite.js');

var _Sprite2 = _interopRequireDefault(_Sprite);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Renderer {
    constructor(canvas, palette) {
        this.canvas = canvas;
        this.palette = palette;
        this.ctx = this.canvas.getContext('2d');
    }

    draw(scene, x = 0, y = 0) {
        this.ctx.clearRect(0, 0, 800, 600);

        // Center camera
        this.ctx.save();
        this.ctx.translate(x, y);

        // Draw scenery
        for (let i = 0; i < scene.static.length; i++) {
            this.drawObject(scene.static[i]);
        }

        this.ctx.beginPath();
        this.ctx.moveTo(-5000, 550);
        this.ctx.lineTo(5000, 550);
        this.ctx.stroke();

        // Draw entities
        for (let i = 0; i < scene.dynamic.length; i++) {
            this.drawObject(scene.dynamic[i]);
        }

        this.ctx.restore();
    }

    drawObject(obj) {
        this.ctx.save();

        this.ctx.translate(obj.x, obj.y);
        this.ctx.rotate(obj.direction);

        let img = this.palette[obj.sprite];
        let w = img.width * obj.scale;
        let h = img.height * obj.scale;
        let x = -w * 0.5;
        let y = -h * 0.5;

        if (obj.sprite == _Sprite2.default.SMOKE) {
            this.ctx.globalAlpha = obj.life / 100;
        }

        this.ctx.drawImage(img, x, y, w, h);

        this.ctx.restore();

        // Debug info
        //this.ctx.fillText((obj.velX * obj.velX + obj.velY * obj.velY).toFixed(2), obj.x - 20, obj.y - 20);
    }

    drawControls(input) {
        this.ctx.save();

        this.ctx.strokeRect(716, 500, 12, 12); // Up
        this.ctx.strokeRect(700, 516, 12, 12); // Left
        this.ctx.strokeRect(716, 516, 12, 12); // Down
        this.ctx.strokeRect(732, 516, 12, 12); // Right
        this.ctx.strokeRect(700, 532, 44, 12); // Spacebar

        if (input.keysPressed["ArrowLeft"]) {
            this.ctx.fillRect(700, 516, 12, 12);
        }
        if (input.keysPressed["ArrowRight"]) {
            this.ctx.fillRect(732, 516, 12, 12);
        }
        if (input.keysPressed["ArrowUp"]) {
            this.ctx.fillRect(716, 500, 12, 12);
        }
        if (input.keysPressed["ArrowDown"]) {
            this.ctx.fillRect(716, 516, 12, 12);
        }
        if (input.keysPressed["Space"]) {
            this.ctx.fillRect(700, 532, 44, 12);
        }

        this.ctx.restore();
    }
}
exports.default = Renderer;
//# sourceMappingURL=Renderer.js.map