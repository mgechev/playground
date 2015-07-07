import Control.Monad

type Birds = Int
type Stick = (Birds, Birds)

addLeft :: Birds -> Stick -> Stick
addLeft x (left, right) = (left + x, right)

addRight :: Birds -> Stick -> Stick
addRight x (left, right) = (left, right + x)

(-:) :: a -> (a -> b) -> b
x -: f = f x


addLeft' :: Birds -> Stick -> Maybe Stick
addLeft' x (left, right)
  | abs(left + x - right) >= 3    =   Nothing
  | otherwise                     =   Just (left + x, right)

addRight' :: Birds -> Stick -> Maybe Stick
addRight' x (left, right)
  | abs(right + x - left) >= 3    =   Nothing
  | otherwise                     =   Just (left, right + x)

