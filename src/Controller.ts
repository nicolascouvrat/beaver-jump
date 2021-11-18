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

type PressedKeys2 = Record<Key, boolean>;

export class Controller {
  pressedKeys: PressedKeys = {[Keys.SPACE]: false};
  keys: PressedKeys2 = {[Key.SPACE]: false};

  constructor() {
    this.keys = {[Key.SPACE]: false};
  }
  register(): void {
    var callback = this.onPress.bind(this);
    window.addEventListener('keyup', callback);
    window.addEventListener('keydown', callback);
  }

  onPress(event: KeyboardEvent): void {
    if (event.key === Keys.SPACE) {
      this.pressedKeys[Keys.SPACE] = event.type === 'keydown';
      event.preventDefault();
    }
  }
}
