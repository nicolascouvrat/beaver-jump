import {State} from './State.js';
import {Sprite} from './sprites/Sprite.js';
import {ScreenHeight, ScreenWidth} from './Constants.js';

export class Engine {
  private canvas: HTMLCanvasElement;
  private context: CanvasRenderingContext2D;
  // DEBUG, remove me
  private frameCounter: number = 0;
  private fpsFrame: HTMLElement;

  constructor(parent: Document) {
    var canvas = parent.createElement('canvas') as HTMLCanvasElement;
    var fpsFrame = parent.createElement('div');
    parent.body.appendChild(canvas);
    parent.body.appendChild(fpsFrame);
    canvas.width = ScreenWidth;
    canvas.height = ScreenHeight;
    var context = canvas.getContext('2d') as CanvasRenderingContext2D;
    this.canvas = canvas;
    this.context = context;
    this.fpsFrame = fpsFrame;
  }

  render(state: State) {
    this.clear();
    this.context.fillStyle = 'yellow';
    this.context.fillRect(0, 0, 78, 52);
    state.sprites.forEach((sprite: Sprite): void => this.renderSprite(sprite));
    this.frameCounter = this.frameCounter + 1;
    this.fpsFrame.innerHTML = `${this.frameCounter}`;
  }

  renderSprite(sprite: Sprite) {
    this.context.fillStyle = sprite.asset;
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
