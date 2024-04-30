class Sprite {
    static toString(data) {
        if (data === null) {
            return "null";
        } else if (typeof data === 'undefined') {
            return "undefined";
        } else if (typeof data === 'object') {
            return JSON.stringify(data);
        } else {
            return String(data);
        }
    }
    constructor (src,width,height) {
        this.image = new Image();
        this.width = width;
        this.height = height;
        this.scale = 1;
        this.image.src = src;
        this.animations = {};
        this.addAnimation("static");
        this.state = "static";
        this.frame = {
            x: 0,
            y: 0
        }
    }
    addAnimation (name, loc=[
        {x: 0,y: 0, t: 1}
    ],finish="static",loop=false) {
        this.animations[name] = {
            loc,
            loop,
            finish,
            frame: 0,
            duration: this.getDuration(loc)
        }
    }
    addAnimations (...animations) {
        animations.forEach(v=>{
            this.addAnimation(v.name,v.loc,v.finish,v.loop);
        })
    }
    getDuration (loc) {
        let count = 0;
        loc.forEach(v=>{
            count+=v.t;
        });
        return count;
    }
    update () {
        // if () {}
    }
    animate () {
        const animation = this.animations[Sprite.toString(this.state)];

        if ((gameFrame+1)%animation.loc[animation.frame].t == 0) {
            if (animation.loop) animation.frame = (animation.frame+1)%animation.loc.length
            else if (animation.frame<animation.loc.length-1) animation.frame++
            else {
                animation.frame = 0;
                this.state = animation.finish;
            }
        }

        let position = animation.frame;
        this.frame.x = animation.loc[position].x;
        this.frame.y = animation.loc[position].y;
    }
    draw (ctx,gameFrame) {
        this.animate(gameFrame);

        ctx.drawImage(this.image,this.frame.x,this.frame.y,this.width,this.height,0,0,this.width*this.scale,this.height*this.scale);
    }
    tick (ctx) {
        this.update();
        this.draw(ctx);
    }
}
const canvas = document.querySelector("#canvas");
canvas.width = 300;
canvas.height = 300;
const ctx = canvas.getContext("2d");
ctx.imageSmoothingEnabled = false;

const zoom = 8;
let gameFrame = 0;

const spriteSrc = "src/images/peashooter.png";
const spriteAnimations = [
    {
        name: "static",
        loc: [
            {x: 0,y: 2, t: 1}
        ],
        loop: false,
        finish: "calm"
    },
    {
        name: "calm",
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
        loop: true
    },
    {
        name: "shoot",
        loc: [
            {x: 0,y: 33,t: 80},
            {x: 26-1,y: 33,t: 8},
            {x: 26*2-3,y: 33,t: 8}
        ],
        loop: false,
        finish: "calm"
    }
];
const sprite = new Sprite(spriteSrc,30,30);
sprite.scale = 8;
sprite.state = "shoot";
sprite.addAnimations(...spriteAnimations);

function loop () {
    ctx.clearRect(0,0,canvas.width,canvas.height);
    sprite.update();
    sprite.draw(ctx,gameFrame);

    gameFrame++;
    requestAnimationFrame(loop);
}

window.onload = loop;

document.body.addEventListener("click",()=>{
    sprite.state = "shoot";
})