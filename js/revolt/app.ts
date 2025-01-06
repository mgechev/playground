import { signal, render } from "./revolt.js";

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
      {
        name: "div",
        attributes: {
          id: "app",
          style: () =>
            `background: ${bgColor()}; width: 70px; height: 50px; color: white; text-align: center; line-height: 50px;`,
        },
        children: [() => `Timer: ${state()}`],
      },
    ],
    events: {
      click: () => {
        state.set(0);
      },
    },
  };
};

render(App(), document.body);
