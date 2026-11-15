import { toScreen } from "./coord";
import { apply, identity, type Mat2 } from "./math";

const N = 20;
const HEAD_LEN = 12; // 머리 길이(px)
const SPREAD = Math.PI / 7; // 약 25°
const STYLE = {
  baseGrid: { color: "rgba(255,255,255,0.08)", width: 1 },
  baseAxes: { color: "rgba(255,255,255,0.4)", width: 1.5 },
  gridT: { color: "rgba(80,160,255,0.5)", width: 1 },
  axesT: { color: "rgba(80,160,255,1)", width: 2 },
  iHat: { color: "#4ade80" },
  jHat: { color: "#f87171" },
};

export function render(ctx: CanvasRenderingContext2D, matrix: Mat2) {
  ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
  drawGrid(ctx, identity(), STYLE.baseGrid.color, STYLE.baseGrid.width); // 원래 격자 (흐리게)
  drawAxes(ctx, identity(), STYLE.baseAxes.color, STYLE.baseAxes.width);
  drawGrid(ctx, matrix, STYLE.gridT.color, STYLE.gridT.width); // 변환된 격자
  drawAxes(ctx, matrix, STYLE.axesT.color, STYLE.axesT.width);
  drawArrow(ctx, apply(matrix, [1, 0]), STYLE.iHat.color);
  drawArrow(ctx, apply(matrix, [0, 1]), STYLE.jHat.color);
}

function addLine(
  ctx: CanvasRenderingContext2D,
  matrix: Mat2,
  from: [number, number],
  to: [number, number],
) {
  const [x1, y1] = toScreen(...apply(matrix, from));
  const [x2, y2] = toScreen(...apply(matrix, to));

  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
}

export function drawAxes(
  ctx: CanvasRenderingContext2D,
  matrix: Mat2,
  color: string,
  lineWidth = 2,
) {
  ctx.strokeStyle = color;
  ctx.lineWidth = lineWidth;

  ctx.beginPath();
  addLine(ctx, matrix, [-N, 0], [N, 0]);
  addLine(ctx, matrix, [0, -N], [0, N]);
  ctx.stroke();
}

export function drawGrid(
  ctx: CanvasRenderingContext2D,
  matrix: Mat2,
  color: string,
  lineWidth = 1,
) {
  ctx.strokeStyle = color;
  ctx.lineWidth = lineWidth;

  ctx.beginPath();
  for (let k = -N; k <= N; k++) {
    addLine(ctx, matrix, [-N, k], [N, k]);
    addLine(ctx, matrix, [k, -N], [k, N]);
  }
  ctx.stroke();
}

export function drawArrow(
  ctx: CanvasRenderingContext2D,
  to: [number, number],
  color: string,
  width = 3,
) {
  ctx.strokeStyle = color;
  ctx.lineWidth = width;

  const [x0, y0] = toScreen(0, 0);
  const [x1, y1] = toScreen(...to);

  if (Math.hypot(x1 - x0, y1 - y0) < 1) {
    return;
  }

  const angle = Math.atan2(y1 - y0, x1 - x0);

  const lx = x1 - HEAD_LEN * Math.cos(angle - SPREAD);
  const ly = y1 - HEAD_LEN * Math.sin(angle - SPREAD);
  const rx = x1 - HEAD_LEN * Math.cos(angle + SPREAD);
  const ry = y1 - HEAD_LEN * Math.sin(angle + SPREAD);

  // 몸통
  ctx.beginPath();
  ctx.moveTo(x0, y0);
  ctx.lineTo(x1, y1);
  ctx.stroke();

  // 머리 (채운 삼각형)
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(lx, ly);
  ctx.lineTo(rx, ry);
  ctx.closePath();
  ctx.fill();
}
