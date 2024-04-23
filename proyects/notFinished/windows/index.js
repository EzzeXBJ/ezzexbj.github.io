function $id (id) {
    return document.getElementById(id);
}
function clog (...args) {
    console.log(...args);
}

const width = innerWidth;
const height = innerHeight;
const canvas = $id("canvas");
canvas.width = width;
canvas.height = height;
const ctx = canvas.getContext("2d");

class Win {
    static mouse = {
        x: 0,
        y: 0
    }
    static canvas = null;
    static updateMouse (e) {
        Win.mouse.x = e.x;
        Win.mouse.y = e.y;
    }
    static init (canvas) {
        Win.canvas = canvas;
        Win.canvas.addEventListener("mousemove",(e)=>{
            Win.updateMouse(e);
        });
    }
    constructor (x,y,w,h) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.tmp = {
            w: w,
            h: h,
            mouse: {
                dx: 0,
                dy: 0,
                back: 0
            }
        };
        this.h = h;
        this.shift = false;
        this.touch = false;
        this.display = {
            h: 20,
            close: 20
        }
        this.hide = false;

        Win.canvas.addEventListener("dblclick",(e)=>{
            if (this.collisionDisplay&&(!this.touch)) {
                this.touch = true;
                this.tmp.mouse.dx = e.x-this.x;
                this.tmp.mouse.dy = e.y-this.y;
            } else this.touch = false;
            if (this.collisionClose) this.hide = true;
            clog("Doubleclick");
        });
        Win.canvas.addEventListener("mousemove",(e)=>{
            if (this.touch&&e.shiftKey) {
                this.tmp.mouse.dx = e.x-this.x;
                this.tmp.mouse.dy = e.y-this.y;
                this.shift = true;
            }
            else this.shift = false;
        })
    }
    get top () {
        return this.y;
    }
    get right () {
        return this.x+this.w;
    }
    get bottom () {
        return this.y+this.h;
    }
    get left () {
        return this.x;
    }
    get collision () {
        if ((Win.mouse.x>this.left)&&(Win.mouse.x<this.right)&&(Win.mouse.y>this.top)&&(Win.mouse.y<this.bottom)) return true;
        else return false;
    }
    get collisionDisplay () {
        if ((Win.mouse.x>this.left)&&(Win.mouse.x<this.right-this.display.close)&&(Win.mouse.y>this.top)&&(Win.mouse.y<this.y+this.display.h)) return true;
        else return false;
    }
    get collisionClose () {
        if ((Win.mouse.x>(this.right-this.display.close))&&(Win.mouse.x<(this.right))&&(Win.mouse.y>this.top)&&(Win.mouse.y<(this.top+this.display.close))) return true;
        else return false;
    }
    draw (ctx) {
        if (!this.hide) {
            const backgroundColor = "#55d";
            const borderColor = "#222";
            const displayColor = "#aad";
            ctx.fillStyle = backgroundColor;
            ctx.fillRect(this.x,this.y, this.w,this.h);

            ctx.fillStyle = displayColor;
            ctx.fillRect(this.x,this.y,this.w-this.display.close,this.display.h);

            ctx.fillStyle = "#f22";
            ctx.fillRect(this.right-this.display.close,this.y,this.display.close,this.display.h);

            ctx.strokeStyle = borderColor;
            ctx.strokeRect(this.x,this.y,this.w,this.h);
        }
    }
    update () {
        if (this.touch&&(!this.shift)) {
            this.x = Win.mouse.x - this.tmp.mouse.dx;
            this.y = Win.mouse.y - this.tmp.mouse.dy;
            this.tmp.w = this.w;
            this.tmp.h = this.h;
            this.tmp.mouse.back = {x:Win.mouse.x,y:Win.mouse.y};
        }
        else if (this.touch&&this.shift) {
            this.w = this.tmp.w + (Win.mouse.x-this.tmp.mouse.back.x);
            this.h = this.tmp.h + (Win.mouse.y-this.tmp.mouse.back.y);
        }
    }
}
Win.init(canvas);
const win = new Win(100,100,100,100);

function loop () {
    win.update();

    ctx.clearRect(0,0,width,height)
    win.draw(ctx);
    requestAnimationFrame(loop)
}

loop();