export interface IElementProps {
  children?: Element[];
  [key: string]: any
}

export class Element {
  static create(type: Function | string, key?: string, ref?: any, props?: IElementProps) {
    return new Element(type, key, ref, props);
  }

  constructor(public type: Function | string, public key?: string, public ref?: any, public props?: IElementProps) {}
}
