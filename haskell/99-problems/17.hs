-- Split a list into two parts; the length of the first part is given.

split :: [a] -> Int -> ([a], [a])
split [] x = ([], [])
split lst 0 = ([], lst)
split lst x
  | x > length lst  = error "Sorry but you've passed an invalid argument"
  | otherwise       = ([ lst !! n | n <- [0..(x - 1)]], [ lst !! n | n <- [x..(length lst - 1)]])
