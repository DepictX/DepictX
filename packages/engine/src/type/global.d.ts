import { createElement as myCreateElement } from './RenderObject';
import { DefaultProps } from '../interface'

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "flex": DefaultProps;
    }

    const createElement = myCreateElement;
  }
}
