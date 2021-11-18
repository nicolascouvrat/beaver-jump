import {Vector} from '../common/Vector.js';
import {Size} from '../common/Size.js';
import {PressedKeys} from '../Controller.js';

/**
 * A sprite represents a game element that can move and that the player can interact with.
 */
export interface Sprite {
  size: Size;
  position: Vector;
  asset: string;
  update(stepMs: number, keys: PressedKeys): void;
}
