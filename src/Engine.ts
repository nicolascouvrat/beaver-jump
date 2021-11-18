export class Engine {
  private canvas: HTMLCanvasElement;
  private context: CanvasRenderingContext2D;
  private static WIDTH: Number = 600;
  private static HEIGHT: Number = 150;

  constructor(parent: Document) {
    var canvas = parent.createElement('canvas') as HTMLCanvasElement;
    canvas.style.width = String(Engine.WIDTH);
    canvas.style.height = String(Engine.HEIGHT);
    parent.body.appendChild(canvas);
    var context = canvas.getContext('2d') as CanvasRenderingContext2D;
    this.canvas = canvas;
    this.context = context;
    context.fillStyle = 'red';
    context.fillRect(10, 20, 100, 50);
  }
}
