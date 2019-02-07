type Color = "red" | "green" | "black";

export interface MessageContainer {
  el: Element;
  text: string;
  color: Color;
}

export default function message({
  el,
  text,
  color = "black"
}: MessageContainer) {
  el.innerHTML = `<h1 style="color: ${color};">${text}</h1>`;
}
