import {State} from './State.js';
import {Player} from './sprites/Player.js';
import {Vector} from './common/Vector.js';
import {Engine} from './Engine.js';

export function run(aDocument: Document): Promise<void> {
  const state = new State([new Player(new Vector(0, 0))]);
  const engine = new Engine(aDocument);
  return new Promise(_ => {
    loop((stepMs: number): boolean => {
      engine.render(state);
      return true;
    });
  });
}

/**
 * The main game loop. It will endlessly schedule callbacks until one of them returns false, passing
 * to callback the time in milliseconds since the last one.
 */
function loop(callback: (step: number) => boolean): void {
  var previousRun = -1;
  var renderOneFrame = (now: number): void => {
    if (previousRun !== -1) {
      var step = Math.min(now - previousRun, 100) / 1000;
      if (!callback(step)) {
        return;
      }
    }

    previousRun = now;
    requestAnimationFrame(renderOneFrame);
  };

  requestAnimationFrame(renderOneFrame);
}
