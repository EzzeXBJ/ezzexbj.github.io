export default class Time {
    static second = 1000;
    static minute = 60 * Time.second;
    static hour = 60 * Time.minute;
    static day = 24 * Time.hour;

    constructor () {
        this.frames = 0;
        this.deltaTime = 0;
        this.frameRate = 1;
        this.time = 0;
        this.lastTime = 0;
    }
    start () {
        this.lastTime = Date.now();
    }
    update () {
        this.frames++;
        const curTime = Date.now();
        this.frameRate = 1/(curTime-this.lastTime);
        this.deltaTime = (curTime-this.lastTime)/1000;
        this.lastTime = curTime;
        this.time += this.deltaTime;
    }
}