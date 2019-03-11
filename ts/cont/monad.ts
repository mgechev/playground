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

console.log('Exception:', exception().cont(console.log));

// Sum of two numbers

const sum = () => Cont.return(1)
  .bind(n1 => Cont.return(2)
  .bind(n2 => Cont.return(n1 + n2)));

sum().cont(console.log.bind(console, 'Sum:'));

// Function declaration inside of a monad

const explicit = () => Cont.return(1)
  .bind(n1 => new Cont<number>(f => f(2))
  .bind(n2 => Cont.return(n1 + n2)));

explicit().cont(console.log.bind(console, 'Declaration:'));

// Call twice

const callTwice = () => Cont.return(3)
  .bind(n1 => new Cont<number>((f: (v: number) => any) => f(2) + f(3))
  .bind(n2 => Cont.return(n1 + n2)));

callTwice().cont(console.log.bind(console, 'Twice:'));

// Emulate list

const emulateList = () => Cont.return(1)
  .bind(n1 => new Cont<number>((f: (v: number) => any) => f(10).concat(f(11)))
  .bind(n2 => Cont.return(n1 + n2)));

console.log('List:', emulateList().cont(l => [l]));

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
