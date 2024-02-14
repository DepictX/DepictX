import { Engine, createEffect, createSignal } from 'engine';
import { Flex, View, Text } from 'layout';
import { View as ViewModule } from 'renderer';
import { Layout } from 'layout';

function TestClassComponent({ text }) {
  const [count, setCount] = createSignal(0);

  const getCountWithStr = () => {
    return "count: " + count() + '; text: ' + text();
  }

  // createEffect(() => {
  //   console.log(getCountWithStr());
  // });

  setInterval(() => {
    setCount(count() + 1);
  }, 1000);

  (window).setCount = setCount;

  return (<Flex><View><Text content={getCountWithStr} /></View></Flex>)
}

export function App(props) {
  const [show, setShow] = createSignal(true);
  const [color, setColor] = createSignal('#00f');
  const [text, setText] = createSignal('props text');
  const [list, setList] = createSignal([]);
  const __DEBUG__ = !!1;
  window.setShow = setShow;
  window.setText = setText;
  window.setList = setList;
  window.setColor = setColor;
  return (
    <Flex>
      <View style={{ color: () => color() }}>{__DEBUG__ ? (<TestClassComponent text={text} />) : null}</View>
      {() => show() && props.children}
      {() => list().map((_, index) => {
        return <View><Text content={index} /></View>;
      })}
    </Flex>
  );
}


const engine = new Engine();

engine.use(new Layout());
engine.use(new ViewModule());

const canvas = document.querySelector('#canvas');
window.engine = engine;

engine.render(<App><Text content='abc' /></App>, canvas);