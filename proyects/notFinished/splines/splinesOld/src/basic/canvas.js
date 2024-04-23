import Vector from "./vectors.js";

export default class Canvas {
    constructor (width = window.innerWidth, height = window.innerHeight, resize = true, center = Vector.zero) {
        this._canvas = document.createElement("canvas");
        this._context = this._canvas.getContext("2d");
        this.width = width;
        this.height = height;
        this.center = center;
        this.resize = resize;
    }
    set width (width = window.innerWidth) { this._canvas.width = width }
    set height (height = window.innerHeight) { this._canvas.height = height }
    get width () { return this._canvas.width }
    get height () { return this._canvas.height }

    setSize (width = window.innerWidth, height = window.innerHeight) {
        this.width = width;
        this.height = height;
    }
    clear () {
        this._context.clearRect(0,0,this.width,this.height);
    }

    init (parent = document.body) {
        parent.appendChild(this._canvas);
    }
    update (clear = false, width = window.innerWidth, height = window.innerHeight) {
        if (clear) this.clear();
        if (this.resize) this.setSize(width,height);
    }
}