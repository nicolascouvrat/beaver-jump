import {Vector} from '../common/Vector.js';
import {Size} from '../common/Size.js';
import {PressedKeys, Keys} from '../Controller.js';
import {PlayerHeight, PlayerWidth, JumpSpeed, Gravity} from '../Constants.js';

export class Player {
  position: Vector;
  size: Size;
  asset: string = 'red';
  private ySpeed: number = 0;
  private constrainMove: (to: Vector, size: Size) => Vector;
  private static jumpSpeed: number = 100;
  // For a smooth jump, we want to be at the top right when the speed reaches 0 which means that we
  // have V0 = sqrt(2gH)
  private static gravity: number =
    Math.pow(Player.jumpSpeed, 2) / (2 * (150 - 52));

  constructor(
    startingPosition: Vector,
    constrainMove: (to: Vector, size: Size) => Vector
  ) {
    this.position = startingPosition;
    this.size = new Size(PlayerWidth, PlayerHeight);
    this.constrainMove = constrainMove;
  }

  update(stepMs: number, keys: PressedKeys): void {
    if (keys[Keys.SPACE]) {
      this.ySpeed = JumpSpeed;
      return;
    }

    var newPosition = this.position.plus(new Vector(0, this.ySpeed * stepMs));
    this.ySpeed = this.ySpeed - Gravity * stepMs;
    this.position = this.constrainMove(newPosition, this.size);
  }
}
