import Bezier3 from "./basic/bezier.js";
import Canvas from "./basic/canvas.js";
import Draw from "./basic/draw.js";
import Time from "./basic/time.js";
import Vector from "./basic/vectors.js";

const width = window.innerWidth;
const halfWidth = width/2;
const height = window.innerHeight;
const halfHeight = height/2;
const center = new Vector(halfWidth,halfHeight);
const zoom = 100;

const canvas = new Canvas(width,height,true,center);
const draw = new Draw(canvas);
const clock = new Time();

canvas.init();

const bzc = new Bezier3(Vector.left,Vector.up, Vector.right);
bzc.duration = 2000;
gameLoop();

function gameLoop () {
    clock.start();
    update();
}
function update () {
    clock.update();
    updateVectors(clock.deltaTime);
    //canvas.clear();
    drawVectors(draw);
    requestAnimationFrame(update);
}

function updateVectors (delta) {
    if (clock.time < 2) bzc.update(1);
}
function drawVectors (draw) {
    draw.point(new Vector(bzc.x,bzc.y),zoom)
}
function drawPoints (draw) {
    draw.point(v1,zoom);
    draw.point(v2,zoom);
}
