import Sprite from "../build/sprite.js";
import Animation from "../build/animation.js";
import peashooter from "./peashooter.js";

const name = "sunflower";

const src = "src/images/sunflower.png";

const position = {
  x: peashooter.drawWidth,
  y: 0
}
const width = 32;
const height = 32;
const scale = 4;

const state = "reposing";

const reposingLoc = [
  { x: width * 0, y: 0, t: 10 },
  { x: width * 1, y: 0, t: 10 },
  { x: width * 2, y: 0, t: 10 },
  { x: width * 3, y: 0, t: 10 },
  { x: width * 4, y: 0, t: 10 },
  { x: width * 5, y: 0, t: 10 },
  { x: width * 4, y: 0, t: 10 },
  { x: width * 3, y: 0, t: 10 },
  { x: width * 2, y: 0, t: 10 },
  { x: width * 1, y: 0, t: 10 },
  { x: width * 0, y: 0, t: 5 }
 ];

const animations = [
  new Animation("reposing", reposingLoc, null, true)
  ];

const sunflower = new Sprite(name, src, position.x, position.y, width, height, scale, state, animations);

export default sunflower;
