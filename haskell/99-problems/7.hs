-- Flatten a nested list structure.

data NestedList a = Elem a | List [NestedList a]

lst = (List [Elem 1, List [Elem 2, List [Elem 3, Elem 4], Elem 5]])

flatten (Elem x) = [x]
flatten (List []) = []
flatten (List (x:xs)) = flatten x ++ flatten (List xs)
