import { Container, Point } from "pixi.js";
import { clamp } from "@/util";
import { type IWorldUtils, WorldUtils } from "./worldUtils";

export class World {
  private width: number;
  private height: number;

  public stage: Container;
  public utils: IWorldUtils;

  private camScale: number;
  private camOffset: Point;

  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;
    this.stage = new Container();
    this.utils = WorldUtils(this.stage);
    this.camOffset = new Point();
    this.camScale = 1;
  }

  setCameraPos(x: number, y: number) {
    const xPos = x * this.camScale - this.camOffset.x;
    const yPos = y * this.camScale - this.camOffset.y;
    this.stage.x = -Math.round(
      clamp(xPos, 0, this.width - this.camOffset.x * 0.5),
    );
    this.stage.y = -Math.round(
      clamp(yPos, 0, this.height - this.camOffset.y * 0.5),
    );
  }

  setCameraOffset(x: number, y: number) {
    this.camOffset.set(x, y);
  }

  getViewportScale() {
    return this.camScale;
  }

  setViewportScale(n: number) {
    n = clamp(n, 1, 6);
    this.camScale = n;
    this.stage.scale.x = n;
    this.stage.scale.y = n;
  }

  getSize() {
    return { width: this.width, height: this.height };
  }
}
