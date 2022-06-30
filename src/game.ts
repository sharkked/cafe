import * as PIXI from "pixi.js";
import {getKey} from "@/keyboard";

// Create and render application
const app = new PIXI.Application({
    width: window.innerWidth,
    height: window.innerHeight,
    resolution: window.devicePixelRatio || 1,
});
const MOVE_SPEED = 5.0;
let x_pos = app.screen.width / 2;
let y_pos = app.screen.height / 2;

const moveLeft = getKey("a");
const moveRight = getKey("d");
const moveUp = getKey("w");
const moveDown = getKey("s");

const texture = PIXI.Texture.from("src/assets/sample.png");

const sprite = new PIXI.Sprite(texture);
sprite.interactive = true;
sprite.on('pointerdown', onClick);

const gr  = new PIXI.Graphics();
gr.lineStyle(1, 0xffffff);

app.stage.addChild(gr)

gr.x = app.screen.width / 2;
gr.y = app.screen.height / 2;

gr.pivot.x = gr.width / 2;
gr.pivot.y = gr.height / 2;

let elapsed = 0.0;
app.ticker.add((delta) => {
    elapsed += delta;
    gr.clear()
    gr.lineStyle(1, 0xffffff);
    gr.drawCircle(0, 0, 30 + Math.cos(elapsed / 50));
    gr.x += (+moveRight.isDown - +moveLeft.isDown) * MOVE_SPEED;
    gr.y += (+moveDown.isDown - +moveUp.isDown) * MOVE_SPEED;
})

function onClick() {

}

export default app.view;
