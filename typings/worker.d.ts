declare interface TypedWorker<M, R> {
  postMessage(data: M): void;
  addEventListener(
    type: "message",
    listener: (event: { data: R }) => void
  ): void;
  addEventListener(type: "error", listener: (event: ErrorEvent) => void): void;
  terminate(): void;
}
