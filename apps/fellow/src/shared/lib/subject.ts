export type Subscription<T = unknown> = (event: T) => void;
export type Unsubscribe = () => void;

export class Subject<T> {
  readonly #subscribers = new Set<Subscription<T>>();

  subscribe(fn: Subscription<T>): Unsubscribe {
    this.#subscribers.add(fn);

    return () => this.#subscribers.delete(fn);
  }

  next(data: T): void {
    this.#subscribers.forEach((s) => s(data));
  }
}
