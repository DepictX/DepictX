import { LAYOUT_TYPE, INode, InternalLayout, MEASUREMENTS, INLINE } from "engine";
import { DEFAULT_METRICS } from "../../consts";

export const TEXT_SYMBOL = Symbol('Text');

interface ITextProps {
  content?: string;
}

export const Text: InternalLayout<ITextProps> = (_props) => {
  return null;
}

Text[LAYOUT_TYPE] = INLINE;
Text[MEASUREMENTS] = {
  prepare(node: INode<ITextProps>, ctx) {
    if (!node.metrics) node.metrics = { ...DEFAULT_METRICS };

    return {
      fitContent: (node.props.content?.length || 0) * 16
    }
  },
  measure(node, ctx) {
    const width = (node.props.content?.length || 0) * 16;
    node.metrics!.width = width;
    node.metrics!.height = 30;
    node.metrics!.left = node.prevSibling ? node.prevSibling.metrics!.left + node.prevSibling.metrics!.width : 0;
  },
}