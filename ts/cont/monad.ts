class Cont<A> {
  constructor(public cont: <R>(x: (v: A) => R) => R) {}

  bind(k: (x: A) => Cont<A>): Cont<A> {
    return new Cont(x => this.cont(a => k(a).cont(x)));
  }

  static return<A>(v: A) {
    return new Cont<A>(x => x(v));
  }
}

const addNum = (a: number, b: number) => a + b;
const addCPS = (a: number, b: number) => Cont.return<number>(addNum(a, b));

const squareNum = (a: number) => a * a;
const squareCPS = (a: number) => Cont.return<number>(squareNum(a));

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
