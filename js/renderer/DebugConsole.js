export default class DebugConsole {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = this.canvas.getContext('2d');
        this.ctx.font="24px Arial";
        this.buffer = [];
    }

    log(text) {
        this.buffer.unshift('[' + new Date().toLocaleTimeString() + '] ' + text);
    }

    draw() {
        this.ctx.clearRect(0, 0, 800, 600);

        for (let row = 0; row < this.buffer.length && row < 20; row++) {
            this.ctx.fillText(this.buffer[row], 5, 550 - 24 * row);
        }
    }
}