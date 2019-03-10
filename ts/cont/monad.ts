class Cont<A, R> {
  constructor(private v: (x: A) => (y: any) => R) {}

  bind(k: (x: A) => Cont<A, R>): any {
    return new Cont(x => this.runCont(a => k(a).runCont(x)));
  }

  runCont(f: any) {
    return this.v(f);
  }

  static return<A, R>(v: A) {
    return new Cont<A, R>((x: any) => x(v));
  }
}

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
a.runCont(console.log);
