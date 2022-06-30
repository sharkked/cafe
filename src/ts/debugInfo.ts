import { Text } from "pixi.js";

export class DebugInfo {
  public text: Text;

  private info: {
    label: string;
    cb: () => void;
  }[];

  constructor() {
    this.text = new Text("", { fill: 0xffffff, fontSize: "1 rem" });
    this.info = [];
  }

  watch(label: string, cb: () => number | void) {
    this.info.push({label: label, cb: cb})
  }

  updateText() {
    this.text.text = this.info.map(it => `${it.label}: ${it.cb()}`).join('\n');
  }
}