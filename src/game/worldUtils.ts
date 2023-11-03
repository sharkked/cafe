import { Graphics, Container } from "pixi.js";
import type { GameObject } from "./interfaces";

export interface IWorldUtils {
  addDebug(): void;
  addRect(x: number, y: number, w: number, h: number): void;
  addCircle(x: number, y: number, radius: number): void;
  addSprite(x: number, y: number, url: string): void;
  updateScale(): void;
  addObject(obj: GameObject): void;
}

export function WorldUtils(world: Container): IWorldUtils {
  return {
    addObject(obj) {
      world.addChild(obj.object);
    },

    addDebug() {
      console.log(1);
    },

    addRect(x, y, w, h) {
      const rect = new Graphics();
      rect.beginFill(0x111111);
      rect.drawRect(0, 0, w, h);
      rect.endFill();
      rect.x = x;
      rect.y = y;
      world.addChild(rect);
    },

    addCircle(x, y, radius) {
      const circle = new Graphics();
      circle.lineStyle(1, 0xffffff);
      circle.drawCircle(0, 0, radius);
      circle.beginFill(0xffffff);
      circle.drawCircle(0, 0, 1);
      circle.endFill();
      circle.x = x;
      circle.y = y;
      world.addChild(circle);
    },

    addSprite(x, y, url) {
      console.log(2);
    },

    updateScale() {
      console.log(3);
    },
  };
}
