-- Drop every N'th element from a list.

dropEvery [] _ = []
dropEvery _ 1 = []
dropEvery lst n = dropEveryHelper lst n 1
  where
    dropEveryHelper [] _ _ = []
    dropEveryHelper (x:xs) n c
      | c `mod` n == 0  = dropEveryHelper xs n (c + 1)
      | otherwise       = x : dropEveryHelper xs n (c + 1)
