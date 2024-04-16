
const MathUtils = {
    sq: function (x) {
        return x*x;
    },
    sqrt: Math.sqrt,
    cos: Math.cos,
    sin: Math.sin,
    atan2: Math.atan2,
    lerp: function (a,b,t) {
        return (1-t)*a + t*b;
    }
}
export default MathUtils;