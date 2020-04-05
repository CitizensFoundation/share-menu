export const wrapText = (
  context: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  maxWidth: number,
  lineHeight: number,
) => {
  const blocks = text.split('\n');
  for (const block of blocks) {
    const words = block.split(' ');
    let line = '';
    for (let n = 0; n < words.length; n++) {
      const testLine = line + words[n] + ' ';
      const metrics = context.measureText(testLine);
      const testWidth = metrics.width;
      if (testWidth > maxWidth && n > 0) {
        context.fillText(line, x, y);
        line = words[n] + ' ';
        y += lineHeight;
      } else {
        line = testLine;
      }
    }
    context.fillText(line, x, y);
    y += lineHeight;
  }
};

export const fitFontSize = (
  context: CanvasRenderingContext2D,
  text: string,
  fontFamily: string,
  maxWidth: number,
  startSize: number,
  minSize: number,
) => {
  let fontSize = startSize;
  context.font = `${fontSize}px "${fontFamily}"`;
  while (fontSize > minSize && context.measureText(text).width > maxWidth) {
    fontSize--;
    context.font = `${fontSize}px "${fontFamily}"`;
  }
  return fontSize;
};
