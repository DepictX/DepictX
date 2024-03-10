import {
  IDefaultProps,
  LAYOUT_TYPE,
  InternalLayout,
  BLOCK,
  MEASUREMENTS,
  INode,
  INLINE,
} from 'engine';
import { DEFAULT_METRICS } from '../../consts';

export const VIEW_SYMBOL = Symbol('View');

interface IViewProps extends IDefaultProps {}

export const View: InternalLayout<IViewProps> = (props: IViewProps) => {
  return props.children;
};

View[LAYOUT_TYPE] = BLOCK;
View[MEASUREMENTS] = {
  prepare(node: INode<IViewProps>, ctx) {
    if (!node.metrics) node.metrics = { ...DEFAULT_METRICS };

    const minWidth = node.style?.minWidth;
    const maxWidth = node.style?.maxWidth;
    const minHeight = node.style?.minHeight;
    const maxHeight = node.style?.maxHeight;

    if (!node.firstChild) return { minWidth, maxWidth, minHeight, maxHeight };

    const children = node.children;
    console.assert(
      new Set(children.map((c) => c.type[LAYOUT_TYPE])).size <= 1,
      'Can not mix BLOCK and INLINE nodes!'
    );

    return {
      minWidth,
      maxWidth,
      minHeight,
      maxHeight,
      fitContent: children.reduce(
        (s, c) => s + (ctx.getNodeConstrains(c).fitContent || 0),
        0
      )
    };
  },
  measure(node, ctx) {
    node.metrics!.width = node.parent
      ? node.parent.metrics!.width
      : ctx.containerConstrains.width;
    node.metrics!.left = 0;
  },
  postMeasure(node, ctx) {
    node.metrics!.height = node.firstChild
      ? node.firstChild.type[LAYOUT_TYPE] === BLOCK
        ? node.children.reduce((s, c) => s + c.metrics!.height, 0)
        : Math.max(...node.children.map((c) => c.metrics!.height))
      : 0;
    node.metrics!.top = node.prevSibling
      ? node.prevSibling.metrics!.top + node.prevSibling.metrics!.height
      : 0;
  },
};