import {Vector} from './Vector.js';
import {Size} from './Size.js';

interface GameObject {
  position: Vector;
  size: Size;
}

export class Boundaries {
  constructor(
    public readonly minX: number,
    public readonly maxX: number,
    public readonly minY: number,
    public readonly maxY: number
  ) {
    this.constrain = this.constrain.bind(this);
    this.isOutOfBounds = this.isOutOfBounds.bind(this);
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

  /**
   * Returns true if the object is completely out of these boudaries
   */
  isOutOfBounds(o: GameObject): boolean {
    const maxObjectX = o.position.x + o.size.width;
    const minObjectX = o.position.x;
    const maxObjectY = o.position.y + o.size.height;
    const minObjectY = o.position.y;
    if (maxObjectX < this.minX) {
      return true;
    }

    if (minObjectX > this.maxX) {
      return true;
    }

    if (minObjectY > this.maxY) {
      return true;
    }

    return maxObjectX < this.minY;
  }
}
