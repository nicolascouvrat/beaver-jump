import {Sprite} from './sprites/Sprite.js';
import {PressedKeys} from './Controller.js';
import {Vector} from './common/Vector.js';
import {Player} from './sprites/Player.js';
import {Size} from './common/Size.js';
import {Boundaries} from './common/Boundaries.js';
import {ScreenHeight, ScreenWidth} from './Constants.js';

interface GameObject {
  size: Size;
  position: Vector;
}

const topBoundary: GameObject = {
  size: new Size(600, 0),
  position: new Vector(0, 150),
};

const bottomBoundary: GameObject = {
  size: new Size(600, 0),
  position: new Vector(0, 0),
};

class Range {
  constructor(public readonly min: number, public readonly max: number) {}

  intersects(that: Range): boolean {
    if (this.min < that.min) {
      return this.max > that.min;
    }

    return this.min < that.max;
  }
}

class HitBox {
  readonly xRange: Range;
  readonly yRange: Range;

  constructor(o: GameObject) {
    this.xRange = new Range(o.position.x, o.position.x + o.size.width);
    this.yRange = new Range(o.position.y, o.position.y + o.size.height);
  }

  intersects(that: HitBox): boolean {
    return (
      this.xRange.intersects(that.xRange) && this.yRange.intersects(that.yRange)
    );
  }
}

function collide(a: GameObject, b: GameObject): boolean {
  return new HitBox(a).intersects(new HitBox(b));
}

/**
 * The current game state
 */
export class State {
  readonly sprites: Sprite[];
  private static readonly boundaries: Boundaries = new Boundaries(
    0,
    ScreenWidth,
    0,
    ScreenHeight
  );
  constructor(sprites: Sprite[]) {
    this.sprites = sprites;
  }

  static init(): State {
    const player = new Player(new Vector(1, 0), State.boundaries.constrain);
    return new State([player]);
  }

  update(stepMs: number, keys: PressedKeys): State {
    this.sprites.forEach(sprite => sprite.update(stepMs, keys));
    return new State(this.sprites);
  }
}
