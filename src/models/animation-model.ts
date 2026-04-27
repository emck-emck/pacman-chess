export type AnimationStep = {
  x: number;
  y: number;
  duration: number;   // ms
  instant?: boolean;  // teleport (no animation)
};