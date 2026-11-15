import { render } from "./render";

const canvas = document.getElementById("my-canvas") as HTMLCanvasElement;
const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

if (ctx == null) {
  throw new Error("Canvas를 불러올 수 없습니다.");
}

function resizeCanvas() {
  const dpr = window.devicePixelRatio;
  const w = window.innerWidth;
  const h = window.innerHeight;

  canvas.width = w * dpr;
  canvas.height = h * dpr;
  canvas.style.width = `${w}px`;
  canvas.style.height = `${h}px`;

  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

  render(ctx, { a: 1, b: 1, c: 0, d: 1 });
}

window.addEventListener("resize", resizeCanvas);
resizeCanvas();
