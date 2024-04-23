export default class Display {
    #canvas;
    #type;
    constructor () {
        this.#canvas = new Canvas();
    }
    setMode (size,type="static") {
        this.#type = ((type==="static")||(type==="scaled")||(type==="fullscreen"))?(type):"static";
        this.#canvas.width = (type==="fullscreen")?window.innerWidth:size[0];
        this.#canvas.height = (type==="fullscreen")?window.innerHeight:size[1];
    }
    init () {
        this.#canvas.init();
        this.setMode([500,300]);
    }
}