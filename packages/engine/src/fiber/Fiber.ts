import type { Element } from "../element";
import { createEffect } from "../hooks";

export interface Metrics {
  width: number;
  height: number;
  top: number;
  left: number;
}

// OR Fiber
export interface Fiber {
  key?: string;

  type: Function | string;

  return: Fiber | null;
  child: Fiber | null;
  sibling: Fiber | null;
  index: number;

  props: any;

  renderObject?: any;

  metrics?: Metrics;
  style?: any;

  alternate?: Fiber;
}

export function createFiber(element: Element | string): Fiber {
  if (element instanceof Function) {
    createEffect(() => {
      (element as unknown as (() => string))();
      window.dispatchEvent(new CustomEvent('__UPDATE_VIEW__'));
    });
  }
  const isString = typeof element === 'string' || typeof element === 'function';
  return {
    type: isString ? 'Symbol[string]' : element.type,
    props: isString ? { nodeValue: element } : element.props,
    return: null,
    child: null,
    sibling: null,
    index: 0
  };
}

export function buildFiberTree(root: Element) {
  return elementToFiber(root);
}

function reconcileChildren(parentFiber: Fiber, elements: Element[]): Fiber | null {
  let prevSibling: Fiber | undefined;

  elements.flat().forEach((element, index) => {
    const newFiber = elementToFiber(element); // 用elementToFiber代替createFiber
    newFiber.index = index;
    newFiber.return = parentFiber;

    if (index === 0) {
      parentFiber.child = newFiber;
    } else if (prevSibling) {
      prevSibling.sibling = newFiber;
    }

    prevSibling = newFiber;
  });

  return parentFiber.child;
}

function elementToFiber(element: Element): Fiber {
  const fiber = createFiber(element);

  let children: Element[];
  if (typeof element.type === 'function') {
    const componentElement = element.type(element.props);
    children = Array.isArray(componentElement) ? componentElement : [componentElement];
  } else {
    children = element.props?.children || [];
  }

  if (children) {
    reconcileChildren(fiber, children);
  }
  return fiber;
}