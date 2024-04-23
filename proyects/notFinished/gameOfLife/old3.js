const rows = 100;
const cols = 100;
const cellSize = 5;

const mod = (a,b) => {
    return (a>=0)?(a%b):0;
}
const randomInt = (min,max) => {
    return (Math.random()>.5)?1:0;
}
class Canvas {
    constructor (width,height) {
        this._canvas = document.createElement("canvas");
        document.body.appendChild(this._canvas);
        this._context = this._canvas.getContext("2d");
        this.setSize(width,height);
    }
    get width () { return this._canvas.width }
    get height () { return this._canvas.height }
    get size () { return [this.width,this.height] }
    set width (width) {
        this._canvas.width = width;
    }
    set height (height) {
        this._canvas.height = height;
    }
    setSize (width,height) {
        this.width = width;
        this.height = height;
    }
    get context () { return this._context }
}
class Draw {
    constructor (canvas) {
        this._canvas = canvas;
        this._context = this._canvas.context;
    }
    clear () {
        this._context.clearRect(0,0,this._canvas.width,this._canvas.height);
    }
    fillRect (x,y,w,h,color="#000") {
        this._context.fillStyle = color;
        this._context.fillRect(x,y,w,h);
    }
}
class Input {
    constructor () {}
    init () {}
}
class Tab {
    static newArray2D (rows,cols) {
        return Array.from({length: rows}, () => Array.from({length: cols}, () => new Cell()));
    }
    constructor (rows,cols) {
        this._tab = Tab.newArray2D(rows,cols);
    }
    set (callback) {
        this._tab.forEach((value,row,array)=>{
            array[row].forEach((value2,col,array2) => {
                array2[col] = callback(value2,row,col,array);
            })
        })
    }
    setTab (tab) {
        this._tab = tab._tab;
    }
    setElement (row,col,value) {
        this._tab[row][col] = value
    }
    get get () { return this._tab } 
    for (callback) {
        this._tab.forEach((rowArray,row,tab)=>{
            tab[row].forEach((tabValue,col,rowArray)=>{
                callback(row,col,tabValue,tab);
            })
        })
    }
    randomize (callback) {
        this._tab.forEach((value,index,array)=>{
            array[index].forEach((value2,index2,array2) => {
                array2[index2] = callback(Math.random());
            })
        })
    }
    randomizeNum () {
        this.randomize((ran)=>{
            return (ran>.5)?1:0;
        })
    }
}
class Cell {
    static void (r,c) { return new Cell(r,c) }
    static random (r,c) {
        const state = (Math.random()>.5)?1:0;
        const color = state?"#000":"#fff";
        return new Cell(r,c,undefined,state,color);
    }
    static size = 0;
    constructor (row,col,size=Cell.size,state=0,color="#000") {
        this._row  = row;
        this._col = col;
        this._size = size;
        this._color = color;
        this._state = state;
    }
    draw(draw) {
        const x = this._row*this._size;
        const y = this._col*this._size;
        draw.fillRect(x,y,this._size,this._size,this._color);
    }
}
class Game {
    constructor (rows,cols,cellSize) {
        this._rows = rows;
        this._cols = cols;
        this._cellSize = cellSize;

        this._tab = new Tab(this._rows,this._cols);
        this._buffer = new Tab(this._rows,this._cols);

        this._canvas = new Canvas(this.width,this.height);
        this._draw = new Draw(this._canvas);
        this._input = new Input();
        this._input.init();
        Cell.size = this._cellSize;

        this.sleep = 1000;
    }
    get rows () { return this._rows }
    get cols () { return this._cols }
    get width () { return this._cols * this._cellSize }
    get height () { return this._rows * this._cellSize }

    get draw () { return this._draw }
    get input () { return this._input }
    get tab () { return this._tab }
    get buffer () { return this._buffer }

    start () {
        this.tab.set((value,row,col,array)=>{
            return Cell.random(row,col);
        })
        setInterval(()=>{this.loop()},this.sleep);
    }
    loop () {
        // console.clear()
        // console.table(this.tab.get)
        this.draw.clear();
        this.tab.for((r,c,v,t) => {
            this.buffer.setElement(r,c,Cell.void(r,c));
            let cell = v;
            cell.draw(this.draw);
            this.buffer.setElement(r,c,this.update(cell));
        })
        this.tab.setTab(this.buffer);
    }
    update (cell) {
        const newCell = new Cell(this._row,this._col,this._size,this._state,this._color)
        return newCell;
    }
    
    // getNeighbors(r,c) {
    //     let count = 0;
    //     for (let i = 0; i < this.neighbors.length; i++) {
    //         const pr = this.neighbors[i][1];
    //         const pc = this.neighbors[i][0];
    //         count += this.map[mod((r+pr),this.rows)][mod((c+pc),this.cols)];
    //     }
    //     return count;
    // }
    // updateCell(r,c) {
    //     const cell = this.map[r][c];
    //     const neighbors = this.getNeighbors(r,c);
        
    //     return 
    // }
}
const game = new Game(rows,cols,cellSize);

const neighbors = [
    [-1,-1],[0,-1],[1,-1],
    [-1,0],[1,0],
    [-1,1],[0,1],[1,1]
];
function getNeighbors(r,c) {
    let count = 0;
    for (let i = 0; i < neighbors.length; i++) {
        const pr = neighbors[i][1];
        const pc = neighbors[i][0];
        count += game.tab.get[mod((r+pr),game.rows)][mod((c+pc),game.cols)];
    }
    return count;
}
game.update = (cell) => {
    const neighbors = getNeighbors(cell._row,cell._col);
    const state = ((neighbors == 3)||(((neighbors==2)||(neighbors==3))&&cell)) ? 1 : 0;
    const color = state?"#000":"#fff";
    const newCell = new Cell(cell._row,cell._col,cell._size,state,color);
    return newCell;
}
game.start();
game.sleep = 1;