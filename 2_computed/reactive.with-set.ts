// initially undefined. We can set it
// to null instead.
let computeFunc: () => void | null = null;

export class Reactor<T> {
  private val: T;
  private subscribers: Set<(v: T) => void>;

  constructor(value: T) {
    this.val = value;
    this.subscribers = new Set();
  }

  get value() {
    // If it exists, we add it
    // to the subscribers.
    // Do not call it,
    // unlike a regular subscriber.
    if (computeFunc) {
      this.subscribers.add(computeFunc);
    }

    return this.val;
  }

  set value(newVal: T) {
    this.val = newVal;
    for (const subscribeFunc of this.subscribers) {
      subscribeFunc(newVal);
    }
  }

  subscribe(func: (v: T) => void) {
    this.subscribers.add(func);
    func(this.val);

    // cleanup fn: remove the subscriber
    return () => this.subscribers.delete(func);
  }
}

export function computed(func: () => void) {
  const reactor = new Reactor(null);

  // move the local variable assignment into
  // the subcribed function
  const fn = () => {
    if (fn === computeFunc) {
      throw Error("☢ Circular computation detected!");
    }
    const prevVal = computeFunc;
    computeFunc = fn;
    reactor.value = func();
    computeFunc = prevVal;
  };

  fn();

  return reactor;
}
