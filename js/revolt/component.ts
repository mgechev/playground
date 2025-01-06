import { effect, computed } from './signal.js';

export type Binding = string | (() => string);
export type Action = () => void;

export interface When {
  condition: () => boolean;
  then: View;
  else?: View;
}

export interface For<T> {
  collection: T[];
  result: (item: T) => DOMElement[];
}

export interface DOMElement {
  name: string;
  attributes?: Record<string, string|(() => false|string)>;
  children?: View;
  events?: Record<string, Action>;
}

export type DOMNode = Binding | DOMElement | When;

export type View = DOMNode | DOMNode[] | When;

export type Component = (() => View) & { dirty?: boolean };

export const render = (view: View, root: Element): Node | Node[] => {
  if (isConditional(view)) {
    return renderCondition(view, root);
  }
  if (view instanceof Array) {
    const result: (Node | Node[])[] = [];
    for (const child of view) {
      result.push(render(child, root));
    }
    return result as any;
  }
  if (typeof view === 'string') {
    const node = document.createTextNode(view);
    root.append(node);
    return node;
  }
  if (typeof view === 'function') {
    return renderDynamicText(view, root);
  }
  return renderElement(view, root);
};

const renderDynamicText = (view, root) => {
  const node = document.createTextNode(view());
  effect(() => {
    const text = view();
    node.textContent = text;
  })
  root.append(node);
  return node;
};

const renderCondition = (view: When, root: Element) => {
  const result = view.condition();
    let dom: Node | Node[] | undefined;
    if (result) {
      dom = render(view.then, root);
    } else if (view.else) {
      dom = render(view.else, root);
    }
    effect(() => {
      const result = view.condition();
      if (dom) {
        destroy(dom);
      }
      if (result) {
        dom = render(view.then, root);
      } else if (view.else) {
        dom = render(view.else, root);
      }
    });
    return dom ?? [];
};

const renderElement = (view: DOMElement, root: Element) => {
  const element = document.createElement(view.name);
  for (const attribute in view.attributes) {
    const binding = view.attributes[attribute];
    if (isDynamicBinding(binding)) {
      effect(() => {
        const value = binding();
        if (value === false) {
          element.removeAttribute(attribute);
          return;
        }
        element.setAttribute(attribute, value);
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
  return element;
};

export const isElement = (node: any) => {
  return node.name !== undefined;
};

export const isDynamicBinding = (binding: string|(() => false|string)): binding is (() => false|string) => {
  return typeof binding === 'function';
};

export const isConditional = (node: any): node is When => {
  return node.condition !== undefined;
};

export const isIterator = (node: any): node is For<any> => {
  return node.collection !== undefined;
};

const destroy = (node: Node | Node[]) => {
  if (node instanceof Array) {
    for (const child of node) {
      destroy(child);
    }
  } else {
    node.parentElement?.removeChild(node);
  }
};