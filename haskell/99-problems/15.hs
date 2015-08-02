-- Replicate the elements of a list a given number of times.

repli :: [a] -> Int -> [a]
repli _ 0 = []
repli lst 1 = lst
repli [] _ = []
repli (x:xs) n = [ x | _ <- [1..n] ] ++ (repli xs n)
