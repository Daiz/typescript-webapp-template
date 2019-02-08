declare var module: NodeHotModule;

import message, { MessageContainer } from "./message";
import GreeterWorker from "./workers/greeter.worker";

const d = document;

export function init(selector: string) {
  const el = d.querySelector(selector)!;

  const messages: MessageContainer[] = [
    {
      el: d.createElement("div"),
      text: "TypeScript",
      color: "black"
    },
    {
      el: d.createElement("div"),
      text: "JavaScript",
      color: "black"
    }
  ];

  const greeters: typeof GreeterWorker[] = [];
  const greetTypes = ["greet", "insult"];
  messages.forEach((msg, i) => {
    el.appendChild(msg.el);
    const greeter = new GreeterWorker();
    greeters.push(greeter);
    // @ts-ignore
    greeter.postMessage({ type: greetTypes[i], name: msg.text });
    greeter.onmessage = ({ data }) => {
      console.log(`Message from Worker ${i}: ${JSON.stringify(data)}`);
      switch (data.type) {
        case "greet":
          msg.text = data.greeting;
          msg.color = "green";
          message(msg);
          break;
        case "insult":
          msg.text = data.insult;
          msg.color = "red";
          message(msg);
          break;
      }
    };
  });

  if (module.hot) {
    module.hot.accept("./message", () => {
      if (el) {
        messages.forEach(msg => message(msg));
      }
    });
  }
}
