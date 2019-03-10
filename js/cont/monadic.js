// cont :: ((a -> r) -> r) -> Cont r a
// runCont :: Cont r a -> (a -> r) -> r

const runCont = (c, f) => c(f);
const ret = a => f => f(a);
const bind = (m, k) => c => runCont(m, a => runCont(k, a))(c);

const add = (a, b) => a + b;
const add_cps = (a, b) => ret(add(a, b));

const square = a => a * a;
const square_cps = a => ret(square(a));

bind(ret('foo'), a => f => f(a))(console.log);

const pyth_cps = (x, y) => 
  bind(square_cps(x), xsq =>
    bind(square_cps(y), ysq =>
      bind(add_cps(xsq, ysq), res =>
        ret(res))));

pyth_cps(1, 3)(console.log);
