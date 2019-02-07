declare var module: NodeHotModule;

import message, { MessageContainer } from "./message";
import GreeterWorker from "./workers/greeter.worker";

const d = document;

export function init(selector: string) {
  const el = d.querySelector(selector)!;

  const message1: MessageContainer = {
    el: d.createElement("div"),
    text: "",
    color: "black"
  };
  const message2: MessageContainer = {
    el: d.createElement("div"),
    text: "",
    color: "black"
  };

  el.appendChild(message1.el);
  el.appendChild(message2.el);

  const greeter1 = new GreeterWorker();
  const greeter2 = new GreeterWorker();
  greeter1.postMessage({ type: "greet", name: "TypeScript" });
  greeter1.addEventListener("message", ({ data }) => {
    switch (data.type) {
      case "greet":
        message1.text = data.greeting;
        message1.color = "green";
        message(message1);
        break;
      case "insult":
        message1.text = data.insult;
        message1.color = "red";
        message(message1);
        break;
      default:
        console.log(`Message from Worker 1: ${JSON.stringify(data)}`);
    }
  });

  greeter2.postMessage({ type: "insult", name: "JavaScript" });
  greeter2.addEventListener("message", ({ data }) => {
    switch (data.type) {
      case "greet":
        message2.text = data.greeting;
        message2.color = "green";
        message(message2);
        break;
      case "insult":
        message2.text = data.insult;
        message2.color = "red";
        message(message2);
        break;
      default:
        console.log(`Message from Worker 2: ${JSON.stringify(data)}`);
    }
  });

  if (module.hot) {
    module.hot.accept("./message", () => {
      if (el) {
        message(message1);
        message(message2);
      }
    });
  }
}
