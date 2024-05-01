import Display from "./display.js";

export default class Sprite {
  static list = [];
  constructor(name, src, x, y, width, height, scale = 1, state = "static", animations = {}, ) {
    this.name = name;
    this.image = new Image();
    this.image.src = src;

    this.width = width;
    this.height = height;
    this.scale = scale;
    
    this.position = {
      x,
      y
    }

    this.animations = {};
    this.addAnimations(animations);
    this.state = state;
    this.addAnimation("static");
    Sprite.list.push(this);
  }
  get drawWidth () {
    return this.width * this.scale;
  }
  get drawHeight () {
    return this.height * this.scale;
  }
  addAnimation(animation) {
    this.animations[animation.name] = animation;
  }
  addAnimations(animations) {
    animations.forEach(animation => {
      this.addAnimation(animation);
    })
  }

  start () {
    this.animations[this.state].started = true;
  }
  update() {
    const animation = this.animations[this.state];
    animation.animate();
    if (animation.finished) {
      this.state = animation.finish;
      this.animations[this.state].start();
    }
  }

  draw() {
    const animation = this.animations[this.state];
    const position = animation.frame;
    const frameX = animation.loc[position].x;
    const frameY = animation.loc[position].y;
    Display.context.drawImage(
      this.image,
      frameX,
      frameY,
      this.width,
      this.height,
      this.position.x,
      this.position.y,
      this.drawWidth,
      this.drawHeight
    );
  }
}