import {Sprite} from './sprites/Sprite.js';
import {PressedKeys} from './Controller.js';
import {Vector} from './common/Vector.js';
import {Player} from './sprites/Player.js';
import {Size} from './common/Size.js';
import {Boundaries} from './common/Boundaries.js';
import {Log} from './sprites/Log.js';
import {
  ScreenHeight,
  LogHeight,
  ScreenWidth,
  StartingStageDuration,
  Speed,
  RockWidth,
  PlayerWidth,
  PlayerHeight,
  JumpSpeed,
  RockSpawnDifficulty,
  PointsPerRock,
  LogSpawnDifficulty,
  PointsPerLog,
  BigRockHeight,
  LogWidth,
} from './Constants.js';
import {Rock, generateRock} from './sprites/Rock.js';

interface GameObject {
  size: Size;
  position: Vector;
}

const topBoundary: GameObject = {
  size: new Size(600, 0),
  position: new Vector(0, 150),
};

const bottomBoundary: GameObject = {
  size: new Size(600, 0),
  position: new Vector(0, 0),
};

class Range {
  constructor(public readonly min: number, public readonly max: number) {}

  intersects(that: Range): boolean {
    if (this.min < that.min) {
      return this.max > that.min;
    }

    return this.min < that.max;
  }
}

class HitBox {
  readonly xRange: Range;
  readonly yRange: Range;

  constructor(o: GameObject) {
    this.xRange = new Range(o.position.x, o.position.x + o.size.width);
    this.yRange = new Range(o.position.y, o.position.y + o.size.height);
  }

  intersects(that: HitBox): boolean {
    return (
      this.xRange.intersects(that.xRange) && this.yRange.intersects(that.yRange)
    );
  }
}

function collide(a: GameObject, b: GameObject): boolean {
  return new HitBox(a).intersects(new HitBox(b));
}

const boundaries: Boundaries = new Boundaries(0, ScreenWidth, 0, ScreenHeight);
const spawnPoint: Vector = new Vector(ScreenWidth, 0);
const rockSpawnChance = 0.1;
const logSpawnChance = 0.1;

// This is the minimal spacing between 2 rocks if you do pixel perfect jumps, i.e you start at the
// exact right time so the curve fits perfectly above the largest rock
const minRockSpacing =
  PlayerWidth +
  ((2 * Speed * 2 * (ScreenHeight - PlayerHeight)) / JumpSpeed) *
    (1 - Math.sqrt(1 - BigRockHeight / (ScreenHeight - PlayerHeight)));
const rockSpawnCooldown: number =
  (RockWidth + minRockSpacing * RockSpawnDifficulty) / Speed;
const logSpawnCooldown = (LogWidth * LogSpawnDifficulty) / Speed;

export enum Stage {
  STARTING,
  PLAYING,
  LOST,
}

var currentStage = Stage.STARTING;
var isRockSpawnCooldown = false;
var isLogSpawnCooldown = false;

function shouldSpawnLog(): boolean {
  if (isLogSpawnCooldown) {
    return false;
  }
  var seed = Math.random();
  return seed < logSpawnChance;
}

function shouldSpawnRock(): boolean {
  if (isRockSpawnCooldown) {
    return false;
  }

  var seed = Math.random();
  if (seed > rockSpawnChance) {
    return false;
  }

  return true;
}

function spawnRock(): Sprite {
  return generateRock(spawnPoint);
}

function spawnLog(): Sprite {
  var at = spawnPoint.plus(
    new Vector(0, Math.random() * (ScreenHeight - LogHeight))
  );
  return new Log(at);
}

function spawnSprites(): Sprite[] {
  const willSpawnLog = shouldSpawnLog();
  const willSpawnRock = shouldSpawnRock();
  if (!willSpawnRock && !willSpawnLog) {
    return [];
  }

  if (willSpawnLog && !willSpawnRock) {
    isRockSpawnCooldown = true;
    isLogSpawnCooldown = true;
    setTimeout(() => {
      isRockSpawnCooldown = false;
      isLogSpawnCooldown = false;
    }, logSpawnCooldown * 1000);

    return [spawnLog()];
  }

  if (willSpawnRock && !willSpawnLog) {
    isRockSpawnCooldown = true;
    isLogSpawnCooldown = true;
    // TODO: handle cooldowns separately, but that is a little bit more involved (to ensure we don't
    // cancel the timeout with the log spawn
    setTimeout(() => {
      isRockSpawnCooldown = false;
      isLogSpawnCooldown = false;
    }, rockSpawnCooldown * 1000);
    return [spawnRock()];
  }

  const log = spawnLog();
  const rock = spawnRock();
  if (collide(log, rock)) {
    return [];
  }

  return [log, rock];
}

/**
 * The current game state
 */
export class State {
  readonly player: Player;
  readonly stage: Stage;
  readonly score: number;
  readonly sprites: Sprite[];
  constructor(stage: Stage, player: Player, sprites: Sprite[], score: number) {
    this.stage = stage;
    this.player = player;
    this.sprites = sprites;
    this.score = score;
  }

  static init(): State {
    currentStage = Stage.STARTING;
    setTimeout(
      () => (currentStage = Stage.PLAYING),
      StartingStageDuration * 1000
    );
    const player = new Player(new Vector(0, 0), boundaries.constrain);
    return new State(currentStage, player, [], 0);
  }

  update(step: number, keys: PressedKeys): State {
    var player = this.player;
    var sprites = this.sprites;

    player.update(step, keys);
    sprites.forEach(sprite => sprite.update(step, keys));
    sprites.push(...spawnSprites());

    return this.check(player, sprites, this.score);
  }

  check(player: Player, sprites: Sprite[], previousScore: number): State {
    var inScope: Sprite[] = [];
    var newScore: number = previousScore;
    for (var i = 0; i < sprites.length; i++) {
      const sprite: Sprite = sprites[i];
      if (boundaries.isOutOfBounds(sprite)) {
        if (sprite instanceof Rock) {
          newScore += PointsPerRock;
        }
        continue;
      }

      if (collide(player, sprite)) {
        if (sprite instanceof Rock) {
          return new State(Stage.LOST, player, sprites, previousScore);
        }

        if (sprite instanceof Log) {
          newScore += PointsPerLog;
          continue;
        }
      }
      inScope.push(sprite);
    }

    return new State(currentStage, player, inScope, newScore);
  }
}
