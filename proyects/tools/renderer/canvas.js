export default class Canvas {
    #HTMLElement;
    constructor () {
        this.#HTMLElement = document.createElement("canvas");
        this.setSize(300,150);
    }
    set width (width) {
        this.#HTMLElement.width = width;
    }
    set height (height) {
        this.#HTMLElement.height = height;
    }
    setSize (width,height) {
        this.width = width;
        this.height = height;
    }

    get width () {
        return this.#HTMLElement.width;
    }
    get height () {
        return this.#HTMLElement.height;
    }
    get size () {
        return {
            width: this.width,
            height: this.height
        }
    }
    get HTMLElement () {
        return this.#HTMLElement;
    }
    get context () {
        return this.#HTMLElement.getContext("2d");
    }
    init () {
        document.body.appendChild(this.#HTMLElement);
    }
}