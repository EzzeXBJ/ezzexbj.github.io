class Random {
    static seed = 0;
    static get = () => {
        return Math.random();
    }
    static integer = (min,max) => {
        const ran = Random.get();
        const fRan = (ran*(max-min))+min;
        const nRan = Math.floor(fRan);
        return nRan;
    }
    static float = (min,max) => {
        const ran = Random.get();
        const nRan = Random.integer(min,max);
        const fRan = nRan + ran;
        return fRan;
    }
}