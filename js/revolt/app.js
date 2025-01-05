import { signal, component, render } from './revolt.js';

const Checkbox = component(() => {
  const checked = signal(false);
  const toggle = () => checked.set(!checked());
  return () => {
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = checked();
    checkbox.onclick = toggle;
    return checkbox;
  };
});

const App = component(() => {
  const state = signal(0);
  setInterval(() => {
    state.set(state() + 1);
  }, 1000);
  return [
    Checkbox,
    () => document.createTextNode(`Timer: ${state()}`)
  ];
});

render(App, document.body);

