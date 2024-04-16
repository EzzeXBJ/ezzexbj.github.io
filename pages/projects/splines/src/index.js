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

const v1 = Vector.up;
const v2 = Vector.right;

gameLoop();

function gameLoop () {
    clock.start();
    update();
}
function update () {
    clock.update();
    updateVectors(clock.deltaTime);
    canvas.clear();
    drawPoints(draw);
    requestAnimationFrame(update);
}

function updateVectors (delta) {
    v1.arg = v1.arg+0.01;
    v2.arg = v2.arg+0.01;
}
function drawVectors (draw) {
    draw.line(v1,zoom);
    draw.line(v2,zoom);
}
function drawPoints (draw) {
    draw.point(v1,zoom);
    draw.point(v2,zoom);
}

setInterval(()=>{
    console.clear();
    console.log(v2.mod);
},500);
