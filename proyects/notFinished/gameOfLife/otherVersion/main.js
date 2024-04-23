const cols = 10;
const rows = 10;
const cellSize = 16;
const margin = 25;

const width = (cols * cellSize) + margin*2;
const height = (rows * cellSize) + margin*2;

const canvas = new Canvas(width,height);
const tablero = new Tablero(0,0,cols,rows,cellSize,margin, 2, [
    "#000",
    "#fff"
]);

canvas.init();
tablero.draw(canvas);