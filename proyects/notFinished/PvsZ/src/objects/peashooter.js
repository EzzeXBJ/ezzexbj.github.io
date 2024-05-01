import Sprite from "../build/sprite.js";
import Animation from "../build/animation.js";

const name = "peashooter";

const src = "src/images/peashooter.png";

const position = {
  x: 0,
  y: 0
}
const width = 32;
const height = 32;
const scale = 4;

const state = "reposing";

const reposingLoc = [
  {x:width*0,y:0,t:10},
  {x:width*1,y:0,t:10},
  {x:width*2,y:0,t:10},
  {x:width*3,y:0,t:10},
  {x:width*4,y:0,t:10},
  {x:width*5,y:0,t:10},
  {x:width*6,y:0,t:10},
  {x:width*7,y:0,t:10}
 ];

const shootingLoc = [
  { x: width * 0, y: height, t: 100 },
  { x: width * 1, y: height, t: 10 },
  { x: width * 2, y: height, t: 10 }
];

const animations = [
  new Animation("reposing",reposingLoc,null,true),
  new Animation("shooting",shootingLoc,"reposing")
  ];

const peashooter = new Sprite(name,src,position.x,position.y,width,height,scale,state,animations);

export default peashooter;
