import Sprite from "../build/sprite.js";
import Animation from "../build/animation.js";
import peashooter from "./peashooter.js";

const name = "repeater";

const src = "src/images/repeater.png";

const position = {
  x: 0,
  y: peashooter.drawHeight
}
const width = 32;
const height = 32;
const scale = 4;

const state = "reposing";

const reposingLoc = [
  { x: width * 0, y: 0, t: 8 },
  { x: width * 1, y: 0, t: 8 },
  { x: width * 2, y: 0, t: 8 },
  { x: width * 1, y: 0, t: 8 },
  { x: width * 3, y: 0, t: 8 },
  { x: width * 4, y: 0, t: 8 }
 ];

const shootingLoc = [
  { x: width * 0, y: height, t: 100 },
  { x: width * 1, y: height, t: 10 },
  { x: width * 2, y: height, t: 10 },
  { x: width * 0, y: height, t: 5 },
  { x: width * 1, y: height, t: 10 },
  { x: width * 2, y: height, t: 10 }
];

const animations = [
  new Animation("reposing", reposingLoc, null, true),
  new Animation("shooting", shootingLoc, "reposing")
  ];

const repeater = new Sprite(name, src, position.x, position.y, width, height, scale, state, animations);

export default repeater;
