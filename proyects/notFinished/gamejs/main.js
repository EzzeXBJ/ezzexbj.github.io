import Game from "./game.js";

class Display {
    #controller;
    #canvas;
    #context;
    #clock;
    constructor (controller=null) {
        this.#controller = controller;
        this.#canvas = document.createElement("canvas");
        this.setSize(innerWidth,innerHeight);
        this.init();
        this.#context = this.#canvas.getContext("2d");
        this.#clock = {
            time: 0,
            frame: -1,
            lastTime: 0,
            curTime: 1,
            diference: 1,
            fps: 60,
            delta: 1/60,
            start: function () {
                this.lastTime = performance.now();
            },
            update: function () {
                this.frame++;
                this.curTime = performance.now();
                this.diference = this.curTime-this.lastTime;
                this.fps = 1000/this.diference;
                this.delta = this.diference/1000;
                this.lastTime = this.curTime;
                this.time += this.diference;
            }
        };
    }
    get width () {
        return this.#canvas.width
    }
    get height () {
        return this.#canvas.height;
    }
    setSize (width=innerWidth,height=innerHeight) {
        this.#canvas.width = (width==null)?this.width:width;
        this.#canvas.height = (height==null)?this.height:height;

        return this;
    }
    setFullscreen () {
        this.#canvas.width = innerWidth;
        this.#canvas.height = innerHeight;

        return this;
    }
    get clock () {
        return {
            frame: this.#clock.frame,
            time: this.#clock.time,
            fps: this.#clock.fps,
            delta: this.#clock.delta,
            lastTime: this.#clock.lastTime,
            curTime: this.#clock.curTime
        };
    }
    get context () {
        return this.#context;
    }
    get controller () {
        return this.#controller;
    }
    get data () {
        return {
            width: this.width,
            height: this.height,
            clock: this.clock,
            context: this.context,
            controller: this.controller
        }
    }
    //nowrite
    init() {
        document.body.appendChild(this.#canvas);
        this.#canvas.style.background = "#111";
        this.#canvas.style.position = "absolute";
        this.#canvas.style.top = 0;
        this.#canvas.style.left = 0;
    }
    tick () {
        this.#controller.start.bind(this.#controller)(this.data);
        this.#clock.start();
        this._tick_();
    }
    _tick_() {
        this.#clock.update();
        this.#controller.update.bind(this.#controller)(this.data);
        this.#context.clearRect(0,0,this.width,this.height)
        this.#controller.draw.bind(this.#controller)(this.data);
        requestAnimationFrame(this._tick_.bind(this));
    }
}
const game = new Game();
const screen = new Display(game).setSize();
screen.tick();