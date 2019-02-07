type Action = "greet" | "insult";

interface Message {
  type: Action;
}

interface Response {
  type: Action;
}

interface GreetMessage extends Message {
  type: "greet";
  name: string;
}

interface GreetResponse extends Response {
  type: "greet";
  greeting: string;
}

interface InsultMessage extends Message {
  type: "insult";
  name: string;
}

interface InsultResponse extends Response {
  type: "insult";
  insult: string;
}

type GreeterMessage = GreetMessage | InsultMessage;
type GreeterResponse = GreetResponse | InsultResponse;

const ctx: TypedWorkerContext<GreeterMessage, GreeterResponse> = self as any;

ctx.addEventListener("message", ({ data }) => {
  switch (data.type) {
    case "greet":
      const greet: GreetResponse = {
        type: "greet",
        greeting: `Hello, ${data.name}!`
      };
      setTimeout(() => ctx.postMessage(greet), 500 + Math.random() * 1000);
      break;
    case "insult":
      const insult: InsultResponse = {
        type: "insult",
        insult: `You stink, ${data.name}!`
      };
      setTimeout(() => ctx.postMessage(insult), 500 + Math.random() * 1000);
  }
});

export default (null as any) as TypedWorker<GreeterMessage, GreeterResponse>;
