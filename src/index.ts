declare var module: NodeHotModule;
import greeting from "./message";

const NAMES = "Webpack & TypeScript";

const d = document;

export function init(selector: string) {
  const el = d.querySelector(selector);

  if (el) {
    greeting(el, NAMES);
  }

  if (module.hot) {
    module.hot.accept("./message", () => {
      if (el) {
        greeting(el, NAMES);
      }
    });
  }
}
