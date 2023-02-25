export class Reactor<T> {
  private val: T;
  private subscribers: ((v: T) => void)[];

  constructor(value: T) {
    // private value for where it's really stored
    this.val = value;
    // private list of functions to be notified
    this.subscribers = [];
  }

  // return value when requested
  get value() {
    return this.val;
  }
  // set value and then notify everyone
  set value(newVal: T) {
    this.val = newVal;
    for (const subscribeFunc of this.subscribers) {
      subscribeFunc(newVal);
    }
  }

  // add function to subscriber list
  // and immediately invoke
  subscribe(func: (v: T) => void) {
    this.subscribers.push(func);
    func(this.val);
  }
}
