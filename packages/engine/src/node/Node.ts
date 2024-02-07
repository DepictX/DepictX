import { IMetrics, IStyle, InternalLayout } from '../interface';

export class Node {
  metrics: IMetrics | null = null;

  layoutDirty = true;

  viewDirty = true;

  style: IStyle | null = null;

  props: any;

  scrollTop: number = 0;

  scrollLeft: number = 0;

  parent: Node | null = null;

  firstChild: Node | null = null;

  lastChild: Node | null = null;

  prevSibling: Node | null = null;

  nextSibling: Node | null = null;

  constructor(public type: InternalLayout) {}

  get children() {
    const children: Node[] = [];
    this.walk((child) => {
      children.push(child);
    });
    return children;
  }

  setParent(parent: Node | null) {
    if (this.parent === parent) return;

    this.parent = parent;
    this.markDirty();
  }

  append(child: Node) {
    // if (!this.children) this.children = [];
    // this.children.push(child);
    if (this.lastChild) {
      this.lastChild.nextSibling = child;
      child.prevSibling = this.lastChild;
      this.lastChild = child;
    } else {
      this.firstChild = child;
      this.lastChild = child;
    }

    this.markDirty();

    child.setParent(this);
  }

  index() {
    let index = -1;
    this.parent?.walk((child, i) => {
      if (child !== this) return;
      index = i;
      return true;
    });
    return index;
  }

  remove() {
    if (!this.parent) return;
    if (!this.prevSibling) {
      this.parent.firstChild = this.nextSibling;
    } else {
      this.prevSibling.nextSibling = this.nextSibling;
    }

    if (!this.nextSibling) {
      this.parent.lastChild = this.prevSibling;
    } else {
      this.nextSibling.prevSibling = this.prevSibling;
    }
  }

  walk(fn: (child: Node, index: number) => boolean | void) {
    for (
      let child = this.firstChild, index = 0;
      child;
      child = child.nextSibling, index++
    ) {
      if (fn(child, index)) break;
    }
  }

  markDirty() {
    this.viewDirty = true;
    this.layoutDirty = true;
  }

  updateProps(props: any) {
    if (this.props === props) return;
    this.props = props;
    this.markDirty();
  }

  updateStyle(style: IStyle) {
    if (this.style === style) return;
    this.style = style;
    this.markDirty();
  }
}
