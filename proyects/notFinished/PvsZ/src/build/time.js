class Clock {
  constructor() {
    this.startTime = null;
    this.time = null;
    this.lastTime = null;
    this.curTime = null;
    this.difference = null;
  }
  
  start() {
    this.curTime = this.startTime = performance.now();
  }
  update() {
    this.lastTime = this.curTime;
    this.curTime = performance.now();
    this.difference = this.curTime - this.lastTime;
    this.time += this.difference;
  }
}

export default class Time {
  static frame = null;
  static fps = null;
  static delta = null;
  static clock = new Clock();
  
  static start () {
    Time.frame = -1;
    Time.fps = 60;
    Time.delta = 1/60;
    Time.clock.start();
  }
  static update () {
    Time.frame++;
    Time.clock.update();
    Time.fps = 1000 / Time.clock.difference;
    Time.delta = Time.clock.difference / 1000;
  }
}