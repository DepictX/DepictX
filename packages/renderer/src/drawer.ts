import { Fiber } from "engine";

export function drawFiber(ctx: CanvasRenderingContext2D, fiber: Fiber) {
  const { metrics } = fiber;

  if (!metrics) throw new Error('Fiber is not measured!');

  if (fiber.type === 'Symbol[string]') {
    const text = typeof fiber.props.nodeValue === 'function' ? fiber.props.nodeValue() : fiber.props.nodeValue;
    ctx.fillStyle = fiber.props.style?.color || 'black';
    ctx.font = fiber.props.style?.font || '16px Arial';
    ctx.fillText(text, metrics.left, metrics.top);
  } else {
    ctx.fillStyle = fiber.props.style?.backgroundColor || 'white';
    ctx.fillRect(metrics.left, metrics.top, metrics.width, metrics.height);
  }

  const children: Fiber[] = [];

  for (let child = fiber.child; child; child = child.sibling) {
    children.push(child);
  }

  // 绘制子节点
  children.forEach((child) => {
    const { metrics: childMetrics } = child;
    if (!childMetrics) throw new Error('Child is not measured!');
    const childLayoutData = {
      left: metrics.left + (childMetrics.left || 0),
      top: metrics.top + (childMetrics.top || 0),
      width: childMetrics.width || 0,
      height: childMetrics.height || 0,
    };
    drawFiber(ctx, child);
  });
}