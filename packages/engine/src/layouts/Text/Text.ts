import { INTERNAL, InternalLayout } from "../../interface";

export const TEXT_SYMBOL = Symbol('Text');

interface ITextProps {
  content?: string;
}

export const Text: InternalLayout<ITextProps> = (props?: ITextProps) => {
  return null;
}

Text[INTERNAL] = TEXT_SYMBOL;