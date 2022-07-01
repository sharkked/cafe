import { Container, Point } from "pixi.js";
import { clamp } from "./util";
import { type IWorldUtils, WorldUtils } from "./worldUtils";

export class World {
  private width: number;
  private height: number;

  public container: Container;
  public utils: IWorldUtils;

  private camOffset: Point;
  
  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;
    this.container = new Container();
    this.utils = WorldUtils(this.container);
    this.camOffset = new Point();
  }

  setCameraPos(x: number, y: number) {
    this.container.x = Math.round(clamp(-x + this.camOffset.x, -this.width / 2, this.width / 2));
    this.container.y = Math.round(clamp(-y + this.camOffset.y, -this.height / 2, this.height / 2));
  }

  setCameraOffset(x: number, y: number) {
    this.camOffset.set(x, y);
  }

  getSize() {
    return { width: this.width, height: this.height };
  }
}