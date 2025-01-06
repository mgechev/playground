export type Binding = string | (() => string);
export type EventHandler = (event: Event) => void;

export interface When {
  condition: () => boolean;
  then: View;
  else?: View;
}

export interface For<T> {
  collection: () => T[];
  items: (item: T) => DOMElement;
}

export interface DOMElement {
  name: string;
  attributes?: Record<string, string|(() => false|string)>;
  children?: View;
  events?: Record<string, EventHandler>;
  ref?: (node: Element) => void;
}

export type DOMNode = Binding | DOMElement | When | For<any>;

export type View = DOMNode | DOMNode[] | View[];

export type Component = (() => View) & { dirty?: boolean };

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
