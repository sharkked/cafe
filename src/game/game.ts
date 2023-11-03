import { Application, Point } from "pixi.js";
import { World } from "./world";
import { DebugInfo } from "./debugInfo";
import { Player } from "./objects/player";
import { Tree } from "./objects/tree";
import { Textures } from "./sprites";
import { Input } from ".";

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

  async start() {
    try {
      const debug = new DebugInfo();

      await Textures.preload();

      debug.watch("fps", () => Math.round(this.app.ticker.FPS));

      const WORLD_WIDTH = 5000;
      const WORLD_HEIGHT = 500;

      const world = new World(WORLD_WIDTH, WORLD_HEIGHT);

      world.setViewportScale(2);
      world.setViewportSize(this.app.screen.width, this.app.screen.height);
      window.onresize = async () => {
        await new Promise((resolve) => setTimeout(resolve, 10));
        world.setViewportSize(this.app.screen.width, this.app.screen.height);
      };

      world.utils.addRect(0, 0, WORLD_WIDTH, WORLD_HEIGHT);
      this.app.stage.addChild(world.stage);

      const player = new Player();
      player.position.set(WORLD_WIDTH / 2, WORLD_HEIGHT / 2);
      world.utils.addObject(player);

      let i: number;
      for (i = 0; i < 30; i++) {
        const tree = new Tree();
        tree.object.position = new Point(
          Math.floor(Math.random() * WORLD_WIDTH),
          Math.floor(Math.random() * WORLD_HEIGHT),
        );
        tree.object.zIndex = -tree.object.position.y;
        world.utils.addObject(tree);
      }

      Input.zoom.in.press = () =>
        world.setViewportScale(world.getViewportScale() + 1);
      Input.zoom.out.press = () =>
        world.setViewportScale(world.getViewportScale() - 1);

      debug.watch("camera", () => `x: ${-world.stage.x}  y: ${-world.stage.y}`);
      debug.watch(
        "player",
        () => `x: ${player.position.x}  y: ${player.position.y}`,
      );

      this.app.stage.addChild(debug.text);

      this.app.ticker.add((delta) => {
        delta;

        player.update();

        world.setCameraPos(player.position.x, player.position.y);

        world.stage.children.sort(function (a, b) {
          if (a.position.y > b.position.y) return 1;
          if (a.position.y < b.position.y) return -1;
          if (a.position.x > b.position.x) return 1;
          if (a.position.x < b.position.x) return -1;
          return 0;
        });

        debug.updateText();
      });
    } catch (err) {
      console.error(err);
    }
  }
}
