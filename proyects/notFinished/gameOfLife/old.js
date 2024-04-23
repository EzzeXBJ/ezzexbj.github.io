const rows = 100;
const cols = 100;
const cellSize = 5;
const scale = 1;
const width = cols * cellSize;
const height = rows * cellSize;
const mod = (a,b) => {
    return (a>=0)?(a%b):0;
}
const canvas = document.createElement("canvas");
document.body.appendChild(canvas);
canvas.width = width;
canvas.height = height;
const ctx = canvas.getContext("2d");

let map = Array.from({length: rows}, ()=> Array.from({length: cols}, ()=> (Math.random()<.5)?0:1));

const drawCell = (x,y,w,h,color="#000") => {
    ctx.fillStyle = color;
    ctx.fillRect(x,y,w,h);
}

const getNeighbors = (r,c) => {
    let count = 0;
    const neighbors = [
        [-1,-1],[0,-1],[1,-1],
        [-1,0],[1,0],
        [-1,1],[0,1],[1,1]
    ];
    for (let i = 0; i < neighbors.length; i++) {
        const pr = neighbors[i][1];
        const pc = neighbors[i][0];
        count += map[mod((r+pr),rows)][mod((c+pc),cols)];
    }

    return count;
}
function loop () {
    ctx.clearRect(0,0,width,height);

    const buffer = Array.from({length: rows}, ()=> Array(cols).fill(0));

    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            const y = r*cellSize;
            const x = c*cellSize;
            let cell = map[r][c];
            let updateCell = 0;
            const neighbors = getNeighbors(r,c);
    
            if ((neighbors == 3)||(((neighbors==2)||(neighbors==3))&&cell)) updateCell = 1;

            const color = (cell)?"#fff":"#000";
            drawCell(x,y,cellSize,cellSize,color);

            buffer[r][c] = updateCell;
        }
    }
    map = buffer;
}
setInterval(loop, 100)