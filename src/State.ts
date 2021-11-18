import {Sprite} from './sprites/Sprite.js';

/**
 * The current game state
 */
export class State {
  readonly sprites: Sprite[];

  constructor(sprites: Sprite[]) {
    this.sprites = sprites;
  }
}
