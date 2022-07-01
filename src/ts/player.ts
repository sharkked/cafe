import { Sprite, Point, Texture, AnimatedSprite } from "pixi.js";
import type { GameObject } from "./interfaces";
import { getKey, type InputKey } from "./keyboard";

const MOVE_SPEED = 1.0;

export class Player implements GameObject {
  object: AnimatedSprite;
  position: Point;
  isFacingLeft: boolean;

  animations: { [name: string]: Texture[] };
  move: { [name: string]: InputKey };

  constructor() {
    this.animations = {
      walk: [],
      stand: [],
    };

    let i;

    for (i = 0; i < 14; i++) {
      const texture = Texture.from(`walk/${i}.png`);
      this.animations.walk.push(texture);
    }

    this.animations.stand.push(Texture.from("stand.png"));

    this.object = new AnimatedSprite(this.animations.stand);
    this.object.anchor.set(0.5);
    this.object.animationSpeed = 1;
    this.object.play();

    this.position = new Point();
    this.isFacingLeft = false;

    this.move = {
      left: getKey("a"),
      right: getKey("d"),
      up: getKey("w"),
      down: getKey("s"),
    }
      
    this.init();
  }

  init() {
    this.position = new Point();
    this.isFacingLeft = false;
  }

  update(delta: number) {
    const move = new Point(
      +this.move.right.isDown - +this.move.left.isDown, 
      +this.move.down.isDown - +this.move.up.isDown
    );
    
    const wasFacingLeft = this.isFacingLeft;
    if (move.x != 0 || move.y != 0) {
      if (this.object.textures !== this.animations.walk) {
        this.object.textures = this.animations.walk
        this.object.play();
      }
      if (move.x != 0) {
        this.isFacingLeft = (move.x < 0);
      }
    } else {
      this.object.textures = this.animations.stand
    }

    if (this.isFacingLeft != wasFacingLeft) {
      this.object.scale.x = Math.abs(this.object.scale.x) * (this.isFacingLeft ? -1 : 1);
    }

    this.position.x += move.x * MOVE_SPEED;
    this.position.y += move.y * MOVE_SPEED;

    this.object.position = this.position;
  }
}