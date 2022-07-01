import { Point, Sprite } from "pixi.js";
import type { GameObject } from "./interfaces";

export class Tree implements GameObject {
  public object: Sprite;
  public position: Point;

  constructor() {
    this.object = Sprite.from("assets/sprites/tree.png");
    this.object.anchor.set(0.5, 1);

    this.position = new Point();
  }
}