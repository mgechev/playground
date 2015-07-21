-- Find the last but one element of a list.

butLast [] = error "Invalid argument"
butLast [_] = error "Invalid argument"
butLast (x:xs)
  | length xs == 1  =  x
  | otherwise       =  butLast xs
