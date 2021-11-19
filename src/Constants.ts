/*
 * GENERAL
 */
export const ScreenHeight: number = 150;
export const ScreenWidth: number = 600;
export const StartingStageDuration: number = 3;

/*
 * ROCKS
 */
export const RockWidth: number = 64;
// In pixels/s
export const Speed: number = 300;
export const SmallRockHeight: number = 32;
export const BigRockHeight: number = 48;

/*
 * LOGS
 */
export const LogHeight = 32;
export const LogWidth = 32;

/**
 * GAME
 */

// The higher, the more we fly (easier)
export const AirTimeDifficulty = 1.2;
// The higher, the less rocks we spawn (easier)
export const RockSpawnDifficulty = 2;
// The higer, the less logs we spawn (harder)
export const LogSpawnDifficulty = 1;

export const PointsPerRock = 50;
export const PointsPerLog = 100;

/*
 * PLAYER
 */
export const PlayerHeight: number = 52;
export const PlayerWidth: number = 78;
// The minimum air time to go over a block, assuming you're doing it pixel perfect!
const minAirTime: number =
  (RockWidth + PlayerWidth) /
  (Speed * Math.sqrt(1 - BigRockHeight / (ScreenHeight - PlayerHeight)));
// The total air time when jumping, in seconds
// TODO: make higher difficulty harder, not easier!
export const AirTime: number = minAirTime * AirTimeDifficulty;
// Physics tells us that, if we want to be at the top when the speed reaches zero and be in the air
// for a total of AirTime, then we have the following:
export const JumpSpeed: number = (4 * (ScreenHeight - PlayerHeight)) / AirTime;
export const Gravity: number =
  Math.pow(JumpSpeed, 2) / (2 * (ScreenHeight - PlayerHeight));

/**
 * Images
 */
export const SmallRockImg = 'SmallRock.png';
export const HigherRockImg = 'HigherRock.png';
export const PlayerImg = 'BeaverWalkComplete.png';
export const BackgroundImg = 'Background.png';
export const LogImg = 'Log.png';
// in FPS
export const PlayerAnimationSpeed = 10;
export const AllImages = [
  BackgroundImg,
  PlayerImg,
  SmallRockImg,
  HigherRockImg,
  LogImg,
];
