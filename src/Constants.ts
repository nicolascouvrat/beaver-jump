export const ScreenHeight: number = 150;
export const ScreenWidth: number = 600;
export const PlayerHeight: number = 52;
export const PlayerWidth: number = 78;
export const RockWidth: number = 64;
// In pixels/s
export const RockSpeed: number = 300;
// The total air time when jumping, in second
export const AirTime: number = 1;
// Physics tells us that, if we want to be at the top when the speed reaches zero and be in the air
// for a total of AirTime, then we have the following:
export const JumpSpeed: number = (4 * (ScreenHeight - PlayerHeight)) / AirTime;
export const Gravity: number =
  Math.pow(JumpSpeed, 2) / (2 * (ScreenHeight - PlayerHeight));
