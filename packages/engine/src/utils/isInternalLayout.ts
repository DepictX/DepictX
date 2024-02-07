import { IElementType, INTERNAL, InternalLayout } from "../interface";

export function isInternalLayout(fn: IElementType): fn is InternalLayout {
  return !!(fn as InternalLayout)[INTERNAL]
}