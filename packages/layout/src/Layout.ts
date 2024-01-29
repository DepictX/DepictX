import { Fiber, LayoutModule } from "engine";
import { Flex } from "engine/src/layouts/Flex";

export class Layout implements LayoutModule {
  type: "Layout" = "Layout";

  plugins = [];

  install(): void {

  }

  uninstall(): void {

  }

  measure(fiber: Fiber, containerMetrics: any) {
    const stack: Fiber[] = [fiber];

    while (stack.length) {
      const fiberNode = stack.pop()!;
      const isRoot = fiberNode === fiber;

      for (let child = fiberNode.child; child; child = child.sibling) {
        stack.push(child);
      }

      if (!fiberNode.metrics) {
        if (fiberNode.type === Flex.type) {
          Flex.layout(fiberNode);
        } else {
          fiberNode.metrics = {
            width: isRoot ? containerMetrics.width : fiberNode.return!.metrics!.width,
            height: 20,
            left: 0,
            top: 30 * fiberNode.index + 16,
          };
        }
      }
    }
  }
}