import {Vector} from './common/Vector.js';
import {Size} from './common/Size.js';
import {BackgroundImg, Speed} from './Constants.js';

export class Background {
  readonly size = new Size(600, 150);
  position = new Vector(0, 0);
  asset = BackgroundImg;

  advance(step: number) {
    const newX = (this.position.x - step * Speed) % this.size.width;
    this.position = new Vector(newX, 0);
  }
}
