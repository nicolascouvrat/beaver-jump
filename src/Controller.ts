export enum Keys {
  SPACE = ' ',
}

export type PressedKeys = Record<Keys, boolean>;

enum Key {
  SPACE,
}

const keyLookup: Record<Key, string> = {
  [Key.SPACE]: ' ',
};

export class Controller {
  pressedKeys: PressedKeys = {[Keys.SPACE]: false};
  onSpacePressed: () => void = () => {};

  constructor() {}

  register(): void {
    var callback = this.onPress.bind(this);
    window.addEventListener('keyup', callback);
    window.addEventListener('keydown', callback);
  }

  onPress(event: KeyboardEvent): void {
    if (event.key === Keys.SPACE) {
      this.pressedKeys[Keys.SPACE] = event.type === 'keydown';
      this.onSpacePressed();
      event.preventDefault();
    }
  }

  registerCallback(f: () => void) {
    this.onSpacePressed = f;
  }

  unregisterCallback() {
    this.onSpacePressed = () => {};
  }
}
