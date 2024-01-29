import type { Fiber } from '../fiber/Fiber';
import type { BaseComponent } from '../layouts/Base';
import type { IElementProps } from './Element';
import { Element } from './Element';

const instances = new Map<string, BaseComponent>();
const RESERVED_PROPS = new Set(['key', 'ref']);

interface ICreateElementConfig {
  key?: string;
  ref?: any;
  [props: string]: any;
}

export function createElement(
  type: typeof BaseComponent,
  config: ICreateElementConfig | null,
  ...children: Element[]
) {
  const props: IElementProps = { children };
  config && Object.keys(config).forEach(key => !RESERVED_PROPS.has(key) && (props[key] = config[key]));
  return Element.create(type, config?.key, config?.ref, props);
}

// export function instantiate(element: Element) {
//   if (!element.key) element.key = Math.random().toString();
//   instances.set(element.key, new element.type());
// }

export function updateChildren(root: Element) {

}

// layout and compute style
export function measure(fiber: Fiber) {

}

export function layout() {}

export {Element};