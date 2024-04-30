const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext("2d");

canvas.width = 300;
canvas.height = 300;
const zoom = 8;

const spriteImage = new Image();
spriteImage.src = "src/images/peashooter.png";
const spriteWidth = 30;
const spriteHeight = 30;
let spriteState = "calm";

let gameFrame = 0;
const staggerFrames = 100;

const spriteAnimations = {
    calm: {
        loc: [
            {x: 0,y: 2, t: 8},
            {x: 26,y: 2, t: 8},
            {x: 26*2-1,y: 2, t: 8},
            {x: 26*3+2,y: 2, t: 8},
            {x: 26*4+4,y: 2, t: 8},
            {x: 26*5+7,y: 2, t: 8},
            {x: 26*6+8,y: 2, t: 8},
            {x: 26*7+9,y: 2, t: 8}
        ],
        frame: 0,
        duration: 8*8
    },
    shoot: {
        loc: [
            {x: 0,y: 33,t: 80},
            {x: 26-1,y: 33,t: 8},
            {x: 26*2-3,y: 33,t: 8}
        ],
        frame: 0,
        duration: 80+8*2
    },
    seed: {
        loc: [
            {x: 26*4+8,y: 33, t: 100},
            {x: 26*5+7,y: 33, t: 100}
        ],
        frame: 0
    }
};



function animate () {
    ctx.clearRect(0,0,canvas.width,canvas.height);
    const animation = spriteAnimations[spriteState];

    if (spriteState=="calm") {
        if ((gameFrame+1)%(animation.duration*3)==0) spriteState = "shoot"; 
    } else if (spriteState=="shoot") {
        if ((gameFrame+1)%(animation.duration)==0) spriteState = "calm";
    }
    if (gameFrame%animation.loc[animation.frame].t == 0) {
        animation.frame = (animation.frame+1)%animation.loc.length
    }
    let position = animation.frame;
    let frameX = animation.loc[position].x;
    let frameY = animation.loc[position].y;

    ctx.imageSmoothingEnabled = false;
    ctx.drawImage(spriteImage,frameX,frameY,spriteWidth,spriteHeight,0,0,spriteWidth*zoom,spriteHeight*zoom);

    gameFrame++;
    requestAnimationFrame(animate);
}
window.onload = animate;