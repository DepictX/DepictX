import { ViewModule } from "engine";
import { drawFiber } from "./drawer";
import { Node } from "engine/src/node";

export class View implements ViewModule {
  type: 'View' = 'View'

  install(): void {

  }

  uninstall(): void {

  }

  draw(canvas: HTMLCanvasElement, node: Node) {
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      drawFiber(ctx, node);
    }
  }
}