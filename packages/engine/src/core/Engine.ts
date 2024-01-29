import { buildFiberTree } from '../fiber';
import type { Element } from '../element';
import type { Module } from '../interface/module';

export class Engine {
  private modules: Record<string, Module> = {};

  use(module: Module) {
    this.modules[module.type] = module;
  }

  render(root: Element, container: HTMLElement) {
    this.install();

    // 生成 fiber 节点
    // 后期通过 reconciler 断点更新 fiber
    const fiber = buildFiberTree(root);

    (window as any).fiber = fiber;
    const constrain = {
      height: container.clientHeight,
      width: container.clientWidth,
    };

    // 通过 reconciler 优先 measure 视口节点，生成 RenderObject
    // @ts-expect-error
    this.modules.Layout.measure(fiber, constrain);

    // 对视口内的 RenderObject 进行绘制
    // @ts-expect-error
    this.modules.View.draw(container, fiber);

    window.addEventListener('__UPDATE_VIEW__', () => {
      // @ts-expect-error
      this.modules.View.draw(container, fiber);
    });
  }

  destroy() {}

  private install() {
    // check modules

    for (const module of Object.values(this.modules)) {
      module.install();
    }
  }
}
