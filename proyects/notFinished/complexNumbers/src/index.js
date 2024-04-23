import cx from "./basic/complex.js";
import Plane from "./basic/plane.js";

const width = innerWidth;
const height = innerHeight;
const center = new cx(width/2,height/2);
const zoom = 1;
const unity = new cx((width/4)*zoom, (height/4)*zoom);
const j = cx.j;
const plane = new Plane(width, height, center, zoom, unity, document.body);

plane.draw("c");