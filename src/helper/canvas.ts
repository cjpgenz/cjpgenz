/**
 * Draws a cockroach particle onto the canvas with proper translation and rotation.
 */
export function drawCockroach(
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement,
  x: number,
  y: number,
  angle: number,
  size: number
): void {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(angle + Math.PI / 2);
  ctx.drawImage(img, -size / 2, -size / 2, size, size);
  ctx.restore();
}
