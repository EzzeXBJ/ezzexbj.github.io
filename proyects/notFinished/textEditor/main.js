function removeChar (string,index) {
    return string.substring(0,index) + string.substring(index+1);
}
class Button {
    constructor (position,size) {}
}
class TextInput {
    constructor (position,size) {
        this.position = position;
        this.size = size;
        this.style = {
            background: "#fff",
            borderColor: "#666",
            borderWidth: 2
        };
        this.text = "";
        this.tmpText = this.text;
        this.config = {
            color: "#000",
            size: {
                w: 20,
                h: 0
            },
            font: "monospace"
        }
        this.config.size.h = Math.floor(this.config.size.w/2);
    }
    get colums () { return Math.floor(this.size.w/this.config.size.h) }
    draw (canvas) {
        const ctx = canvas.getContext("2d");
        ctx.fillStyle = this.style.background;
        ctx.strokeStyle = this.style.borderColor;
        ctx.lineWidth = this.style.borderWidth;
        ctx.fillRect(this.position.x,this.position.y,this.size.w,this.size.h);
        ctx.strokeRect(this.position.x,this.position.y,this.size.w,this.size.h);

        ctx.fillStyle = this.config.color;
        ctx.font = this.config.size.w + "px " + this.config.font;
        const cursor = {
            l: 0,
            r: 1,
            c: 0
        }
        for (cursor.l = 0; cursor.l<this.tmpText.length; cursor.l++) {
            if (cursor.c==this.colums-2) {
                cursor.r++;
                cursor.c=0;
            }
            if ((this.tmpText[cursor.l]=="/")&&this.tmpText[cursor.l+1]=="n") {
                cursor.l++;
                cursor.r++;
                cursor.c=0;
                continue;
            }
            ctx.fillText(this.tmpText[cursor.l],this.config.size.h*cursor.c,this.config.size.w*cursor.r);
            cursor.c++;
        }
    }
}

const canvas = document.createElement("canvas");
document.body.appendChild(canvas);
canvas.width = innerWidth*.9;
canvas.height = innerHeight*.9;
const ctx = canvas.getContext("2d");
const fill = () => {
    ctx.fillStyle ="#000";
    ctx.fillRect(0,0,canvas.width,canvas.height);
}
const mouse = {
    click: false,
    x: null,
    y: null
};
canvas.addEventListener("mousemove", (mouseEvent)=>{
    mouse.x = mouseEvent.x;
    mouse.y = mouseEvent.y;
});
canvas.addEventListener("mousedown",(mouseEvent)=> {
    switch (mouseEvent.button) {
        case 0:
            mouse.click = true;
            mouse.left = true;
            break;
        case 1:
            mouse.mid = true;
            break;
        case 2:
            mouse.right = true;
            break;
    }
})
canvas.addEventListener("mouseup",(mouseEvent)=> {
    switch (mouseEvent.button) {
        case 0:
            mouse.click = false;
            mouse.left = false;
            break;
        case 1:
            mouse.mid = false;
            break;
        case 2:
            mouse.right = false;
            break;
    }
});
document.body.addEventListener("keydown",(key)=>{
    let code = key.key;
    switch (key.key) {
        case "Backspace":
            const len = textInput.tmpText.length;
            textInput.tmpText = removeChar(textInput.tmpText, len-1);
            if (textInput.tmpText[len-2]=="/") textInput.tmpText = removeChar(textInput.tmpText, len-2);
            textInput.draw(canvas);
            return 0;
        case "Enter":
            code = "/n";
            break;
        default:
            break;
    }
    textInput.tmpText += code;
    textInput.draw(canvas);
    console.log(textInput.tmpText);
})

const textInput = new TextInput({
    x: 0,
    y: 0
},{
    w: canvas.width*.6,
    h: canvas.height*.9
});

fill();
textInput.draw(canvas);
let a = "hola";
a = removeChar(a,-1)
console.log(a)
