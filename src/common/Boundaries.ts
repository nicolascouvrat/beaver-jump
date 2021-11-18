import {Vector} from './Vector.js';
import {Size} from './Size.js';

export class Boundaries {
  constructor(
    public readonly minX: number,
    public readonly maxX: number,
    public readonly minY: number,
    public readonly maxY: number
  ) {
    this.constrain = this.constrain.bind(this);
  }

  /**
   * Constrains an object of a given size within the boundaries, returning the closest possible
   * position
   */
  constrain(desired: Vector, size: Size): Vector {
    var x = Math.min(Math.max(desired.x, this.minX), this.maxX - size.width);
    var y = Math.min(Math.max(desired.y, this.minY), this.maxY - size.height);
    return new Vector(x, y);
  }
}
