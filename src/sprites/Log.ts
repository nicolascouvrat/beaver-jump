import {Vector} from '../common/Vector.js';
import {Size} from '../common/Size.js';
import {PressedKeys} from '../Controller.js';
import {Speed, LogImg} from '../Constants.js';

export class Log {
  readonly animationFrame = 0;
  readonly size = new Size(32, 32);
  readonly asset = LogImg;

  constructor(public position: Vector) {}

  update(step: number, _: PressedKeys) {
    var newPosition = this.position.plus(new Vector(-Speed * step, 0));
    this.position = newPosition;
  }
}
