function RandomFloat (a,b) {
  return a + (Math.random()*(b-a));
}
function RandomInt (a,b) {
  return Math.floor(RandomFloat(a,b));
}
function RandomBit () {
  return RandomInt(0,2);
}

class Tab {
  constructor (rows,cols) {
    console.log("create table")
    this._rows = rows;
    this._cols = cols;
    this._array = new Array(rows*cols);
  }
  get width () {
    return this._rows;
  }
  get height () {
    return this._cols;
  }
  get map () {
    return this._array;
  }
  
  get (c,r) {
    return this._array[c + r*this.width];
  }
  set (value,c,r) {
    this._array[c + r*this.width] = value;
  }
  
  Reset () {
    this._array.fill(null);
    console.log("reset table")
  }
  Draw (ctx,scale) {
    console.log("draw table");
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    this.map.forEach((value, index) => {
      const col = index % this.width;
      const row = Math.floor(index / tab.width);
      const x = col * scale;
      const y = row * scale;
      
      ctx.fillStyle = (this.map[index] == null) ? "#111" : this.map[index] ? "#d55" : "#55d";
      ctx.fillRect(x, y, scale, scale);
      ctx.strokeStyle = "#fff";
      ctx.strokeRect(x, y, scale, scale);
    })
  }
}

const comWin = [
  [0,1,2],
  [3,4,5],
  [6,7,8],
  [0,3,6],
  [1,4,7],
  [2,5,8],
  [0,4,8],
  [2,4,6]
];
const scale = 100;
const tab = new Tab(3,3);

const restartBtn = document.getElementById("restartBtn");
const statusText = document.getElementById("status");

const canvas = document.getElementById("mainCanvas");
canvas.width = tab.width*scale;
canvas.height = tab.height*scale;
const ctx = canvas.getContext("2d");
let player = null;
let status = null;

const Restart = function () {
  statusText.textContent = "null";
  tab.Reset();
  player = RandomBit();
  let _a = player ? "X" : "O";
  console.log("set player",_a,player);
  
  tab.Draw(ctx,scale);
  
  if (player) {
    status = "player";
    console.log("turn player")
  }
  else {
    status = "cpu";
    requestAnimationFrame(TurnCPU);
  }
};
const TurnCPU = function () {
  console.log("turn cpu");
  
  let x, y;
  let _maxIte = 0;
  do {
    x = RandomInt(0,tab.width);
    y = RandomInt(0,tab.height);
    _maxIte++;
    if (_maxIte>100) {
      statusText.textContent = "ERROR";
      throw new Error("Demaciadas Iteraciones");
      break;
    }
  } while (tab.get(x,y)!==null);
  
  tab.set(player?0:1,x,y);
  console.log("cpu in",x,y);
  
  tab.Draw(ctx,scale);
  
  Analize();
  
  if (status!="win") {
    status = "player";
    console.log("turn player");
  } else console.log("game finished");
};
const Analize = function () {
  //anailza si alguno gano, si es asi, status = "win" y muestra en consola quien gano;
  for (let i = 0; i<comWin.length;i++) {
    const v = comWin[i];
    const a = tab.map[v[0]];
    const b = tab.map[v[1]];
    const c = tab.map[v[2]];
    if (a==b&&b==c&&c!=null) {
      status = "win";
      let winner = (a===player)?"player":"cpu";
      console.log("win",winner);
      statusText.textContent = (a===player)?"Has Ganado":"Has Perdido";
    }
  }
  
  if (status!=="win") {
    let fill = true;
    tab.map.forEach(v => {
      if (v == null) fill = false;
    });
    if (fill) {
      status = "win";
      console.log("game tied");
      statusText.textContent = "Empate";
    }
  }
}

Restart();

canvas.addEventListener("touchstart", event => {
  const touch = event.touches[0];
  const x = Math.floor(touch.clientX / scale);
  const y = Math.floor(touch.clientY / scale);
  
  console.log("touch",x,y);
  console.log("tab",tab.map);
  
  if (status=="player"&&tab.get(x,y)===null) {
    tab.set(player,x,y);
    
    tab.Draw(ctx,scale);
    Analize();
    
    if (status!="win") {
      status = "cpu";
      requestAnimationFrame(TurnCPU);
    } else console.log("game finished");
  } else if (tab.get(x,y)!==null) console.log("touch busy");
  else if (status=="cpu") console.log("turn cpu");
});
restartBtn.addEventListener("click",Restart);
