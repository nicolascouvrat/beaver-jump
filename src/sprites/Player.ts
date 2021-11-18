import {Vector} from '../common/Vector.js';
import {Size} from '../common/Size.js';
import {PressedKeys, Keys} from '../Controller.js';

export class Player {
  position: Vector;
  size: Size;
  asset: string = 'red';

  constructor(startingPosition: Vector) {
    this.position = startingPosition;
    this.size = new Size(78, 52);
  }

  update(stepMs: number, keys: PressedKeys): void {
    if (keys[Keys.SPACE]) {
      this.asset = 'green';
      return;
    }

    this.asset = 'red';
  }
}
