/**
 * Filters out near-white background pixels of a canvas image data to make it transparent.
 */
export function filterImageWhiteBackground(canvas: HTMLCanvasElement, img: HTMLImageElement): string {
  const ctx = canvas.getContext("2d");
  if (!ctx) return img.src;

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(img, 0, 0);
  
  const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const data = imgData.data;
  
  for (let i = 0; i < data.length; i += 4) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    
    // Filter out near-white background pixels
    if (r > 200 && g > 200 && b > 200) {
      data[i + 3] = 0; // Alpha transparent
    }
  }
  
  ctx.putImageData(imgData, 0, 0);
  return canvas.toDataURL();
}
