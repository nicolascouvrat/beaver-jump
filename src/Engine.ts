import {State, Stage} from './State.js';
import {Sprite} from './sprites/Sprite.js';
import {ScreenHeight, ScreenWidth} from './Constants.js';
import {Images} from './Images.js';
import {Background} from './Background.js';

const GameOverMessage: string = 'GAME OVER';
const GameOverMessageFontSize: number = 30;
const PressStartMessage = '(PRESS SPACE TO START)';
const ControlsMessage = 'SPACE = JUMP, COLLECT LOGS, AVOID ROCKS!';
const ControlsFontSize = 12;
const ScoreMessage: string = 'SCORE: ';
const ScoreFontSize: number = 20;
const Font = 'prstart';

export class Engine {
  private canvas: HTMLCanvasElement;
  private context: CanvasRenderingContext2D;
  private images: Images;

  constructor(parent: Document, images: Images) {
    var canvas = parent.createElement('canvas') as HTMLCanvasElement;
    canvas.setAttribute('class', 'gameCanvas');
    parent.body.appendChild(canvas);
    canvas.width = ScreenWidth;
    canvas.height = ScreenHeight;
    var context = canvas.getContext('2d') as CanvasRenderingContext2D;
    this.canvas = canvas;
    this.context = context;
    this.images = images;
  }

  render(state: State) {
    this.clear();
    this.renderBackground(state.background);
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

  displayStartMessage() {
    this.context.fillStyle = 'black';
    this.context.font = ` ${ScoreFontSize}px ${Font}`;
    var txtSize = this.context.measureText(PressStartMessage);
    this.context.fillText(
      PressStartMessage,
      (this.canvas.width - txtSize.width) / 2,
      this.canvas.height
    );
  }

  displayControlsMessage() {
    this.context.fillStyle = 'black';
    this.context.font = ` ${ControlsFontSize}px ${Font}`;
    var txtSize = this.context.measureText(ControlsMessage);
    this.context.fillText(
      ControlsMessage,
      (this.canvas.width - txtSize.width) / 2,
      (this.canvas.height + ControlsFontSize) / 2
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
    if (this.images[sprite.asset]) {
      const img = this.images[sprite.asset];
      this.context.drawImage(
        img,
        sprite.size.width * sprite.animationFrame,
        0,
        sprite.size.width,
        sprite.size.height,
        sprite.position.x,
        this.canvas.height - sprite.position.y - sprite.size.height,
        sprite.size.width,
        sprite.size.height
      );
      return;
    }

    this.context.fillStyle = sprite.asset;
    this.context.fillRect(
      sprite.position.x,
      this.canvas.height - sprite.position.y,
      sprite.size.width,
      -sprite.size.height
    );
  }

  renderBackground(background: Background) {
    const img = this.images[background.asset];
    this.context.drawImage(
      img,
      -background.position.x,
      0,
      background.size.width,
      background.size.height,
      0,
      0,
      background.size.width,
      background.size.height
    );
    this.context.drawImage(
      img,
      0,
      0,
      background.size.width,
      background.size.height,
      ScreenWidth + background.position.x,
      0,
      background.size.width,
      background.size.height
    );
  }

  clear(): void {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }
}
