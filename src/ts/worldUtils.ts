import { 
  Graphics, 
  Container
} from "pixi.js";

export interface IWorldUtils {
  addDebug: () => void;
  addCircle: (x: number, y: number, radius: number) => void;
  addSprite: (x: number, y: number, url: string) => void;
  updateScale: () => void;
}

export function WorldUtils(world: Container): IWorldUtils {  
  return {
    addDebug: () => {
      console.log(1);
    },

    addCircle: (x, y, radius) => {
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

    addSprite: (x, y, url) => {
      console.log(2);
    },

    updateScale: () => {
      console.log(3);
    }
  }
}