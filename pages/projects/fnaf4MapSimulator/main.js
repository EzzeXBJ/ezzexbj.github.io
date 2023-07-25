//elements of html
const canvas = document.getElementById("sceneMap");
const ctx = canvas.getContext("2d");
const info = document.getElementById("info");

function random(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

const FPS = 100;
let vel = 1;
const tileSize = 100, rows = 3, cols = 3;
canvas.width = tileSize * cols + 20;
canvas.height = tileSize * rows + 20;
let pause = true;
let frame = 0;
const mapData = [
    [1,1,1],
    [1,1,1],
    [0,1,0]
];
const foxy = {
    size: tileSize/3,
    position: 1,
    positions: [
        [0,0], //left
        [1,0], //main
        [2,0], //right
        [1,1], //closer
        [1,2] //bed
    ],
    x: 0,
    y: 0,
    avoided: 0,
    steps: 0,
    difficult: 5
};
const bonnie = {
    size: tileSize/3,
    position: 0,
    positions: [
        [1,0], //main
        [0,0], //left 
        [0,1], //leftdoor 
        [1,2] //bed
    ],
    x: 0,
    y: 0,
    avoided: 0,
    steps: 0,
    difficult: 5
};
const chica = {
  size: tileSize/3,
  position: 0,
  positions: [
        [1, 0], //main
        [2, 0], //right
        [2, 1], //rightdoor 
        [1, 2] //bed
    ],
  x: 0,
  y: 0,
  avoided: 0,
  steps: 0,
  difficult: 5
};

function drawFoxy() {
    foxy.x = foxy.positions[foxy.position][0];
    foxy.y = foxy.positions[foxy.position][1];
    ctx.fillStyle = "#bb3c20";
    ctx.fillRect((foxy.x * tileSize) + 10*foxy.x + (tileSize/2 - foxy.size/2), (foxy.y * tileSize) + 10 *foxy.y + (tileSize - foxy.size * 3/2), foxy.size, foxy.size);
}
function drawBonnie() {
  bonnie.x = bonnie.positions[bonnie.position][0];
  bonnie.y = bonnie.positions[bonnie.position][1];
  ctx.fillStyle = "#1e5cee";
  ctx.fillRect((bonnie.x * tileSize) + 10 * bonnie.x + 10, (bonnie.y * tileSize) + 10 * bonnie.y + bonnie.size/2, bonnie.size, bonnie.size);
}
function drawChica() {
  chica.x = chica.positions[chica.position][0];
  chica.y = chica.positions[chica.position][1];
  ctx.fillStyle = "#d9bd20";
  ctx.fillRect((chica.x * tileSize) + 10 * chica.x + (tileSize - chica.size - 10), (chica.y * tileSize) + 10 * chica.y + chica.size/2, chica.size, chica.size);
}
function drawMap() {
    for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
            const tile = mapData[y][x];
            let color;

            switch (tile) {
                case 1:
                    color = "blue";
                    break;
                default:
                    color = "gray";
                    break;
            }
            ctx.fillStyle = color;
            ctx.fillRect((x * tileSize) + 10*x, (y * tileSize) + 10 *y, tileSize, tileSize);
        }
    }
}
function updateFoxy(f) {
  if (f%(100 * random(1, 5)/vel) == 0) {
    switch (foxy.position) {
      case 0:
        foxy.position = random(0, foxy.difficult) ? 2 : 3;
        break;
      case 1:
        foxy.position = [0, 2][random(0,2)];
        break;
      case 2:
        foxy.position = random(0, foxy.difficult) ? 0 : 3;
        break;
      case 3:
        let i = random(0, foxy.difficult);
        foxy.position = i ? 1 : 4;
        foxy.avoided += i ? 1 : 0;
        break;
      case 4:
        pause = true;
        gameOver("foxy");
        reset();
        break;
    }
    foxy.steps++;
  }
}
function updateBonnie(f) {
  if (f % (100 * random(1, 5) / vel) == 0) {
    switch (bonnie.position) {
      case 0:
        bonnie.position = 1;
        break;
      case 1:
        bonnie.position = random(0, bonnie.difficult) ? 2 : 0;
        break;
      case 2:
        let i = random(0, bonnie.difficult);
        bonnie.position = i ? 0 : 3;
        bonnie.avoided += i ? 1 : 0;
        break;
      case 3:
        pause = true;
        gameOver("bonnie");
        reset();
        break;
    }
    bonnie.steps++;
  }
}
function updateChica(f) {
  if (f % (100 * random(1, 5) / vel) == 0) {
    switch (chica.position) {
      case 0:
        chica.position = 1;
        break;
      case 1:
        chica.position = random(0, chica.difficult) ? 2 : 0;
        break;
      case 2:
        let i = random(0, chica.difficult);
        chica.position = i ? 0 : 3;
        chica.avoided += i ? 1 : 0;
        break;
      case 3:
        pause = true;
        gameOver("chica");
        reset();
        break;
    }
    chica.steps++;
  }
}
function gameOver(deadFor) {
  info.innerHTML = `<strong>Bonnie:</strong><br><ul><li>Avoided ${bonnie.avoided}</li><li>Steps ${bonnie.steps}</li></ul><strong>Foxy:</strong><br><ul><li>Avoided ${foxy.avoided}</li><li>Steps ${foxy.steps}</li></ul><strong>Chica:</strong><br><ul><li>Avoided ${chica.avoided}</li><li>Steps ${chica.steps}</li></ul><strong>Dead for:${deadFor}</strong>`;
}
function update() {
  document.getElementById("frames").innerText = frame;
  if (!pause) {
    frame++;
    drawMap();
    updateChica(frame);
    updateBonnie(frame);
    updateFoxy(frame);
    drawChica();
    drawBonnie();
    drawFoxy();
  }
  setTimeout(update, 1000/FPS)
}
function reset() {
  foxy.position = 1;
  foxy.avoided = 0;
  foxy.steps = 0;
  bonnie.position = 0;
  bonnie.avoided = 0;
  bonnie.steps = 0;
  chica.position = 0;
  chica.avoided = 0;
  chica.steps = 0
  frame = 0;
}
function start() {
  info.innerText = "Sobrevive";
  pause = false;
  update();
}
function stop() {
  pause = !pause;
}