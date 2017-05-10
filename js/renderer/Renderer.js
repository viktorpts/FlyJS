import Layer from './Layer.js';

export default class Renderer {
    constructor(canvas, palette) {
        this.canvas = canvas;
        this.palette = palette;
        this.ctx = this.canvas.getContext('2d');

        this.layers = [
            new Layer(0.2),
            new Layer(0.4),
            new Layer(0.6),
            new Layer(0.8),
            new Layer(1), // Particle effects
            new Layer(1), // Main layer [5]
            new Layer(2),
            new Layer(4)
        ];
    }

    addObject(graphicsComponent, layerId) {
        this.layers[layerId].addObject(graphicsComponent);
    }

    beginDraw(x = 0, y = 350) {
        this.ctx.clearRect(0, 0, 800, 600);

        // Center camera
        this.ctx.save();
        this.ctx.translate(x, y);
        this.ctx.scale(1, 1);

        // Draw ground
        this.ctx.beginPath();
        this.ctx.moveTo(-5000, 550);
        this.ctx.lineTo(5000, 550);
        this.ctx.stroke();
    }

    endDraw() {
        this.ctx.restore();
    }

    drawObject(graphicsComponent) {
        let obj = graphicsComponent.owner;

        this.ctx.save();

        this.ctx.translate(obj.x, obj.y);
        this.ctx.rotate(obj.direction);

        let img = this.palette[graphicsComponent.sprite];
        let w = img.width * graphicsComponent.scale;
        let h = img.height * graphicsComponent.scale;
        let x = -w * 0.5;
        let y = -h * 0.5;

        this.ctx.drawImage(img, x, y, w, h);

        this.ctx.restore();

        // Debug info
        //this.ctx.fillText((obj.velX * obj.velX + obj.velY * obj.velY).toFixed(2), obj.x - 20, obj.y - 20);
    }

    // TODO dynamic screen size
    draw(x = 0, y = 0) {
        this.ctx.clearRect(0, 0, 800, 600);

        // Center camera
        this.ctx.save();

        for (let layer of this.layers) {
            this.drawLayer(layer, x, y);
        }

        // Draw ground
        this.ctx.translate(x, y);
        this.ctx.beginPath();
        this.ctx.moveTo(-5000, 550);
        this.ctx.lineTo(5000, 550);
        this.ctx.stroke();

        this.ctx.restore();
    }

    drawLayer(layer, x, y) {
        this.ctx.save();
        // TODO check scaling and scrolling
        this.ctx.scale(layer.scale, layer.scale);
        this.ctx.translate(x, y);

        for (let obj of layer.graphicsComponents) {
            this.drawObject(obj[1]);
        }

        this.ctx.restore();
    }

    drawControls(input) {
        this.ctx.save();

        this.ctx.strokeRect(716, 500, 12, 12); // Up
        this.ctx.strokeRect(700, 516, 12, 12); // Left
        this.ctx.strokeRect(716, 516, 12, 12); // Down
        this.ctx.strokeRect(732, 516, 12, 12); // Right
        this.ctx.strokeRect(700, 532, 44, 12); // Spacebar

        if(input.keysPressed["ArrowLeft"]) {
            this.ctx.fillRect(700, 516, 12, 12);
        }
        if(input.keysPressed["ArrowRight"]) {
            this.ctx.fillRect(732, 516, 12, 12);
        }
        if(input.keysPressed["ArrowUp"]) {
            this.ctx.fillRect(716, 500, 12, 12);
        }
        if(input.keysPressed["ArrowDown"]) {
            this.ctx.fillRect(716, 516, 12, 12);
        }
        if(input.keysPressed["Space"]) {
            this.ctx.fillRect(700, 532, 44, 12);
        }

        this.ctx.restore();
    }
}