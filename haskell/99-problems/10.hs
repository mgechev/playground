-- Run-length encoding

runLength [] = []
runLength (x:xs) = (x, getDuplicatesCount x xs) : runLength (removeNextDuplicates x xs)
  where
    removeNextDuplicates _ [] = []
    removeNextDuplicates x (y:ys)
      | x == y    = removeNextDuplicates x ys
      | otherwise = (y:ys)
    getDuplicatesCount x [] = 1
    getDuplicatesCount x (y:ys)
      | x == y    = 1 + getDuplicatesCount x ys
      | otherwise = 1

