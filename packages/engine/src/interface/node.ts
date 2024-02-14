import { IMetrics } from "./renderObject";
import { IStyle } from "./style";

export interface INode {
  metrics: IMetrics | null;
  props: any;
  style: IStyle | null;
  scrollTop?: number;
  scrollLeft?: number;
  parent: INode | null;
  firstChild: INode | null;
  lastChild: INode | null;
  prevSibling: INode | null;
  nextSibling: INode | null;
  children: INode[];
}