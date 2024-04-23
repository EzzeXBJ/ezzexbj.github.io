function randomInt(min,max) {
    return Math.floor((Math.random()*(max-min)+min));
}
class Canvas {
    constructor (width,height,start=0) {
        this.canvas = document.createElement("canvas");
        this.context = this.canvas.getContext("2d");
        this.setWidth = width;
        this.setHeight = height;
        if (start) this.init();
    }

    init () {
        document.body.appendChild(this.canvas);
    }

    drawFillRect (x,y,w,h,color="#000") {
        this.context.fillStyle = color;
        this.context.fillRect(x,y,w,h);
    }
    drawStrokeRect (x,y,w,h,color="#000") {
        this.context.strokeStyle = color;
        this.context.strokeRect(x,y,w,h);
    }

    set setWidth(width) {
        this.canvas.width = width;
    }
    set setHeight (height) {;
        this.canvas.height = height
    }

    get width () {
        return this.canvas.width;
    }
    get height () {
        return this.canvas.height;
    }
}
class Tablero {
    constructor (x,y,cols,rows,cellSize,margin,maxValue,cellsColor) {
        this.x = x;
        this.y = y;
        this.cols = cols;
        this.rows = rows;
        this.cellSize = cellSize;
        this.margin = margin;

        this.maxValue = maxValue;
        this.cellsColor = cellsColor;

        this.width = (this.cols * this.cellSize) + this.margin*2;
        this.height = (this.rows * this.cellSize) + this.margin*2;
        this.map = (new Array(this.rows)).fill((new Array(this.cols)).fill(0));
    }
    draw (canvas) {
        let marginColor = "#999";
        canvas.drawFillRect(this.x,this.y,this.width,this.height,marginColor);

        for (let row = 0; row < this.rows; row++) {
            for (let col = 0; col < this.cols; col++) {
                let cell = this.map[row][col];
                let cellColor = this.cellsColor[cell];
                canvas.drawFillRect(this.x+this.margin+row*this.cellSize,this.y+this.margin+col*this.cellSize, this.cellSize,this.cellSize,cellColor)
            }
        }
    }
    update () {

    }
    randomize () {
        for (let row = 0; row < this.rows; row++) {
            for (let col = 0; col < this.cols; col++)
            this.map[row][col] = randomInt(0,this.maxValue);
        }
    }
}