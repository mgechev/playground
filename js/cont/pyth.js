const add = (a, b) => f => f(a + b);
const square = a => f => f(a * a);
const pyth = (a, b) => square(a)(asq => square(b)(bsq => add(asq, bsq)));
const root = a => f => f(Math.sqrt(a));
const dist = (a, b) => pyth(a, b)(root);

dist(1, 3)(console.log);
