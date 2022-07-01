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
    value: value,
    isDown: false,
    isUp: true,
    downHandler: (event) => {
      if (event.key.toLowerCase() === key.value) {
        if (key.isUp && key.press) {
          key.press();
        }
        key.isDown = true;
        key.isUp = false;
        event.preventDefault();
      }
    },
    upHandler: (event) => {
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
