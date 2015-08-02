-- Implement the so-called run-length encoding data compression method directly.
-- I.e. don't explicitly create the sublists containing the duplicates, as in problem 9,
-- but only count them. As in problem P11, simplify the result list by replacing
-- the singleton lists (1 X) by X.

data Elem a = Single a | Multiple Int a deriving Show
runLength list = runLengthHelper 0 list
  where
    runLengthHelper n list
      | n >= length list  =  []
      | otherwise         =  (getMember (totalCount n list) n list) : runLengthHelper (n + (totalCount n list)) list
    getMember 1 n list = Single (list !! n)
    getMember k n list = Multiple k (list !! n)
    totalCount n list = totalDuplicatesCount (list !! n) n list
    totalDuplicatesCount elem n list
      | n >= length list      =  0
      | elem == (list !! n)   =  1 + totalDuplicatesCount elem (n + 1) list
      | otherwise             =  0
