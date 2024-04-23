import { Color } from "./color.js";

export function toColor (c) {
    let argG = (c.getArg*180)/Math.PI;
    if (argG<0) argG += 360;

    const category = Math.floor(argG/60);
    const carry = ((argG%60)/60)*255;
    const color = new Color(0,0,0);
    const categories = [
        new Color(255, carry, 0),
        new Color(255-carry,carry,0),
        new Color(0, 255, carry),
        new Color(0, 255-carry, carry),
        new Color(carry, 0, 255),
        new Color(255, 0, 255-carry),
        new Color(255, carry, 0)
    ];
    color.addColor(categories[category]);

    return color.getRGB;
}