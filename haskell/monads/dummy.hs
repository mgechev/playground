import Control.Monad

type Birds = Int
type Stick = (Birds, Birds)

addLeft :: Birds -> Stick -> Stick
addLeft x (left, right) = (left + x, right)

addRight :: Birds -> Stick -> Stick
addRight x (left, right) = (left, right + x)

(-:) :: a -> (a -> b) -> b
x -: f = f x
