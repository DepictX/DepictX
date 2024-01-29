# 架构理念
1. 数据模型跨平台
2. 易于使用
3. 低耦合，易于扩展，能够自行实现如多边形等

# Core
流程示意：
1. DSL -> Element
2. Element -> Node
3. Measure Node
4. Bind Event
5. Paint

## 更新流程
1. setState
2. mark node dirty and analysis all effect nodes，add to dirty list,
3. In micro task, iterate dirty list:
   1. if dirty signal is children, call setter & rebuild tree & remeasure & repaint
   2. if dirty signal is style
      1. if style effect layout, remeasure & repaint
      2. if style just effect paint, repaint

# Engine
定义 DSL 规范，并将 DSL 生成带有排版信息的 Node

# Renderer
将 Node 绘制到 Canvas 画布上

# Layout
提供 DSL 组件并提供排版能力
## 布局 DSL
### Flex
### Grid
### Absolute
### Fixed
### ScrollView

## Box DSL
### View
### Text
### Line
### Polygon
### Circle
### Embed

# Event
交互事件相关实现

# Demo
## Layout 使用方式

``` tsx
import { render, useSignal } from '@DepictX/engine';
import { Flex, View, Absolute, ScrollView } from '@DepictX/layout';
import { useSelectionChange, setSelection } from '@DepictX/selection';

function CustomComponent() {
  const [color, setColor] = useSignal('red');
  const selection = useSelection();
  const [top, setTop] = useSignal(0);

  useSelectionChange(() => {

  });

  useScroll(( event: { target: Node, scrollTop: number }) => {
    setTop(scrollTop - xxxx);
  });

  return (
    <Flex direction="column" ref={node}>
      <View
        id="table"
        ref={Node}
        style={{ border: '1px', backgroundColor: color() }}
        onLayout={(metrics) => {
          if (metrics.width > 100) setColor('blue');
        }}
        onClick={() => {}}
      >
        <Absolute top={}>
          <ScrollView></ScrollView>
        </Absolute>
      </View>
    </Flex>
  )
}

render(<CustomComponent />, canvas);
```
