import type { Loader } from "pixi.js";

export function loadAssets(loader: Loader, cb: (err?: Error | null) => void) {
  try {
    loader.add("spritesheet", "assets/spritesheet/player.json")
    loader.load(function() {
      // Add any post-loading code here
      cb(null);
    });
  } catch(err: any) {
    cb(err);
  }
}