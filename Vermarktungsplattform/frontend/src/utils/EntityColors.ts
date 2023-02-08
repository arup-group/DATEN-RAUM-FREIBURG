import { Color } from "cesium";

//map entity polygon border color
export const entPolyBorder = new Color(1, 1, 1, 1); //new Color(248 / 255, 249 / 255, 251 / 255, 0.8);

//map entity polygon background color
export const entPolyBackground = new Color(
  166 / 255,
  166 / 255,
  166 / 255,
  0.8
);

//selected map entity polygon background color
export const entSelectedBackground = new Color(
  255 / 255,
  255 / 255,
  0 / 255,
  0.9
);

//generates a random RGBA Color (weighted towards dark colors)
export const randomRGBA = () => {
  const red = 1 + Math.floor((Math.random() * 256) / 2);
  const green = Math.floor((Math.random() * 256) / 1.2);
  const blue = Math.floor((Math.random() * 256) / 1.2);

  return new Color(red / 255, green / 255, blue / 255, 0.6);
};
