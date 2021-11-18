import {Sprite} from './sprites/Sprite.js';
import {PressedKeys} from './Controller.js';

/**
 * The current game state
 */
export class State {
  readonly sprites: Sprite[];

  constructor(sprites: Sprite[]) {
    this.sprites = sprites;
  }

  update(stepMs: number, keys: PressedKeys): State {
    this.sprites.forEach(sprite => sprite.update(stepMs, keys));
    // console.log(keys);
    return new State(this.sprites);
  }
}
