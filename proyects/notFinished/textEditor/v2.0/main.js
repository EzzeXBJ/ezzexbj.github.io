//linea 379, no funciona la escritura del texto

function ifIsUndefined (value,returnValue) {
    return (value===undefined)?returnValue:value;
}
function ifIsDefined (value,returnValue,returnElse=value) {
    return (value!==undefined)?returnValue:returnElse;
}
function removeChar (string,index) {
    return string.substring(0,index) + string.substring(index+1);
}

class Vector2 {
    constructor (x=0,y=0) {
        this.x = x;
        this.y = y;
    }
    get width () {
        return this.x;
    }
    get height () {
        return this.y;
    }
}
class Rect {
    #position;
    #size;
    constructor (position,size) {
        this.#position = position;
        this.#size = size;
    }
    get position () {
        return this.#position;
    }
    get size () {
        return this.#size;
    }
    get width () {
        return this.#size.width;
    }
    get height () {
        this.#size.height;
    }
    get left () {
        return this.#position.x;
    }
    get right () {
        return this.#position.x + this.#size.width;
    }
    get top () {
        return this.#position.y;
    }
    get bottom () {
        return this.#position.y + this.#size.height;
    }
    contain (point) {
        return (point.x>this.left)&&(point.x<this.right)&&(point.y>this.top)&&(point.y<this.bottom)?true:false;
    }
    draw (draw) {
    }
}
class Style {
    constructor (obj) {
        this.color = ifIsUndefined(obj.color,"#000");
        this.background = ifIsUndefined(obj.background,"#fff");
        this._background = this.background;
        this.onHover = ifIsUndefined(obj.onHover,"#333");
        this.border = {
            color: ifIsUndefined(obj.borderColor,"#000"),
            width: ifIsUndefined(obj.borderColor,0)
        };
        this.margin = (typeof obj.margin !== undefined)?obj.margin:{
            top: obj.marginTop,
            right: obj.marginRight,
            bottom: obj.marginBottom,
            left: obj.marginLeft,
        };
        this.padding = (typeof obj.padding !== undefined)?obj.padding:{
            top: obj.paddingTop,
            right: obj.paddingRight,
            bottom: obj.paddingBottom,
            left: obj.paddingLeft,
        };
        this.font = {
            color: this.color,
            size: ifIsUndefined(obj.fontSize,10),
            width: ifIsUndefined(obj.fontSize,Math.floor(obj.fontSize/2)),
            family: ifIsUndefined(obj.fontFamily,"monospace")
        }
    }
}
class Canvas {
    #HTMLElement;
    constructor () {
        this.#HTMLElement = document.createElement("canvas");
    }
    get width () {
        return this.#HTMLElement.width;
    }
    get height () {
        return this.#HTMLElement.height;
    }
    get context () {
        return this.#HTMLElement.getContext("2d");
    }
    setSize (width,height) {
        this.#HTMLElement.width = width;
        this.#HTMLElement.height = height;
    }
    init () {
        document.body.appendChild(this.#HTMLElement);
    }
}
class Draw {
    #canvas;
    #context;
    constructor (canvas) {
        this.#canvas = canvas;
        this.#context = this.#canvas.context;
    }
    get color () {
        return this.#context.fillStyle;
    }
    set color (color="#000") {
        this.#context.fillStyle = color;
        this.#context.strokeStyle = color;
    }
    get lineWidth () {
        return this.#context.lineWidth;
    }
    set lineWidth (lineWidth=1) {
        this.#context.lineWidth = lineWidth;
    }
    rect (x,y,w,h,color="#000",lineWidth=1,type="fill") {
        this.color = color;
        switch (type.toLowerCase()) {
            case "fill":
                this.#context.fillRect(x,y,w,h);
                break;
            case "stroke":
                this.lineWidth = lineWidth;
                this.#context.strokeRect(x,y,w,h);
            default:
                throw new Error("el tipo " + type + " no existe como tal, trata de elegir fill o stroke")
        }
    }
    text (text,x,y,style) {
        this.color = style.color;
        this.#context.font = style.size + "px" + style.family;
        this.#context.fillText(text,x,y);
    }
    fill (color="#000") {
        this.#context.fillStyle = color;
        this.#context.fillRect(0,0,this.#canvas.width,this.#canvas.height);
    }
}
class Input {
    constructor () {
        this.mouse = {};
        this.key = null;
        this.keysDown = [];
        this.keysUp =[];
        this.keysPressed = [];
        this.keys = {}
    }
    init() {
        document.body.addEventListener("mousemove",Input.updateMouse.bind(this));
        document.body.addEventListener("keydown",Input.onKeyDown.bind(this));
        document.body.addEventListener("keyup",Input.onKeyUp.bind(this));
    }
    static updateMouse (mouse) {
        this.mouse = mouse;
    }
    static onKeyDown (key) {
        if (!this.keys[key.code]) {
            this.keys[key.code] = true;
            if (!this.keysDown.includes(key.code)) {
                this.keysDown.push(key.code);
                this.keysPressed.push(key.code);
                if (this.keysDown.length>3) this.keysDown.shift();
            }
            //console.log("down",this.keysDown)
            //console.log("up",this.keysUp)
            // console.log("pressed",this.keysPressed)
        }
    }
    static onKeyUp (key) {
        if (this.keys[key.code]) {
            this.keys[key.code] = false;
            if (!this.keysUp.includes(key.code)) {
                this.keysUp.push(key.code);
            }
            this.keysDown = this.keysDown.filter(k => k != key.code);
            this.keysPressed = this.keysPressed.filter(k => k != key.code);
            // console.log("up",this.keysUp)
            // console.log("down",this.keysDown)
            // console.log("pressed",this.keysPressed)
        }
    }
}
class Display {
    #canvas;
    #draw;
    #layout;
    #input;
    constructor (width,height) {
        this.#canvas = new Canvas();
        this.#canvas.setSize(width,height);
        this.#draw = new Draw(this.#canvas);
        this.#layout = new Layout("__main__",{
            x: 0,
            y: 0,
            w: this.width,
            h: this.height,
            style: new Style({
                background: "#111"
            }),
            parent: null
        });
        this.#input = new Input();
    }
    get width () {
        return this.#canvas.width;
    }
    get height () {
        return this.#canvas.height;
    }
    get draw () {
        return this.#draw;
    }
    get main () {
        return this.#layout;
    }
    get mouse () {
        return this.#input.mouse;
    }
    append (...objects) {
        this.#layout.append(...objects);
    }
    init () {
        this.#canvas.init();
        this.#input.init();
        Element.display = this;
        return this;
    }
    update () {
        this.#layout.update();
        //requestAnimationFrame(this.update.bind(this));
    }
}
class Element {
    #id;
    #rect;
    #style;
    #parent;
    #children;
    static display = null;
    constructor (id,data) {
        this.#id = id;
        this.#style = (data.style!==undefined)?data.style:new Style();
        
        this.#parent = (data.parent===undefined)?Element.display.main:data.parent;
        if (this.#parent!==null) this.#parent.append(this);
        this.#children = {};

        this.#rect = new Rect(new Vector2(data.x,data.y),new Vector2(data.w,data.h));

        this.hover = false;
    }
    get position () {
        return this.#rect.position;
    }
    get size () {
        return this.#rect.size;
    }
    get rect () {
        return this.#rect;
    }
    get id () {
        return this.#id;
    }
    get style () {
        return this.#style;
    }
    get parent () {
        return this.#parent;
    }
    get children () {
        return this.#children;
    }

    setParent (newParent) {
        this.#parent = newParent;
        return this;
    }
    append (...objects) {
        objects.forEach((obj,index,objs)=>{
            this.#children[obj.id] = obj.setParent(this);
        })
    }
    update () {
        this.draw(Element.display.draw);
        this.box();
        for (let child in this.#children) {
            this.#children[child].update();
        }
    }
    box () {
        const mouse = Element.display.mouse;
        if (this.rect.contain(mouse)) {
            if (!this.hover) {
                this.hover = true;
                this.onMouseEnter();
            }
            this.onMouseIn();
        } else {
            if (this.hover) {
                this.onMouseOut();
            }
            this.hover = false;
        }
    }
    draw (draw) {
        //background
        draw.rect(this.position.x,this.position.y,this.size.width,this.size.height,this.#style.background);
    }
    onMouseEnter () {}
    onMouseIn () {}
    onMouseOut () {}
}
class Layout extends Element {
    constructor (id,data) {
        super(id,data);
    }
}
class Selector extends Element {
    constructor (id,data) {
        super(id,data);
    }
    onMouseEnter () {
        this.style.background = this.style.onHover;
    }
    onMouseOut () {
        this.style.background = this.style._background;
    }
}
class TextInput extends Element {
    #children;
    constructor (id,data) {
        super(id,data);
        this.value = "";
        this.inputCursor = new Vector2(0,0);
        this.drawCursor = new Vector2(0,0);
    }
    get colums () {
        return Math.floor(this.size.width/this.style.font.width);
    }
    update () {
        const draw = Element.display.draw;
        this.draw(Element.display.draw);
        this.box();
        if (this.hover) {
            for (let runCursor = 0; runCursor < this.value; runCursor++) {
                if (this.drawCursor.x==this.colums-2) {
                    this.drawCursor.y++;
                    this.drawCursor.x = 0;
                }
                if ((this.value[runCursor]=="/")) {
                    switch (this.value[runCursor+1]) {
                        case "n":
                            runCursor++;
                            this.drawCursor.y++;
                            this.drawCursor.x = 0;
                            continue;
                    }
                }
                draw.text(this.value[runCursor],this.style.font.width*this.drawCursor.x,this.style.font.width*this.drawCursor.y,this.style.font);
            }
        }
        draw.rect(this.inputCursor.x * this.style.font.size + this.position.x,this.inputCursor.y * this.style.font.width + this.position.y,this.style.font.size/4,this.style.font.width,this.style.cursorColor);
        //console.log(this.drawCursor,this.inputCursor)
    }
    onMouseClick () {

    }
}

const display = new Display(innerWidth,innerHeight).init();

const toolBar = new Layout("toolBar",{
    w: display.width,
    h: display.height*.08,
    style: new Style({
        background: "#888"
    })
});
const toolBarElements = 8;
const fileSelector = new Selector("fileSelector",{
    w: toolBar.size.width/toolBarElements,
    h: toolBar.size.height,
    style: new Style({
        background: "#f00",
        onHover: "#900"
    }),
    parent: toolBar
})
const editSelector = new Selector("editSelector",{
    x: toolBar.size.width/toolBarElements,
    w: toolBar.size.width/toolBarElements,
    h: toolBar.size.height,
    style: new Style({
        background: "#0f0",
        onHover: "#090"
    }),
    parent: toolBar
})
const selectSelector = new Selector("selectSelector",{
    x: (toolBar.size.width/toolBarElements)*2,
    w: toolBar.size.width/toolBarElements,
    h: toolBar.size.height,
    style: new Style({
        background: "#00f",
        onHover: "#009"
    }),
    parent: toolBar
})
const viewSelector = new Selector("viewSelector",{
    x: (toolBar.size.width/toolBarElements)*3,
    w: toolBar.size.width/toolBarElements,
    h: toolBar.size.height,
    style: new Style({
        background: "#ff0",
        onHover: "#990"
    }),
    parent: toolBar
})
const goSelector = new Selector("goSelector",{
    x: (toolBar.size.width/toolBarElements)*4,
    w: toolBar.size.width/toolBarElements,
    h: toolBar.size.height,
    style: new Style({
        background: "#f0f",
        onHover: "#909"
    }),
    parent: toolBar
})
const helpSelector = new Selector("helpSelector",{
    x: (toolBar.size.width/toolBarElements)*5,
    w: toolBar.size.width/toolBarElements,
    h: toolBar.size.height,
    style: new Style({
        background: "#0ff",
        onHover: "#099"
    }),
    parent: toolBar
})

const textDisplay = new Layout("textDisplay",{
    y: display.height*.08,
    w: display.width,
    h: display.height,
    style: new Style({
        background: "#000"
    })
})
const textNumberLines = new Layout("textNUmberLines",{
    y: toolBar.size.height,
    w: display.width*.04,
    h: display.height - toolBar.size.height,
    style: new Style({
        background: "#444"
    })
})
const textEditor = new TextInput("textEditor",{
    parent: textDisplay,
    x: textNumberLines.size.width,
    y: toolBar.size.height,
    w: display.width*.8 - textNumberLines.size.width,
    h: textNumberLines.size.height,
    style: new Style({
        background: "#333",
        color: "#ddd",
        fontSize: 20,
        fontFamily: "monospace"
    })
})
textEditor.value = "Hola pablo";
setInterval(display.update.bind(display),1);
