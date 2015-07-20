-- reverse a list

rev :: [a] -> [a]
rev [] = []
rev (x:xs) = (rev xs) ++ [x]

rev2 [] = []
rev2 lst = rev2' lst []
  where
    rev2' [] rev = rev
    rev2' (x:xs) rev = rev2' xs (x:rev)
