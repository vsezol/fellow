export interface WebSocketClientOptions {
  url: string;
  reconnect?: false | number;
  open?: (event: Event) => unknown;
  message?: (event: MessageEvent) => unknown;
  error?: (event: Event) => unknown;
  close?: (event: CloseEvent) => unknown;
}

export class WebSocketClient {
  private reconnectTimeoutId: number | undefined;
  private webSocket: WebSocket | undefined;

  constructor(private readonly options: WebSocketClientOptions) {}

  connect(): void {
    this.webSocket = new WebSocket(this.options.url);

    this.webSocket.addEventListener('open', this.onOpen);
    this.webSocket.addEventListener('message', this.onMessage);
    this.webSocket.addEventListener('error', this.onError);
    this.webSocket.addEventListener('close', this.onClose);
  }

  destroy(): void {
    clearTimeout(this.reconnectTimeoutId);

    this.webSocket?.removeEventListener('open', this.onOpen);
    this.webSocket?.removeEventListener('message', this.onMessage);
    this.webSocket?.removeEventListener('error', this.onError);
    this.webSocket?.removeEventListener('close', this.onClose);

    this.webSocket?.close();
  }

  send(message: string): void {
    this.webSocket?.send(message);
  }

  private readonly onOpen = (event: Event): unknown =>
    this.options.open?.(event);

  private readonly onMessage = (event: MessageEvent): unknown =>
    this.options.message?.(event);

  private readonly onError = (event: Event): unknown =>
    this.options.error?.(event);

  private readonly onClose = (event: CloseEvent): void => {
    this.options.close?.(event);
    this.destroy();

    if (this.options.reconnect === false) {
      return;
    }

    this.reconnectTimeoutId = window.setTimeout(
      () => this.connect(),
      this.options.reconnect ?? 3000
    );
  };
}
