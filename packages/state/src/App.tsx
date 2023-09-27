import { BaseComponent } from 'engine';
import { render } from '@view';

class TestClassComponent extends BaseComponent {
  render() {
    return (<BaseComponent><BaseComponent>TestClassComponent</BaseComponent></BaseComponent>)
  }
}

export function App() {
  const [color, setColor] = useState();
  const __DEBUG__ = !!Math.round(Math.random());
  console.log('>>>>>>>1111111', BaseComponent)
  return (
    <BaseComponent style={color}>{__DEBUG__ ? (<TestClassComponent />) : null}</BaseComponent>
  );
}

render(App);

function viewRender2(fn) {
  fn();

  // get layouted fibers
  // render by fibers(type flag)

}