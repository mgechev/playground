let _ctx = null;
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
  for (const sub of subs) {
    sub();
  }
};

const signal = value => {
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

const effect = cb => {
  _ctx = cb;
  cb();
};

const computed = cb => {
  const computable = () => {
    _ctx = computable;
    return cb();
  };
  return computable;
};

const a = signal(42);
const b = signal(28);

const sum = computed(() => {
  console.log('Rerun');
  return a() + b();
});

console.log(sum());

effect(() => {
  console.log('Effect:', a(), b());
});

a.set(1.618);
b.set(13);

