import { signal, component } from './revolt.js';

const App = component(() => {
  const state = signal(0);
  setInterval(() => {
    state.set(state() + 1);
  }, 1000);
  return () => `Timer: ${state()}`;
});

