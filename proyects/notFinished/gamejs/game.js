export default class Game {
    constructor () {
        this.clockHidden = false;
        this.clockInterval = 1000;
    }
    start (data) {
        console.log(data);
    }
    update (data) {}
    draw (data) {}
}