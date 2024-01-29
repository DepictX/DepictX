import type { Fiber } from "../fiber";

/**
 * Module 基本类型定义
 */
export interface Module {
  type: string;

  install: () => void;

  uninstall: () => void;
}

export interface ViewModule extends Module {
  type: 'View'

  draw: (canvas: HTMLCanvasElement, fiber: Fiber) => void
}

export interface LayoutModule extends Module {
  type: 'Layout'
}

// export interface