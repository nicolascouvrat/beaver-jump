import {State, Stage} from './State.js';
import {Engine} from './Engine.js';
import {Controller} from './Controller.js';
import {loadAllImages} from './Images.js';
import {AllImages} from './Constants.js';

function runGame(engine: Engine, controller: Controller): Promise<void> {
  var state = State.init();
  return loop((step: number): boolean => {
    state = state.update(step, controller.pressedKeys);
    engine.render(state);
    return state.stage != Stage.LOST;
  }).then(_ => sleep(1000));
}

export function run(aDocument: Document): Promise<void> {
  return loadAllImages(AllImages).then(images => {
    const engine = new Engine(aDocument, images);
    const controller = new Controller();
    controller.register();
    engine.displayControlsMessage();
    return new Promise(_ => {
      standbyAndRun(controller, engine);
    });
  });
}

function standbyAndRun(controller: Controller, engine: Engine) {
  engine.displayStartMessage();
  controller.registerCallback(() => {
    controller.unregisterCallback();
    runGame(engine, controller).then(__ => standbyAndRun(controller, engine));
  });
}

function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * The main game loop. It will endlessly schedule callbacks until one of them returns false, passing
 * to callback the time in milliseconds since the last one.
 */
function loop(callback: (step: number) => boolean): Promise<void> {
  return new Promise(resolve => {
    var previousRun = -1;
    var renderOneFrame = (now: number): void => {
      if (previousRun !== -1) {
        var step = Math.min(now - previousRun, 100) / 1000;
        if (!callback(step)) {
          resolve();
          return;
        }
      }

      previousRun = now;
      requestAnimationFrame(renderOneFrame);
    };

    requestAnimationFrame(renderOneFrame);
  });
}
