import { Fiber, ViewModule } from "engine";
import { drawFiber } from "./drawer";

export class View implements ViewModule {
  type: 'View' = 'View'

  install(): void {

  }

  uninstall(): void {

  }

  draw(canvas: HTMLCanvasElement, fiber: Fiber) {
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      drawFiber(ctx, fiber);
    }
  }
}