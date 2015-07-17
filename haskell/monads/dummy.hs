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

foo = Just (0, 0) >>= addLeft' 1 >>= addLeft' 1 >>= addRight' 2 >>= addRight' 4 >>= addLeft' 1


doBasic = do
  x <- Just 3
  y <- Just 4
  return (x + y)


listBind :: [a] -> (a -> [b]) -> [b]
listBind [] f = []
listBind l f = concat (map f l)

doFilter = do
  x <- [1..50]
  guard ('8' `elem` show x)
  return x

type KnightPos = (Int, Int)

canReach :: KnightPos -> [KnightPos]
canReach (x, y) = do
    (a, b) <- [(x + 1, y), (x - 1, y), (x + 1, y + 1), (x - 1, y + 1), (x + 1, y - 1), (x - 1, y - 1), (x, y - 1), (x, y + 1)]
    guard (a `elem` [1..8] && b `elem` [1..8])
    return (a, b)

canReachIn3 = (5, 5) `elem` (return (1, 1) >>= canReach >>= canReach >>= canReach)

