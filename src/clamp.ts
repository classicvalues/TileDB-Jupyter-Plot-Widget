const clamp = (low: number, high: number, val: number): number =>
  Math.max(low, Math.min(val, high));

export default clamp;
