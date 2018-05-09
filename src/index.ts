import { normalize, setupPage } from "csstips";
import greeting from "./message";

const ROOT = "#root";
const NAMES = "Webpack & TypeScript";

normalize();
setupPage(ROOT);

const d = document;
const el = d.querySelector(ROOT)!;
greeting(el, NAMES);

declare var module: NodeHotModule;
if (module.hot) {
  module.hot.accept("./message", () => {
    greeting(el, NAMES);
  });
}
