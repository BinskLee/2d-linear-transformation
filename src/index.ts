import "./style.css";
import { render } from "./render";
import { identity } from "./math";
import type { Mat2 } from "./math";

const canvas = document.getElementById("my-canvas") as HTMLCanvasElement;
const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

if (ctx == null) {
  throw new Error("Canvas를 불러올 수 없습니다.");
}

const inputs = document.querySelectorAll<HTMLInputElement>("#matrix-panel input");
const panel = document.querySelector<HTMLDivElement>("#matrix-panel");

let matrix = identity();
function setMatrix(m: Mat2) {
  matrix = m;
  render(ctx, matrix);
  syncInputs(matrix);
}

function syncInputs(m: Mat2) {
  for (const input of inputs) {
    if (input === document.activeElement) {
      continue;
    }
    const key = input.dataset.key as keyof Mat2;
    input.value = m[key].toFixed(2);
  }
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

  render(ctx, matrix);
}

panel?.addEventListener("input", (event) => {
  const input = event.target as HTMLInputElement;
  const key = input.dataset.key as keyof Mat2;
  const v = parseFloat(input.value);

  const isInvalid = Number.isNaN(v);
  input.classList.toggle("invalid", isInvalid);
  if (isInvalid) {
    return;
  }

  setMatrix({ ...matrix, [key]: v });
});

panel?.addEventListener("focusout", (event) => {
  const input = event.target as HTMLInputElement;
  const key = input.dataset.key as keyof Mat2;

  input.classList.remove("invalid");
  input.value = matrix[key].toFixed(2);
});

window.addEventListener("resize", resizeCanvas);
resizeCanvas();
setMatrix(identity());
