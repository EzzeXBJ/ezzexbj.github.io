import Sprite from "../build/sprite.js";
import Animation from "../build/animation.js";
import peashooter from "./peashooter.js";

const name = "wallnut";

const src = "src/images/wallnut.png";

const position = {
  x: peashooter.drawWidth,
  y: peashooter.drawHeight
}
const width = 32;
const height = 32;
const scale = 4;

const state = "reposing";
const lapse = 15;
const reposingLoc = [
  { x: width * 0, y: 0, t: lapse },
  { x: width * 1, y: 0, t: lapse },
  { x: width * 2, y: 0, t: lapse },
  { x: width * 1, y: 0, t: lapse },
  { x: width * 3, y: 0, t: lapse },
  { x: width * 4, y: 0, t: lapse }
 ];

const startDestroyLoc = [
  { x: width * 0, y: height, t: lapse+5 },
  { x: width * 1, y: height, t: lapse+5 },
  { x: width * 2, y: height, t: lapse+5 },
  { x: width * 1, y: height, t: lapse+5 },
  { x: width * 3, y: height, t: lapse+5 },
  { x: width * 4, y: height, t: lapse+5 }
 ];
const endDestroyLoc = [
  { x: width * 0, y: height*2, t: lapse+10 },
  { x: width * 1, y: height*2, t: lapse+10 },
  { x: width * 2, y: height*2, t: lapse+10 },
  { x: width * 1, y: height*2, t: lapse+10 },
  { x: width * 3, y: height*2, t: lapse+10 },
  { x: width * 4, y: height*2, t: lapse+10 }
 ];
const animations = [
  new Animation("reposing", reposingLoc, null, true),
  new Animation("startDestroy", startDestroyLoc, null, true),
  new Animation("endDestroy", endDestroyLoc, null, true)
  ];

const wallnut = new Sprite(name, src, position.x, position.y, width, height, scale, state, animations);

export default wallnut;
