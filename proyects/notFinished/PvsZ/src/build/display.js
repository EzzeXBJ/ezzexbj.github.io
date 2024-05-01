export default class Display {
  static canvas = document.createElement("canvas");
  static context = Display.canvas.getContext("2d");
  static get width() {
    return Display.canvas.width
  }
  static get height() {
    return Display.canvas.height;
  }
  static init () {
    document.body.appendChild(Display.canvas);
    Display.canvas.style.background = "#111";
    Display.canvas.style.position = "absolute";
    Display.canvas.style.top = 0;
    Display.canvas.style.left = 0;
  }
  static setSize (width = 300, height = 250) {
    Display.canvas.width = (width == null) ? Display.width : width;
    Display.canvas.height = (height == null) ? Display.height : height;
    Display.context.imageSmoothingEnabled = false;
  
    return Display;
  }
  static setFullsize () {
    return Display.setSize(innerWidth, innerHeight);
  }
  static clear () {
    Display.context.clearRect(0,0,Display.width,Display.height);
  }
}