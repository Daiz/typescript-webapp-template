const ctx: Worker = self as any;

type Actions = "greet" | "insult";

interface Message {
  type: Actions;
}

interface Response {
  type: Actions;
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

type Messages = GreetMessage | InsultMessage;
type Responses = GreetResponse | InsultResponse;

interface TypedWorker<M, R> {
  postMessage(data: M): void;
  addEventListener(
    type: "message",
    listener: (event: { data: R }) => void
  ): void;
  addEventListener(type: "error", listener: (event: ErrorEvent) => void): void;
  terminate(): void;
}

export interface IGreeterWorker extends TypedWorker<Messages, Responses> {}

ctx.addEventListener("message", ({ data }: { data: Messages }) => {
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
