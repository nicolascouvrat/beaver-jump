import {State} from './State.js';
import {Sprite} from './sprites/Sprite.js';

export class Engine {
  private canvas: HTMLCanvasElement;
  private context: CanvasRenderingContext2D;
  private static WIDTH: number = 600;
  private static HEIGHT: number = 150;

  constructor(parent: Document) {
    var canvas = parent.createElement('canvas') as HTMLCanvasElement;
    parent.body.appendChild(canvas);
    canvas.style.width = `${Engine.WIDTH}px`;
    canvas.style.height = `${Engine.HEIGHT}px`;
    var context = canvas.getContext('2d') as CanvasRenderingContext2D;
    this.canvas = canvas;
    this.context = context;
  }

  render(state: State) {
    this.clear();
    state.sprites.forEach((sprite: Sprite): void => this.renderSprite(sprite));
  }

  renderSprite(sprite: Sprite) {
    this.context.fillStyle = sprite.asset;
    this.context.fillRect(
      sprite.position.x,
      sprite.position.y,
      sprite.size.width,
      sprite.size.height
    );
  }

  clear(): void {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }
}
