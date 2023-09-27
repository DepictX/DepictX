# 架构理念
1. 数据模型跨平台
2. 易于使用
3. 低耦合，易于扩展，能够自行实现如多边形等

# Core
流程示意：
1. DSL -> Element
2. Element -> RenderObject
3. Measure RenderObject
4. Bind Event
5. Paint

# Engine
定义 DSL 规范，并将 DSL 生成带有排版信息的 RenderObject
## 布局 DSL
### Flow
### Flex
### Grid
### Absolute
### Fixed
### Inline

## Box DSL
### View
### Text
### ScrollView

# View
将 RenderObject 绘制到 Canvas 画布上

# State
维护选区等状态

# Event
交互事件相关实现