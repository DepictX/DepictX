import { Node } from "../node";

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

  draw: (canvas: HTMLCanvasElement, node: Node) => void
}

export interface LayoutModule extends Module {
  type: 'Layout'
}

// export interface