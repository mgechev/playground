let _ctx: (() => void) | null = null;
let _subscriptions = new WeakMap();

const _subscribe = identity => {
  if (!_ctx) {
    return;
  }
  const subs = _subscriptions.get(identity) ?? new Set();
  subs.add(_ctx);
  _subscriptions.set(identity, subs);
};

const _notify = identity => {
  const subs = _subscriptions.get(identity);
  if (!subs) return;
  for (const sub of subs) {
    sub();
  }
};

export const signal = value => {
  const identity = Symbol();

  const get = () => {
    _subscribe(identity);
    return value;
  };

  get.set = newValue => {
    value = newValue;
    _notify(identity);
  };
  return get;
};

export const effect = cb => {
  _ctx = cb;
  cb();
};

export const computed = cb => {
  const computable = () => {
    _ctx = computable;
    return cb();
  };
  return computable;
};

