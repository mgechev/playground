-- In JavaScript
-- const add = (a, b) => a + b;
-- const square = a => a * a;

-- const add_cps = (a, b) => f => f(add(a, b));
-- const square_cps = a => f => f(square(a));

-- const pyth_cps = (a, b) => f => square_cps(a)(sqa => square_cps(b)(sqb => add_cps(sqa, sqb)(f)))

-- pyth_cps(2, 3)(console.log);

add x y = x + y
square x = x * x
pyth x y = sqrt(square x + square y)

add_cps :: Int -> Int -> ((Int -> r) -> r)
add_cps x y = \k -> k (add x y)

square_cps :: Int -> ((Int -> r) -> r)
square_cps x = \k -> k (square x)

pyth_csp :: Int -> Int -> ((Int -> r) -> r)
pyth_csp x y = \k -> (square_cps x (\x_sq -> square_cps y (\y_sq -> (add_cps x_sq y_sq)))) k

main :: IO()
main = pyth_csp 2 3 print
