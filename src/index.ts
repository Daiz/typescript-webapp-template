import { normalize, setupPage } from "csstips";
import { rem } from "csx";
import { style } from "typestyle";
import { greeting } from "./message";

normalize();
setupPage("#root");

const fancyText = style({
  margin: rem(1),
  fontSize: rem(2),
  color: "teal"
});

const message = greeting("Webpack & TypeScript");
const d = document;
const el = d.querySelector("h1")!;
el.className = fancyText;
el.textContent = message;

console.log(message);
