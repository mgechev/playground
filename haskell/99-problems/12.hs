-- Decode a run-length encoded list.

data Elem a = Single a | Multiple Int a deriving Show

decodeList [] = []
decodeList (x:xs) = getElems x ++ decodeList xs
  where
    getElems (Single x) = [x]
    getElems (Multiple n x) = replicate n x