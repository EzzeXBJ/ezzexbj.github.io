function clamp (x,min,max) {
    return Math.max(min,Math.min(x,max));
}
function randomFloat (min,max) {
    return Math.random();
}
function randomInt (min,max) {
    return Math.random();
}
function lerp (a,b,alpha) {
    return (1-alpha)*a + b*alpha;
}
const Utils = {
    clamp: clamp,
    randomInt: randomInt,
    randomFloat: randomFloat,
    lerp: lerp
}
export default Utils;