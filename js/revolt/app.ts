import { signal, render } from "./lib";
import { View } from "./lib/view";

const Checkbox = (checked: () => string | false) => {
  return {
    name: "input",
    attributes: {
      type: "checkbox",
      checked: checked,
    },
  };
};

const TodoApp = (): View => {
  const todos = signal(["Buy milk", "Create a framework"]);
  let inputElement: HTMLInputElement | undefined;

  const addTodo = () => {
    if (!inputElement) {
      return;
    }
    todos.set([...todos(), inputElement.value]);
    inputElement.value = '';
  };

  return [
    {
      name: 'h1',
      children: 'Todo App'
    },
    {
      name: 'input',
      attributes: {
        type: 'text'
      },
      ref(input: Element) {
        inputElement = input as HTMLInputElement;
      },
      events: {
        keydown(e: Event) {
          const event = e as KeyboardEvent;
          if (event.code === 'Enter') {
            addTodo()
          }
        }
      }
    },
    {
      name: 'button',
      children: 'Add todo',
      events: {
        click: addTodo
      }
    },
    {
      name: "ul",
      children: {
        collection: todos,
        items(item: string) {
          return {
            name: "li",
            children: item,
            events: {
              click() {
                todos.set(todos().filter(t => t !== item));
              },
            },
          };
        },
      },
    },
  ];
};

const App = () => {
  const state = signal(0);
  const bgColor = signal("red");

  setInterval(() => {
    state.set(state() + 1);
    bgColor.set(state() % 2 === 0 ? "red" : "blue");
  }, 1000);

  return {
    name: "section",
    children: [
      TodoApp(),
      {
        name: "div",
        attributes: {
          id: "app",
          style: () =>
            `background: ${bgColor()}; width: 70px; height: 50px; color: white; text-align: center; line-height: 50px;`,
        },
        children: [() => `Timer: ${state()}`],
      },
      Checkbox(() => (state() % 2 === 0 ? "checked" : false)),
      {
        condition: () => state() % 2 === 0,
        then: "Even",
        else: "Odd",
      },
    ],
    events: {
      click() {
        state.set(0);
      },
    },
  };
};

// render(App(), document.body);
render(TodoApp(), document.body);
