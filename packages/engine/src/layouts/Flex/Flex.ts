import { IDefaultProps, IElement, INTERNAL, InternalLayout } from "../../interface";

export const FLEX_SYMBOL = Symbol('Flex');

interface IFlexProps extends IDefaultProps {

}

export const Flex: InternalLayout<IFlexProps> = (props: IFlexProps) => {
  return props.children;
}

Flex[INTERNAL] = FLEX_SYMBOL;