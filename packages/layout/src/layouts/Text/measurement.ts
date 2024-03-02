import { wordsMetricsOfFonts } from "./storage";
import { getCanvasContext } from "./utils";

export function measureText(text: string, font: string, fontSize: number) {
  const ctx = getCanvasContext();

  const fontStr = `${fontSize}px ${font}`;
  let wordsMetrics = wordsMetricsOfFonts.get(fontStr);

  if (wordsMetrics && wordsMetrics.has(text)) return wordsMetrics.get(text)!;

  if (!wordsMetrics) {
    wordsMetrics = new Map();
    wordsMetricsOfFonts.set(fontStr, wordsMetrics);
  }

  ctx.font = fontStr;

  const textMetrics = ctx.measureText(text);

  wordsMetrics.set(text, textMetrics);
  return textMetrics;
}