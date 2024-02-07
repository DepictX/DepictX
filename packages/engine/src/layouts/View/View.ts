import { IDefaultProps, INTERNAL, InternalLayout } from "../../interface";

export const VIEW_SYMBOL = Symbol('View');

interface IViewProps extends IDefaultProps {
}

export const View: InternalLayout<IViewProps> = (props: IViewProps) => {
  return props.children;
}

View[INTERNAL] = VIEW_SYMBOL;