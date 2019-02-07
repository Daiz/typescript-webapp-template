declare var module: NodeHotModule;

import greeting from "./message";
import GreeterWorker, { IGreeterWorker } from "./workers/greeter.worker";

const NAMES = "Webpack & TypeScript";

const d = document;

export function init(selector: string) {
  const el = d.querySelector(selector);

  if (el) {
    greeting(el, NAMES);
  }

  const greeter1: IGreeterWorker = new GreeterWorker();
  const greeter2: IGreeterWorker = new GreeterWorker();
  greeter1.postMessage({ type: "greet", name: "TypeScript" });
  greeter1.addEventListener("message", ({ data }) => {
    switch (data.type) {
      case "greet":
        console.log(`Greeted by Worker 1: ${data.greeting}`);
        break;
      case "insult":
        console.log(`Insulted by Worker 1: ${data.insult}`);
        break;
      default:
        console.log(`Message from Worker 1: ${JSON.stringify(data)}`);
    }
  });

  greeter2.postMessage({ type: "insult", name: "JavaScript" });
  greeter2.addEventListener("message", ({ data }) => {
    switch (data.type) {
      case "greet":
        console.log(`Greeted by Worker 2: ${data.greeting}`);
        break;
      case "insult":
        console.log(`Insulted by Worker 2: ${data.insult}`);
        break;
      default:
        console.log(`Message from Worker 2: ${JSON.stringify(data)}`);
    }
  });

  if (module.hot) {
    module.hot.accept("./message", () => {
      if (el) {
        greeting(el, NAMES);
      }
    });
  }
}
