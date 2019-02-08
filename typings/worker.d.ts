declare interface TypedWorker<M, R> {
  new (): TypedWorker<M, R>;
  postMessage(data: M): void;
  addEventListener(
    type: "message",
    listener: (event: { data: R }) => void
  ): void;
  addEventListener(type: "error", listener: (event: ErrorEvent) => void): void;
  onmessage: (event: { data: R }) => void;
  onerror: (event: ErrorEvent) => void;
  terminate(): void;
}

declare interface TypedWorkerContext<M, R> {
  postMessage(data: R): void;
  addEventListener(
    type: "message",
    listener: (event: { data: M }) => void
  ): void;
  addEventListener(type: "error", listener: (event: ErrorEvent) => void): void;
  onmessage: (event: { data: R }) => void;
  onerror: (event: ErrorEvent) => void;
}
