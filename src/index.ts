const canvas = document.getElementById("my-canvas") as HTMLCanvasElement;
const ctx = canvas.getContext("2d");

if (ctx == null) {
  throw new Error("Canvas를 불러올 수 없습니다.");
}

ctx.fillStyle = "blue";
ctx.fillRect(50, 50, 150, 100);
