import { effect, computed } from './signal.js';

export let render = (root, element) => {
  render = () => {
    while (element.childNodes.length) {
      element.removeChild(element.firstChild);
    }
    const children = renderComponent(root);
    children.forEach(c => element.appendChild(c));
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
  return node.map(renderComponent).flat();
};

