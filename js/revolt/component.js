import { effect } from './signal.js';

const render = html => {
  document.body.innerHTML = html;
};

export const component = fn => {
  const renderFn = fn();
  effect(() => {
    const result = renderFn();
    render(result);
  });
};
