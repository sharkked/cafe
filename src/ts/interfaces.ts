import type { Container, Point } from "pixi.js";

export interface GameObject {
  object: Container,
  position: Point,
  update?(delta: number): void,
}