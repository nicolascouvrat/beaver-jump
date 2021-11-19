import {Vector} from '../common/Vector.js';
import {Size} from '../common/Size.js';
import {PressedKeys, Keys} from '../Controller.js';
import {
  AirTime,
  PlayerHeight,
  PlayerWidth,
  JumpSpeed,
  Gravity,
} from '../Constants.js';

export class Player {
  position: Vector;
  size: Size;
  asset: string = 'red';
  private ySpeed: number = 0;
  private constrainMove: (to: Vector, size: Size) => Vector;
  private airborn: boolean = false;

  constructor(
    startingPosition: Vector,
    constrainMove: (to: Vector, size: Size) => Vector
  ) {
    this.position = startingPosition;
    this.size = new Size(PlayerWidth, PlayerHeight);
    this.constrainMove = constrainMove;
  }

  update(stepMs: number, keys: PressedKeys): void {
    if (keys[Keys.SPACE] && !this.airborn) {
      this.jump();
      return;
    }

    var newPosition = this.position.plus(new Vector(0, this.ySpeed * stepMs));
    this.ySpeed = this.ySpeed - Gravity * stepMs;
    this.position = this.constrainMove(newPosition, this.size);
  }

  jump(): void {
    this.ySpeed = JumpSpeed;
    this.airborn = true;
    setTimeout(() => (this.airborn = false), AirTime * 1000);
  }
}
