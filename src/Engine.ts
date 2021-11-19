import {State, Stage} from './State.js';
import {Sprite} from './sprites/Sprite.js';
import {ScreenHeight, ScreenWidth} from './Constants.js';

const GameOverMessage: string = 'GAME OVER';
const GameOverMessageFontSize: number = 30;
const ScoreMessage: string = 'SCORE: ';
const ScoreFontSize: number = 20;
const Font = 'prstart';

export class Engine {
  private canvas: HTMLCanvasElement;
  private context: CanvasRenderingContext2D;

  constructor(parent: Document) {
    var canvas = parent.createElement('canvas') as HTMLCanvasElement;
    canvas.setAttribute('class', 'gameCanvas');
    parent.body.appendChild(canvas);
    canvas.width = ScreenWidth;
    canvas.height = ScreenHeight;
    var context = canvas.getContext('2d') as CanvasRenderingContext2D;
    this.canvas = canvas;
    this.context = context;
  }

  render(state: State) {
    this.clear();
    this.renderSprite(state.player);
    state.sprites.forEach((sprite: Sprite): void => this.renderSprite(sprite));
    this.displayScore(state.score);
    if (state.stage === Stage.LOST) {
      this.displayGameOverMessage();
      return;
    }
  }

  displayScore(score: number) {
    this.context.fillStyle = 'black';
    this.context.font = ` ${ScoreFontSize}px ${Font}`;
    const msg = `${ScoreMessage} ${score}`;
    var txtSize = this.context.measureText(msg);
    this.context.fillText(
      msg,
      this.canvas.width - txtSize.width,
      ScoreFontSize
    );
  }
  displayGameOverMessage() {
    this.context.fillStyle = 'black';
    this.context.font = ` ${GameOverMessageFontSize}px ${Font}`;
    var txtSize = this.context.measureText(GameOverMessage);
    this.context.fillText(
      GameOverMessage,
      (this.canvas.width - txtSize.width) / 2,
      (this.canvas.height + GameOverMessageFontSize) / 2
    );
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
