-- Find out whether a list is a palindrome. A palindrome can be read forward or backward; e.g. (x a m a x).

isPalindrome lst = eqTo lst (reverse lst) ((length lst) `div` 2)
  where
    eqTo l1 l2 0 = True
    eqTo (x:xs) (y:ys) n = x == y && (eqTo xs ys (n - 1))
