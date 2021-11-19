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
export const RockSpeed: number = 300;
export const SmallRockHeight: number = 32;
export const BigRockHeight: number = 48;

/**
 * GAME
 */

export const Difficulty = 1.2;
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
  (RockSpeed * Math.sqrt(1 - BigRockHeight / (ScreenHeight - PlayerHeight)));
// The total air time when jumping, in seconds
// TODO: make higher difficulty harder, not easier!
export const AirTime: number = minAirTime * Difficulty;
// Physics tells us that, if we want to be at the top when the speed reaches zero and be in the air
// for a total of AirTime, then we have the following:
export const JumpSpeed: number = (4 * (ScreenHeight - PlayerHeight)) / AirTime;
export const Gravity: number =
  Math.pow(JumpSpeed, 2) / (2 * (ScreenHeight - PlayerHeight));
