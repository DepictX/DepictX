import { IElementChildren } from './element';

export const INTERNAL = Symbol('DEPICT_LAYOUT_TYPE');
export type InternalLayout<T = any> = ((props: T) => IElementChildren) & {
  [INTERNAL]: string | symbol;
};
