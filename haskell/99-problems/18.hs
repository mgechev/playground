--Given two indices, i and k, the slice is the list containing the elements between the i'th and k'th element of the original list (both limits included). Start counting the elements with 1.

slice lst i k
  | k > length lst = error "Invalid arguments"
  | i > k          = error "Invalid arguments"
  | i == k         = []
  | otherwise      = takeItemsBetween lst i k
  where
    takeItemsBetween lst 0 0 = []
    takeItemsBetween (x:xs) i k
      | i > 0  = takeItemsBetween xs (i - 1) (k - 1)
      | i == 0 = x : takeItemsBetween xs i (k - 1)
