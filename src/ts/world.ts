import { Container } from "pixi.js";
import { clamp } from "./util";
import { type IWorldUtils, WorldUtils } from "./worldUtils";

export class World {
  private width: number;
  private height: number;

  public container: Container;
  public utils: IWorldUtils;

  private camOffset: {
    x: number;
    y: number;
  }
  
  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;
    this.container = new Container();
    this.utils = WorldUtils(this.container);
    this.camOffset  = {
      x: 0,
      y: 0,
    }
  }

  setCameraPos(x: number, y: number) {
    this.container.x = clamp(-x + this.camOffset.x, 0, this.width);
    this.container.y = clamp(-y + this.camOffset.y, 0, this.height);
  }

  setCameraOffset(x: number, y: number) {
    this.camOffset = {
      x: x,
      y: y
    }
  }
}