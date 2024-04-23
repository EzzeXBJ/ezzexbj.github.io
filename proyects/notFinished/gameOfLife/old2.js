const rows = 100;
const cols = 100;
const cellSize = 5;

const mod = (a,b) => {
    return (a>=0)?(a%b):0;
}
const randomInt = (min,max) => {
    return (Math.random()>.5)?1:0;
}
class Surface {
    constructor (width,height) {
        this.canvas = document.createElement("canvas");
        document.body.appendChild(this.canvas);
        this.context = this.canvas.getContext("2d");
        this.canvas.width = width;
        this.canvas.height = height;
    }
    get width () { return this.canvas.width }
    get height () { return this.canvas.height }
    clear () {
        this.context.clearRect(0,0,this.width,this.height);
    }
    fillRect (x,y,w,h,color) {
        this.context.fillStyle = color;
        this.context.fillRect(x,y,w,h);
    }
}
class Tablero {
    static zero (rows,cols) {
        return Array.from({length: rows}, ()=> Array(cols).fill(0));
    }
    constructor (rows,cols,cellSize) {
        this.rows = rows;
        this.cols = cols;
        this.cellSize = cellSize;
        this.map = Tablero.zero(this.rows,this.cols);
        this.buffer = [];
        this.neighbors = [
            [-1,-1],[0,-1],[1,-1],
            [-1,0],[1,0],
            [-1,1],[0,1],[1,1]
        ];
        this.screen = new Surface(this.cols * this.cellSize,this.rows * this.cellSize);
        this.color = [
            "#000",
            "#fff"
        ]
    }
    randomize (min=0, max=2) {
        this.map.forEach((value,index,array)=>{
            array[index].forEach((value2,index2,array2) => {
                array2[index2] = randomInt(min,max);
            })
        })
    }
    loop () {
        this.screen.clear();
        this.buffer = Tablero.zero(this.rows,this.cols);
    
        for (let r = 0; r < this.rows; r++) {
            for (let c = 0; c < this.cols; c++) {
                let cell = this.map[r][c];
                
                const color = this.color[cell];
                this.drawCell(r,c,color);
    
                this.buffer[r][c] = this.updateCell(r,c);
            }
        }
        this.map = this.buffer;
    }
    drawCell(r,c,color="#000") {
        const x = r*this.cellSize;
        const y = c*this.cellSize;
        this.screen.fillRect(x,y,this.cellSize,this.cellSize,color);
    }
    getNeighbors(r,c) {
        let count = 0;
        for (let i = 0; i < this.neighbors.length; i++) {
            const pr = this.neighbors[i][1];
            const pc = this.neighbors[i][0];
            count += this.map[mod((r+pr),this.rows)][mod((c+pc),this.cols)];
        }
        return count;
    }
    updateCell(r,c) {
        const cell = this.map[r][c];
        const neighbors = this.getNeighbors(r,c);
        
        return ((neighbors == 3)||(((neighbors==2)||(neighbors==3))&&cell)) ? 1 : 0;
    }
}
const tablero = new Tablero(rows,cols,cellSize);

tablero.randomize();

setInterval(()=>{tablero.loop()},1)