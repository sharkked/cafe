import { Point, AnimatedSprite, Filter } from "pixi.js";
import { Input } from "@/game/input";
import type { GameObject } from "@/game/interfaces";
import { Textures } from "@/game/sprites";

const MOVE_SPEED = 1.0;

export class Player implements GameObject {
  object: AnimatedSprite;
  filter: Filter;
  position: Point;
  isFacingLeft: boolean;

  constructor() {
    this.object = new AnimatedSprite(Textures.player.stand);
    this.object.anchor.set(0.5, 1);
    this.object.animationSpeed = 1;
    this.object.play();
    const frag = `
    precision mediump float;
    uniform vec3 color;
    varying vec2 vTextureCoord;
    uniform sampler2D uSampler;
    void main(void)
    {
      gl_FragColor = texture2D(uSampler, vTextureCoord) * vec4(color, 1.0);
    }
    `;

    this.filter = new Filter(undefined, frag, { color: [0.0, 1.0, 1.0] });
    this.object.filters = [this.filter];

    this.position = new Point();
    this.isFacingLeft = false;

    this.init();
  }

  init() {
    this.position = new Point();
    this.isFacingLeft = false;
  }

  update() {
    const input = new Point(
      +Input.right.isDown - +Input.left.isDown,
      +Input.down.isDown - +Input.up.isDown,
    );

    const wasFacingLeft = this.isFacingLeft;
    if (input.x != 0 || input.y != 0) {
      if (this.object.textures !== Textures.player.walk) {
        this.object.textures = Textures.player.walk;
        this.object.play();
      }
      if (input.x != 0) {
        this.isFacingLeft = input.x < 0;
      }
    } else {
      this.object.textures = Textures.player.stand;
    }

    if (this.isFacingLeft != wasFacingLeft) {
      this.object.scale.x =
        Math.abs(this.object.scale.x) * (this.isFacingLeft ? -1 : 1);
    }

    const speed = MOVE_SPEED * (Input.run.isDown ? 2 : 1);

    this.position.x += input.x * speed;
    this.position.y += input.y * speed;

    this.object.position = this.position;
    this.object.zIndex = this.position.y;
  }
}
