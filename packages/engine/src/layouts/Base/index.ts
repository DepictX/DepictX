import type { Fiber } from "../../fiber";

export abstract class LayoutPlugin {
  static get type() {
    throw new Error("Static property 'type' must be implemented in derived classes");
  }

  static layout(fiber: Fiber) {
    throw new Error('This is an abstract static method, it must be implemented in derived classes.');
  };

  static draw(renderObject: any) {
    throw new Error('This is an abstract static method, it must be implemented in derived classes.');
  }
}
