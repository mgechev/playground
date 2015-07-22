-- Modify the result of problem 10 in such a way
-- that if an element has no duplicates it is
-- simply copied into the result list. Only elements
-- with duplicates are transferred as (N E) lists.

data Elem a = Single a | Multiple Int a deriving Show

runLength [] = []
runLength (x:xs) = (getElem x (getDuplicatesCount x xs)) : runLength (removeNextDuplicates x xs)
  where
    removeNextDuplicates _ [] = []
    removeNextDuplicates x (y:ys)
      | x == y    = removeNextDuplicates x ys
      | otherwise = (y:ys)
    getDuplicatesCount x [] = 1
    getDuplicatesCount x (y:ys)
      | x == y    = 1 + getDuplicatesCount x ys
      | otherwise = 1
    getElem x 1 = Single x
    getElem x y = Multiple y x
