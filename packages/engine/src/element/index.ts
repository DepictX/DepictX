import { BaseComponent } from '../layouts/Base';
import { Element, IElementProps } from './Element';

const instances = new Map<string, BaseComponent>();
const RESERVED_PROPS = new Set(['key', 'ref']);

interface ICreateElementConfig {
  key?: string;
  ref?: any;
  [props: string]: any;
}

export function createElement(
  type: typeof BaseComponent,
  config: ICreateElementConfig,
  ...children: Element[]
) {
  const props: IElementProps = { children };
  Object.keys(config).forEach(key => !RESERVED_PROPS.has(key) && (props[key] = config[key]));
  return Element.create(type, config.key, config.ref, props);
}

export function instantiate(element: Element) {
  if (!element.key) element.key = Math.random().toString();
  instances.set(element.key, new element.type());
}

export type Metrics = {
  width: number;
  height: number;
  top: number;
  left: number;
};
export type Fiber = {
  key: string;

  type: typeof BaseComponent;

  return: Fiber | null;
  child: Fiber | null;
  sibling: Fiber | null;
  index: number;

  pendingProps: any;

  metrics?: Metrics;
  style?: any;

  alternate: Fiber;
}

export function updateChildren(root: Element) {

}

export function buildFiberTree(root: Element) {
  for (let el = root, parent = null, index = 0; el; ) {
    const fiberNode: Fiber = {
      key: el.key,
      type: el.type,
      return: parent,
      child: null,
      sibling: null,
      index,
      pendingProps: el.props
    };


  }
}

// layout and compute style
export function measure(fiber: Fiber) {

}

export function layout() {}