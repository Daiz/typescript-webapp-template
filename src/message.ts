import { rem } from "csx";
import { style } from "typestyle";

const fancyText = style({
  margin: rem(1),
  fontSize: rem(2),
  color: "green"
});

export default function greeting(el: Element, name: string) {
  el.innerHTML = `<h1 class="${fancyText}">Hello ${name}!</h1>`;
}
