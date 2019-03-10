class Cont<T> {
  constructor(private v: T) {}

  bind(k: (x: T) => Cont<T>) {
    return this.runCont(a => k(a));
  }

  runCont<R>(f: (x: T) => R): R {
    return f(this.v);
  }

  static return<T>(v: T) {
    return new Cont<T>(v);
  }
}

const addNum = (a: number, b: number) => a + b;
const addCPS = (a: number, b: number) => new Cont(addNum(a, b));

const squareNum = (a: number) => a * a;
const squareCPS = (a: number) => new Cont(squareNum(a));

const pythCPS = (x: number, y: number) => squareCPS(x)
  .bind(xsq => squareCPS(y)
  .bind(ysq => addCPS(xsq, ysq)
  .bind(res => Cont.return(res))));

pythCPS(1, 3).runCont(console.log);
