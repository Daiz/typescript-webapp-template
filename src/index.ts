import { normalize, setupPage } from "csstips";
import { rem } from "csx";
import { style } from "typestyle";
import greeting from "./message";

const ROOT = "#root";
const NAMES = "Webpack & TypeScript";

normalize();
setupPage(ROOT);

const fancyText = style({
  margin: rem(1),
  fontSize: rem(2),
  color: "teal"
});

const d = document;
const el = d.querySelector(ROOT)!;
greeting(el, NAMES);

declare var module: NodeHotModule;
if (module.hot) {
  module.hot.accept("./message", () => {
    greeting(el, NAMES);
  });
}
