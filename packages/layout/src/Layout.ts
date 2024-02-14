import { LayoutModule } from "engine";
import { Flex, flexLayout } from "./layouts";
import { Node } from "engine/src/node";

export class Layout implements LayoutModule {
  type: "Layout" = "Layout";

  plugins = [];

  install(): void {

  }

  uninstall(): void {

  }

  measure(root: Node, containerMetrics: any) {
    const stack: Node[] = [root];

    while (stack.length) {
      const node = stack.pop()!;
      const isRoot = node === root;

      for (let child = node.firstChild; child; child = child.nextSibling) {
        stack.push(child);
      }

      if (!node.metrics) {
        if (node.type === Flex) {
          flexLayout(node);
        } else {
          node.metrics = {
            width: isRoot ? containerMetrics.width : node.parent!.metrics!.width,
            height: 20,
            left: 0,
            top: 30 * node.index() + 16,
          };
        }
      }
    }
  }
}