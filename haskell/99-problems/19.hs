-- Rotate a list N places to the left.

rotateLeft [] _ = []
rotateLeft lst 0 = lst
rotateLeft lst num
  | num > 0 = rotateLeftHelper lst num
  | num < 0 = rotateLeftHelper lst (length lst + num)
  where
    rotateLeftHelper lst 0 = lst
    rotateLeftHelper (x:xs) num = rotateLeftHelper (xs ++ [x]) (num - 1)
