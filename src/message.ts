const COLOR = "green";

export default function greeting(el: Element, name: string) {
  el.innerHTML = `<h1 style="color: ${COLOR};">Hello ${name}!</h1>`;
}
