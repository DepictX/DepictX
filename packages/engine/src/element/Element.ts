import { BaseComponent } from '../layouts/Base';

export interface IElementProps {
  children?: Element[];
  [key: string]: any
}

export class Element {
  static create(type: typeof BaseComponent, key?: string, ref?: any, props?: IElementProps) {
    return new Element(type, key, ref, props);
  }

  constructor(public type: typeof BaseComponent, public key?: string, public ref?: any, public props?: IElementProps) {}
}
