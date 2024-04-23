import Vector2 from "./Math/Vector2.js";

const WIDTH = innerWidth;
const HEIGHT = innerHeight;
const HALFWIDTH = WIDTH/2;
const HALFHEIGHT = HEIGHT/2;
const SCALE = 50;
const CENTER = new Vector2(HALFWIDTH,HALFHEIGHT);

const CANVAS = document.getElementById("canvas");
canvas.width = WIDTH;
canvas.height = HEIGHT;
const CTX = CANVAS.getContext("2d");

const CLOCK = {
    frame: -1,
    lastTime: -1,
    curTime: -1,
    delta: -1,
    time: 0,
    timer: 0,
    duration: 1000,
    start: function () {
        this.lastTime = performance.now();
        this.curTime = this.lastTime+60;
    },
    update: function () {
        this.frame++;
        this.curTime = (this.frame===0)?this.curTime:performance.now();
        this.delta = (this.curTime-this.lastTime)/1000;
        this.time += (this.curTime-this.lastTime);
        this.timer += (this.curTime-this.lastTime);
        this.lastTime = this.curTime;
    }
}

const v1 = new Vector2(-1,1);
const v2 = new Vector2(1,1);
const v3 = new Vector2(1,-1);
const v4 = new Vector2(-1,-1);
const cube = [v1,v2,v3,v4];
const currentCube = [v1.clone(),v2.clone(),v3.clone(),v4.clone()];
const targetCube = [v1.clone(),v2.clone(),v3.clone(),v4.clone()];
targetCube.forEach((v,i)=>{
    targetCube[i].toScaleMatrix3(.5).toTranslateMatrix3(1,1).toRotateZMatrix3(Math.PI/4);
})

const drawLine = (p1,p2,color="#000",width=2) => {
    CTX.strokeStyle = color;
    CTX.lineWidth = width;
    CTX.beginPath();
    CTX.moveTo(SCALE*(p1.x) + CENTER.x,SCALE*(-p1.y) + CENTER.y);
    CTX.lineTo(SCALE*(p2.x) + CENTER.x,SCALE*(-p2.y) + CENTER.y);
    CTX.stroke();
    CTX.closePath();
}
const drawVector = (v, color="#000", width=5) => {
    drawLine(Vector2.zero,v,color,width);
}
const drawCube = (c, color="#000", width=2) => {
    drawLine(c[0],c[1],color,width);
    drawLine(c[1],c[2],color,width);
    drawLine(c[2],c[3],color,width);
    drawLine(c[3],c[0],color,width);
}

const update = () => {
    CLOCK.update();
    if (CLOCK.timer<CLOCK.duration) currentCube.forEach((v,i)=>{
        currentCube[i].lerpVectors(cube[i],targetCube[i],CLOCK.timer/CLOCK.duration);
    })
    else {
        CLOCK.timer = 0;
        currentCube.forEach((v,i)=>{
            currentCube[i] = targetCube[i].clone();
        });
    }
}
const draw = () => {
    CTX.clearRect(0,0,WIDTH,HEIGHT);
    drawCube(cube, "#f005");
    drawCube(currentCube, "#0f05");
    drawCube(targetCube, "#00f5");
    // drawVector(rs[0],"#a00");
    // drawVector(rs[1],"#0a0");
    // drawVector(rs[2],"#00a");
    // drawVector(rs[3],"#a0a");
    
    // drawVector(v1,"#f00");
    // drawVector(v2,"#0f0");
    // drawVector(v3,"#00f");
    // drawVector(v4,"#f0f");
    
    // for (let i = 0; i < vs.length; i++) {
    //     drawVector(vs[i]);
    // }
}
const loop = () => {
    update();
    draw();
    requestAnimationFrame(loop);
}
CLOCK.start();
loop();

// setInterval(()=>{
//     console.clear();
//     console.log(CLOCK.time)
// },500);