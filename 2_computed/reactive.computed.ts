// initially undefined. We can set it
// to null instead.
let computeFunc = null;

export class Reactor<T> {
  private val: T;
  private subscribers: ((v: T) => void)[];

  constructor(value: T) {
    this.val = value;
    this.subscribers = [];
  }

  get value() {
    // If it exists, we add it
    // to the subscribers.
    // Do not call it,
    // unlike a regular subscriber.
    if (computeFunc) {
      this.subscribers.push(computeFunc);
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
    this.subscribers.push(func);
    func(this.val);
  }
}

export function computed(func: () => void) {
  const reactor = new Reactor(null);

  // THIS is the function we subscribe to,
  // which updates the reactor
  const fn = () => (reactor.value = func());

  // set computeFunc to fn and store
  // previous value for later
  const prevVal = computeFunc;
  computeFunc = fn;

  fn();

  // set computeFunc back to previous
  // value
  computeFunc = prevVal;

  return reactor;
}

export function dynamicComputed(func) {
  const reactor = new Reactor(null);

  // move the local variable assignment into
  // the subcribed function
  const fn = () => {
    /**
     * @error
     * Then the function we're subscribing
     * to is setting ComputeFunc
     * and calling our get value method.
     *
     * Doing that forces us to add a
     * subscriber to ourself.
     * We're adding a subscriber
     * while looping through subscribers,
     * so we always have another subscriber
     * to loop over. Thus, an infinite loop.
     */
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
