-- Decode a run-length encoded list.

data Elem a = Single a | Multiple Int a deriving Show

decodeList [] = []
decodeList (x:xs) = getElems x ++ decodeList xs
  where
    getElems :: Elem a -> [a]
    getElems (Single x) = [x]
    getElems (Multiple n x) = getReps n x
    getReps :: Int -> a -> [a]
    getReps 0 x = []
    getReps n x = x : getReps (n - 1) x