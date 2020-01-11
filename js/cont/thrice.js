// thrice :: a -> (a -> ((a -> r) -> r)) -> ((a -> r) -> r)
const thrice = (a, f) => y => f(a)(f)(f)(y);

thrice(1, e => f => f(e + 1))(console.log);
