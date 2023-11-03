import { Container, Point } from "pixi.js";
import { clamp } from "@/util";
import { type IWorldUtils, WorldUtils } from "./worldUtils";

export class World {
  private width: number;
  private height: number;

  public stage: Container;
  public utils: IWorldUtils;

  private viewportScale: number;
  private viewportSize: Point;

  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;
    this.stage = new Container();
    this.utils = WorldUtils(this.stage);
    this.viewportSize = new Point();
    this.viewportScale = 1;
  }

  setCameraPos(x: number, y: number) {
    const xOffset = this.viewportSize.x * 0.5;
    const yOffset = this.viewportSize.y * 0.5;

    const xPos = x * this.viewportScale - xOffset;
    const yPos = y * this.viewportScale - yOffset;

    if (this.viewportSize.x > this.width * this.viewportScale) {
      this.stage.x = Math.round(
        (this.viewportSize.x - this.width * this.viewportScale) * 0.5,
      );
    } else {
      this.stage.x = -Math.round(
        clamp(xPos, 0, this.width * this.viewportScale - xOffset * 2),
      );
    }

    if (this.viewportSize.y > this.height * this.viewportScale) {
      this.stage.y = Math.round(
        (this.viewportSize.y - this.height * this.viewportScale) * 0.5,
      );
    } else {
      this.stage.y = -Math.round(
        clamp(yPos, 0, this.height * this.viewportScale - yOffset * 2),
      );
    }
  }

  setViewportSize(x: number, y: number) {
    this.viewportSize.set(x, y);
  }

  getViewportScale() {
    return this.viewportScale;
  }

  setViewportScale(n: number) {
    n = clamp(n, 1, 6);
    this.viewportScale = n;
    this.stage.scale.x = n;
    this.stage.scale.y = n;
  }

  getSize() {
    return { width: this.width, height: this.height };
  }
}
