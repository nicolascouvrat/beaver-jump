import {State, Stage} from './State.js';
import {Engine} from './Engine.js';
import {Controller} from './Controller.js';
import {loadAllImages} from './Images.js';
import {AllImages} from './Constants.js';

export function run(aDocument: Document): Promise<void> {
  return loadAllImages(AllImages).then(images => {
    var state = State.init();
    const engine = new Engine(aDocument, images);
    const controller = new Controller();
    controller.register();
    return new Promise(_ => {
      loop((stepMs: number): boolean => {
        state = state.update(stepMs, controller.pressedKeys);
        engine.render(state);
        return state.stage != Stage.LOST;
      });
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
