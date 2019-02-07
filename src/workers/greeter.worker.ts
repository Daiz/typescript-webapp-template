type Action = "greet" | "insult";

interface IMessage {
  type: Action;
}

interface IResponse {
  type: Action;
}

interface GreetMessage extends IMessage {
  type: "greet";
  name: string;
}

interface GreetResponse extends IResponse {
  type: "greet";
  greeting: string;
}

interface InsultMessage extends IMessage {
  type: "insult";
  name: string;
}

interface InsultResponse extends IResponse {
  type: "insult";
  insult: string;
}

type Message = GreetMessage | InsultMessage;
type Response = GreetResponse | InsultResponse;

export interface IGreeterWorker extends TypedWorker<Message, Response> {}
const ctx: TypedWorkerContext<Message, Response> = self as any;

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

export default null as any;
