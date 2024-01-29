import { Element, buildFiberTree } from 'engine';

console.log('start');

export function render(element: Element) {
  console.log(element);

  if (typeof element.type === 'string') {

  } else {
    // @ts-ignore
    console.log(buildFiberTree(element));
  }
}

export * from './View';
export default {};