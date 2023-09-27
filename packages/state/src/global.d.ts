import { createElement as myCreateElement } from './RenderObject';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "div": {};
    }

    const createElement = myCreateElement;
  }
}
