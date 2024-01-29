import type { Fiber } from "../../fiber";
import type { LayoutPlugin } from "../Base";

export class Flex implements LayoutPlugin {
  static type = 'flex';

  static layout(fiber: Fiber): void {
    flexLayout(fiber);
  }
}

function flexLayout(fiber: Fiber) {
  const flexDirection = fiber.props.flexDirection || 'row';
  const alignItems = fiber.props.alignItems || 'stretch';
  const justifyContent = fiber.props.justifyContent || 'flex-start';

  if (flexDirection === 'row' || flexDirection === 'row-reverse') {
    flexDirectionRow(fiber, flexDirection, alignItems, justifyContent);
  }
  // else {
  //   return flexDirectionColumn(virtualDom, flexDirection, alignItems, justifyContent);
  // }
}


function flexDirectionRow(
  fiber: Fiber,
  flexDirection: string,
  alignItems: string,
  justifyContent: string
) {
  let totalFlex = 0;
  const children: Fiber[] = [];

  for (let child = fiber.child; child; child = child.sibling) {
    children.push(child);
  }

  children.forEach((child) => {
    totalFlex += child.props.flex || 1;
  });

  if (!fiber.metrics) {
    fiber.metrics = {
      width: fiber.return?.metrics?.width || 100,
      height: fiber.props.style?.height || 0,
      left: 0,
      top: 0,
    };
  }

  let currentLeft = 0;
  let maxHeight = 0;
  children.forEach((child) => {
    const flex = child.props.flex || 1;
    const childWidth = (flex / totalFlex) * fiber.metrics!.width;

    child.metrics = {
      width: childWidth,
      height: 0,
      left: currentLeft,
      top: 0,
    };
    // child.props.style.left = currentLeft;

    const childHeight = child.props.style?.height || 0;
    maxHeight = Math.max(maxHeight, childHeight);

    if (alignItems === 'center') {
      child.metrics.top = (maxHeight - childHeight) / 2;
    } else if (alignItems === 'flex-end') {
      child.metrics.top = maxHeight - childHeight;
    } else {
      // 默认为 'stretch' 或 'flex-start'
      child.metrics.top = 0;
    }

    currentLeft += childWidth;
  });

  let containerHeight = maxHeight;
  if (alignItems === 'stretch') {
    containerHeight = fiber.metrics.height || maxHeight;
    children.forEach((child) => {
      child.metrics!.height = containerHeight;
    });
  }
}