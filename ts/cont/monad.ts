class Cont<A> {
  constructor(public cont: <R>(x: (v: A) => R) => R) {}

  bind<B>(k: (x: A) => Cont<B>): Cont<B> {
    return new Cont(x => this.cont(a => k(a).cont(x)));
  }

  static return<A>(v: A) {
    return new Cont<A>(x => x(v));
  }
}

// Emulation of exception handling

const exception = () => Cont.return(1)
  .bind(n => new Cont((n) => 'fred' as any)
  .bind(res => Cont.return(res as any + n)));

console.log(exception().cont(console.log));

// Sum of two numbers

const sum = () => Cont.return(1)
  .bind(n1 => Cont.return(2)
  .bind(n2 => Cont.return(n1 + n2)));

sum().cont(console.log);

// Pythagorean theorem

const addNum = (a: number, b: number) => a + b;
const addCPS = (a: number, b: number) => Cont.return(addNum(a, b));

const squareNum = (a: number) => a * a;
const squareCPS = (a: number) => Cont.return(squareNum(a));

const pythCPS = (x: number, y: number) => squareCPS(x)
  .bind(xsq => squareCPS(y)
  .bind(ysq => {
    console.log('Compute')
    return addCPS(xsq, ysq)
    .bind(res => Cont.return(res))
  }));

const a = pythCPS(1, 3)

console.log('Beginning');
a.cont(console.log);
