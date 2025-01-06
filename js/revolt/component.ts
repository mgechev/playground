import { effect, computed } from './signal.js';

export type Binding = string | (() => string);
export type Action = () => void;

export interface DOMElement {
  name: string;
  attributes?: Record<string, Binding>;
  children?: DOMNode[];
  events?: Record<string, Action>;
}

export type DOMNode = Binding | DOMElement;

export type View = DOMNode | DOMNode[];

export type Component = (() => View) & { dirty?: boolean };

export const render = (view: View, root: Element) => {
  if (view instanceof Array) {
    for (const child of view) {
      render(child, root);
    }
    return;
  }
  if (typeof view === 'string') {
    root.append(document.createTextNode(view));
    return;
  }
  if (typeof view === 'function') {
    const node = document.createTextNode(view());
    effect(() => {
      const text = view();
      node.textContent = text;
    })
    root.append(node);
    return;
  }
  const element = document.createElement(view.name);
  for (const attribute in view.attributes) {
    const binding = view.attributes[attribute];
    if (isDynamicBinding(binding)) {
      effect(() => {
        element.setAttribute(attribute, binding());
      });
      continue;
    }
    element.setAttribute(attribute, binding);
  }
  for (const event in view.events) {
    element.addEventListener(event, view.events[event]);
  }
  root.append(element);
  if (view.children) {
    render(view.children, element);
  }
};

export const isElement = (node: any) => {
  return node.name !== undefined;
};

export const isDynamicBinding = (binding: Binding) => {
  return typeof binding === 'function';
};