import { signal, component, render } from './revolt.js';

const Checkbox = component(() => {
  const checked = signal(false);
  return () => `<input type="checkbox" ${checked() ? 'checked' : 'unchecked'}>`;
});

const App = component(() => {
  const state = signal(0);
  setInterval(() => {
    state.set(state() + 1);
  }, 1000);
  return [
    Checkbox,
    () => `Timer: ${state()}`
  ];
});

render(App, document.body);

