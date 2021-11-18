import {Vector} from '../common/Vector.js';
import {Size} from '../common/Size.js';

export class Player {
  position: Vector;
  size: Size;
  asset: string = 'red';

  constructor(startingPosition: Vector) {
    this.position = startingPosition;
    this.size = new Size(78, 52);
  }
}
