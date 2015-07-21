-- Pack consecutive duplicates of list elements into sublists. If a list contains repeated elements they should be placed in separate sublists.

pack [] = []
pack (x:xs) = [(getDuplicates x xs)] ++ pack (removeNextDuplicates x xs)
  where
    removeNextDuplicates _ [] = []
    removeNextDuplicates x (y:ys)
      | x == y    = removeNextDuplicates x ys
      | otherwise = (y:ys)
    getDuplicates x [] = [x]
    getDuplicates x (y:ys)
      | x == y    = y : getDuplicates x ys
      | otherwise = [x]
