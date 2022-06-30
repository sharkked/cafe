import {
  Application,
  Graphics,
  Text,
} from "pixi.js";
import { World } from "./world";
import { getKey } from "@/ts/keyboard";
import { DebugInfo } from "./debugInfo";

export class Game {
  private app: Application;

  constructor(canvas?: HTMLCanvasElement | null) {
    let view: HTMLElement | null = canvas ?? null;

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
    const world = new World(200, 200);
    this.app.stage.addChild(world.container);

    world.setCameraOffset(
      this.app.renderer.screen.width / 2,
      this.app.renderer.screen.height / 2,
    );

    world.utils.addCircle(0, 0, 50);

    const debug = new DebugInfo();
    this.app.stage.addChild(debug.text);

    debug.watch("camera x", () => -world.container.x);
    debug.watch("camera y", () => -world.container.y);

    const MOVE_SPEED = 5.0;

    const moveLeft = getKey("a");
    const moveRight = getKey("d");
    const moveUp = getKey("w");
    const moveDown = getKey("s");

    const gr = new Graphics();
    gr.lineStyle(1, 0xffffff);

    world.container.addChild(gr);

    gr.pivot.x = gr.width / 2;
    gr.pivot.y = gr.height / 2;

    debug.watch("player x", () => gr.x);
    debug.watch("player y", () => gr.y);

    let elapsed = 0.0;
    this.app.ticker.add((delta) => {
      elapsed += delta;
      gr.clear();
      gr.lineStyle(1, 0xffffff);
      gr.drawCircle(0, 0, 30 + Math.cos(elapsed / 50));
      gr.x += (+moveRight.isDown - +moveLeft.isDown) * MOVE_SPEED;
      gr.y += (+moveDown.isDown - +moveUp.isDown) * MOVE_SPEED;

      world.setCameraPos(gr.x, gr.y);

      debug.updateText();
    });
  }
}
