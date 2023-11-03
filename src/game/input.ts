export interface InputKey {
  value: string;
  isDown: boolean;
  isUp: boolean;
  press?: () => unknown | undefined;
  release?: () => unknown | undefined;
  downHandler: (event: KeyboardEvent) => void;
  upHandler: (event: KeyboardEvent) => void;
  unsubscribe?: () => void;
}

export function getKey(value: string) {
  const key: InputKey = {
    value,
    isDown: false,
    isUp: true,
    downHandler: (event) => {
      if (!Input.enabled) return;
      event.preventDefault();

      if (event.key.toLowerCase() === key.value) {
        if (key.isUp && key.press) {
          key.press();
        }
        key.isDown = true;
        key.isUp = false;
      }
    },
    upHandler: (event) => {
      if (!Input.enabled) return;
      if (event.key.toLowerCase() === key.value) {
        if (key.isDown && key.release) {
          key.release();
        }
        key.isDown = false;
        key.isUp = true;
        event.preventDefault();
      }
    },
  };

  const downListener = key.downHandler.bind(key);
  const upListener = key.upHandler.bind(key);

  window.addEventListener("keydown", downListener, false);
  window.addEventListener("keyup", upListener, false);

  key.unsubscribe = () => {
    window.removeEventListener("keydown", downListener);
    window.removeEventListener("keyup", upListener);
  };

  return key;
}

export interface InputAction {
  name: string;
}

export class Input {
  static enabled = true;

  static left = getKey("a");
  static right = getKey("d");
  static up = getKey("w");
  static down = getKey("s");
  static run = getKey("shift");

  static zoom = {
    in: getKey("o"),
    out: getKey("p"),
  };

  static enable() {
    this.enabled = true;
  }

  static disable() {
    this.enabled = false;
    this.left.isDown = false;
    this.right.isDown = false;
    this.up.isDown = false;
    this.down.isDown = false;
    this.zoom.in.isDown = false;
    this.zoom.out.isDown = false;
  }
}
