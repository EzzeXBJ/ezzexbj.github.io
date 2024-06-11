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

const winCombinations = [
  [0,1,2],
  [3,4,5],
  [6,7,8],
  [0,3,6],
  [1,4,7],
  [2,5,8],
  [0,4,8],
  [2,4,6]
];
const memoi = [[],[]];
const isMemoi = true;
const scale = 100;
const tab = new Tab(3,3);

const restartBtn = document.getElementById("restartBtn");
const statusText = document.getElementById("status");
const playerText = document.getElementById("player");

const canvas = document.getElementById("mainCanvas");
canvas.width = tab.width*scale;
canvas.height = tab.height*scale;
const ctx = canvas.getContext("2d");
let player = null;
let status = null;

const Restart = function () {
  statusText.textContent = "null";
  tab.Reset();
  
  memoi[0] = [];
  memoi[1] = [];
  
  player = RandomBit();
  let _a = player ? "X" : "O";
  console.log("set player",_a,player);
  playerText.textContent = player ? "Rojo" : "Azul";
  
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
  
  let _l = player?0:1;
  tab.set(_l,x,y);
  
  if (isMemoi) {
    memoi[_l].push([x, y]);
    if (memoi[_l].length > 3) {
      tab.set(null, memoi[_l][0][0], memoi[_l][0][1]);
      memoi[_l].shift();
    }
  }
  
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
  for (let i = 0; i<winCombinations.length;i++) {
    const v = winCombinations[i];
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
    
    if (isMemoi) {
      memoi[player].push([x, y]);
      console.log(memoi[player])
      if (memoi[player].length > 3) {
        tab.set(null, memoi[player][0][0], memoi[player][0][1]);
        memoi[player].shift();
      }
    }
    
    tab.Draw(ctx,scale);
    Analize();
    
    if (status!="win") {
      status = "cpu";
      setTimeout(TurnCPU,500);
    } else console.log("game finished");
  } else if (tab.get(x,y)!==null) console.log("touch busy");
  else if (status=="cpu") console.log("turn cpu");
});
restartBtn.addEventListener("click",Restart);
