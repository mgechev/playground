import { effect, computed } from './signal.js';

export let render = (root, element) => {
  render = () => {
    element.innerHTML = renderComponent(root);
  };
  render();
};

export const component = fn => {
  effect(() => {
    fn.dirty = true;
    schedule();
  });
  return fn();
};


let pending = false;
const schedule = () => {
  if (pending) {
    return;
  }
  requestAnimationFrame(() => {
    pending = false;
    render();
  });
  pending = true;
};

const renderComponent = node => {
  if (typeof node === 'function') {
    return node();
  }
  return node.map(renderComponent).join('');
};

