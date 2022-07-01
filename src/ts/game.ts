import {
  Application,
  Graphics,
  Point,
} from "pixi.js";
import { World } from "./world";
import { getKey } from "./keyboard";
import { DebugInfo } from "./debugInfo";
import { Player } from "./player";
import { loadAssets } from "./loader";
import { Tree } from "./tree";

export interface GameConfig {
  canvas?: HTMLCanvasElement | null;
}

export class Game {
  private app: Application;

  constructor(config: GameConfig) {
    let view: HTMLElement | null = config.canvas ?? null;

    if (!view) {
      view = document.getElementById("game");
    }

    if (!(view instanceof HTMLCanvasElement)) {
      console.log("Game canvas couldn't be found!");
    }

    this.app = new Application({
      width: window.innerWidth,
      height: window.innerHeight,
      resizeTo: window,
      resolution: window.devicePixelRatio || 1,
      view: view as HTMLCanvasElement,
    });
  }

  start() {
    loadAssets(this.app.loader, (err) => {
      if (err) {
        console.error(err);
        return;
      }
      const debug = new DebugInfo();
      this.app.stage.addChild(debug.text);
  
      let frameTime: number;
      debug.watch("fps", () => Math.round(this.app.ticker.FPS) );
  
      const WORLD_WIDTH = 1000;
      const WORLD_HEIGHT = 1000;

      const world = new World(WORLD_WIDTH, WORLD_HEIGHT);
      this.app.stage.addChild(world.container);
  
      const player = new Player();
      player.position.set(WORLD_WIDTH / 2, WORLD_HEIGHT / 2);
      world.utils.addObject(player);

      let i: number;
      for (i = 0; i < 50; i++) {
        const tree = new Tree();
        tree.object.position = new Point(
          Math.floor(Math.random() * ( WORLD_WIDTH + this.app.screen.width*2) - this.app.screen.width),
          Math.floor(Math.random() * ( WORLD_HEIGHT + this.app.screen.height*2) - this.app.screen.height));
        world.utils.addObject(tree);
      }
  
      world.setCameraOffset(
        this.app.screen.width / 2,
        this.app.screen.height / 2,
      );

      debug.watch("camera", () => `x: ${-world.container.x}  y: ${-world.container.y}`);
      debug.watch("player", () => `x: ${player.position.x}  y: ${player.position.y}`);
  
      let elapsed = 0.0;
      this.app.ticker.add((delta) => {
        elapsed += delta;
  
        player.update(delta);
  
        world.setCameraPos(player.position.x, player.position.y);
  
        debug.updateText();
      });
    });
  }
}
