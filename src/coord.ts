export const GRID_UNIT = 30;

export function toScreen(x: number, y: number): [number, number] {
  const cx = window.innerWidth / 2;
  const cy = window.innerHeight / 2;

  return [cx + x * GRID_UNIT, cy - y * GRID_UNIT];
}
