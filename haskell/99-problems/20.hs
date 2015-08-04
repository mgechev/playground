-- Remove the K'th element from a list.

removeKthElement (x:xs) k
  | k == 0             = xs
  | otherwise          = x : removeKthElement xs (k - 1)
