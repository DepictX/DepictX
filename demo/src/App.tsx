import { Engine, createEffect, createSignal } from 'engine';
import { View } from 'renderer';
import { Layout } from 'layout';

function TestClassComponent({ text }) {
  const [count, setCount] = createSignal(0);

  const getCountWithStr = () => {
    return "count: " + count();
  }

  createEffect(() => {
    console.log(getCountWithStr());
  });

  setInterval(() => {
    setCount(count() + 1);
  }, 1000);

  (window).setCount = setCount;

  return (<flex><div>{getCountWithStr}</div></flex>)
}

export function App(props) {
  const [show, setShow] = createSignal(true);
  const [color, _setColor] = createSignal('#00f');
  const [text, setText] = createSignal('props text');
  const [list, setList] = createSignal([]);
  const __DEBUG__ = !!1;
  window.setShow = setShow;
  window.setText = setText;
  window.setList = setList;
  return (
    <div>
      <div style={{ color: color() }}>{__DEBUG__ ? (<TestClassComponent text={text} />) : null}</div>
      {() => show() && props.children}
      {() => list().map((_, index) => {
        return <div>{index}</div>;
      })}
    </div>
  );
}


const engine = new Engine();

engine.use(new Layout());
engine.use(new View());

const canvas = document.querySelector('#canvas');

engine.render(<App>abc</App>, canvas);
