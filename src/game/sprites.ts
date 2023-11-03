import { Assets, Texture, SCALE_MODES } from "pixi.js";

type TexMap = {
  [k: string]: Texture[];
};

export class Textures {
  static player: TexMap;
  static tree: Texture;

  static async preload() {
    const playerTex = await Assets.load("assets/textures/player.json");
    playerTex.baseTexture.scaleMode = SCALE_MODES.NEAREST;

    this.player = {
      stand: playerTex.animations["stand"],
      walk: playerTex.animations["walk"],
    };

    this.tree = await Assets.load("assets/textures/tree.png");
    this.tree.baseTexture.scaleMode = SCALE_MODES.NEAREST;
  }
}
