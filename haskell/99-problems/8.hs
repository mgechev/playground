-- Eliminate consecutive duplicates of list elements.

compress [] = []
compress (x:xs) = x : compress (removeNextDuplicates x xs)
  where
    removeNextDuplicates _ [] = []
    removeNextDuplicates x (y:ys)
      | x == y    = removeNextDuplicates x ys
      | otherwise = (y:ys)
