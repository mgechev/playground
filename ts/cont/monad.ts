class Cont<T> {
  constructor(private v: () => T) {}

  bind(k: (x: T) => Cont<T>): any {
    return new Cont(() => this.runCont(a => k(a)));
  }

  runCont<R>(f: (x: T) => R): R {
    let res = this.v() as any;
    while (typeof res.runCont === 'function') {
      res = res.v();
    }
    return f(res);
  }

  static return<T>(v: T) {
    return new Cont<T>(() => v);
  }
}

const addNum = (a: number, b: number) => a + b;
const addCPS = (a: number, b: number) => new Cont(() => addNum(a, b));

const squareNum = (a: number) => a * a;
const squareCPS = (a: number) => new Cont(() => squareNum(a));

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
