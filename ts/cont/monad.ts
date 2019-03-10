class Cont<A, R> {
  constructor(private v: (x: (v: A) => R) => R) {}

  bind(k: (x: A) => Cont<A, R>): Cont<A, R> {
    return new Cont(x => this.runCont(a => k(a).runCont(x)));
  }

  runCont(f: (v: A) => R) {
    return this.v(f);
  }

  static return<A, R>(v: A) {
    return new Cont<A, R>((x: (v: A) => R) => x(v));
  }
}

const addNum = (a: number, b: number) => a + b;
const addCPS = (a: number, b: number) => Cont.return<number, void>(addNum(a, b));

const squareNum = (a: number) => a * a;
const squareCPS = (a: number) => Cont.return<number, void>(squareNum(a));

const pythCPS = (x: number, y: number) => squareCPS(x)
  .bind(xsq => squareCPS(y)
  .bind(ysq => {
    console.log('Compute')
    return addCPS(xsq, ysq)
    .bind(res => Cont.return(res))
  }));

const a = pythCPS(1, 3)

console.log('Beginning');
a.runCont(console.log);
