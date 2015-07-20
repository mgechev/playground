--- Get last element of a list

lastElem :: [a] -> a
lastElem [] = error "The empty list does not has last element"
lastElem l
  | length l == 1 = head l
  | otherwise     = lastElem (tail l)