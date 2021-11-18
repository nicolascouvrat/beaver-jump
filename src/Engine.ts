import {State} from './State.js';
import {Sprite} from './sprites/Sprite.js';

export class Engine {
  private fpsFrame: HTMLElement;
  private canvas: HTMLCanvasElement;
  private context: CanvasRenderingContext2D;
  private static WIDTH: number = 600;
  private static HEIGHT: number = 150;
  private frameCounter: number = 0;

  constructor(parent: Document) {
    var canvas = parent.createElement('canvas') as HTMLCanvasElement;
    var fpsFrame = parent.createElement('div');
    parent.body.appendChild(canvas);
    parent.body.appendChild(fpsFrame);
    canvas.style.width = `${Engine.WIDTH}px`;
    canvas.style.height = `${Engine.HEIGHT}px`;
    var context = canvas.getContext('2d') as CanvasRenderingContext2D;
    this.canvas = canvas;
    this.context = context;
    this.fpsFrame = fpsFrame;
  }

  render(state: State) {
    this.clear();
    this.frameCounter = this.frameCounter + 1;
    this.fpsFrame.innerHTML = `${this.frameCounter}`;
    state.sprites.forEach((sprite: Sprite): void => this.renderSprite(sprite));
  }

  renderSprite(sprite: Sprite) {
    this.context.fillStyle = sprite.asset;
    if (sprite.position.y > 150 || sprite.position.y < 0) {
      console.log('yo what');
    }
    this.context.fillRect(
      sprite.position.x,
      this.canvas.height - sprite.position.y,
      sprite.size.width,
      -sprite.size.height
    );
  }

  clear(): void {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }
}
