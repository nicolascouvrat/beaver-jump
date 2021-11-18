export class Vector {
  constructor(public readonly x: number, public readonly y: number) {}

  plus(that: Vector): Vector {
    return new Vector(this.x + that.x, this.y + that.y);
  }

  times(n: number): Vector {
    return new Vector(this.x * n, this.y * n);
  }
}
