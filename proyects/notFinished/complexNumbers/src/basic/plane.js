import cx from "./complex.js";
import { toColor } from "./complexToColor.js";

export default class Plane {
    constructor (width, height, center, zoom, unity, parent) {
        this.canvas = document.createElement("canvas");
        parent.appendChild(this.canvas);
        this.context = this.canvas.getContext("2d");
        this.canvas.width = width;
        this.canvas.height = height;
        this.center = center;
        this.zoom = zoom;
        this.unity = unity;
        this.drawingAxes = false;
    }
    draw (z) {
        this.update(z);
        if (this.drawingAxes) this.drawAxes();
    }
    update (z) {
        let y = 0;
        function loop (e) {
            for (let x = 0; x < e.canvas.width; x++) {
                const re = (x - e.center.re) * e.unity.re;
                const im = -((y - e.center.im) * e.unity.im);
                const c = new cx(re,im);
                e.drawPoint(eval(z), toColor(c));
                console.log(eval(z));
            }
            y++;

            if (y<e.canvas.height) requestAnimationFrame(()=>loop(e));
        }
        loop(this);
    }
    drawPoint (c, color) {
        this.context.fillStyle = color;
        this.context.fillRect(c.x,c.y,1,1);
    }
    drawLine (c1,c2) {
        this.context.beginPath();
        this.context.moveTo(c1.re,c1.im);
        this.context.lineTo(c2.re,c2.im);
        this.context.stroke();
        this.context.closePath();
    }
    drawAxes () {
        this.context.strokeStyle = "#000";
        this.drawLine(new cx(0,this.center.im), this.center);
        this.drawLine()
    }
}