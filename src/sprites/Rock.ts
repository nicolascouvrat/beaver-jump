import {Vector} from '../common/Vector.js';
import {Size} from '../common/Size.js';
import {PressedKeys} from '../Controller.js';
import {
  BigRockHeight,
  SmallRockHeight,
  Speed,
  RockWidth,
  SmallRockImg,
  HigherRockImg,
} from '../Constants.js';

export class Rock {
  constructor(
    public size: Size,
    public position: Vector,
    public asset: string
  ) {}

  update(step: number, _: PressedKeys) {
    var newPosition = this.position.plus(new Vector(-Speed * step, 0));
    this.position = newPosition;
  }
}

const BigRock = (position: Vector): Rock =>
  new Rock(new Size(RockWidth, BigRockHeight), position, HigherRockImg);
const SmallRock = (position: Vector): Rock =>
  new Rock(new Size(RockWidth, SmallRockHeight), position, SmallRockImg);

export function generateRock(position: Vector): Rock {
  var seed = Math.random();
  if (seed > 0.4) {
    return BigRock(position);
  }

  return SmallRock(position);
}
