import Time from "./time.js";

export default class Animation {
  static loc = [{ x: 0, y: 0, t: 1 }];
  constructor(name = null, loc = Animation.loc, finish = "static", loop = false) {
    this.name = name;
    this.loc = loc;
    this.frames = []; //nueva idea
    this.finish = finish;
    this.loop = loop;
    this.frame = 0;
    this.started = false;
    this.finished = false;
  }
  get duration() {
    let count;
    this.loc.forEach(frame => {
      count += frame.t;
    });
    return count;
  }
  start () {
    this.frame = 0;
    this.finished = false;
    this.started = true;
  }
  animate() {
    if (!this.finished) {
      if ((Time.frame + 1) % this.loc[this.frame].t == 0) {
        if (this.loop) this.frame = (this.frame + 1) % this.loc.length;
        else if (this.frame < this.loc.length- 1) this.frame++;
        else {
          this.frame = 0;
          this.finished = true;
        }
      }
    }
  }
}