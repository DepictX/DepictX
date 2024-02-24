import { InternalLayout } from "./layout";
import { IMetrics } from "./renderObject";
import { IStyle } from "./style";

export interface INode<T = any> {
  type: InternalLayout;
  metrics: IMetrics | null;
  props: T;
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