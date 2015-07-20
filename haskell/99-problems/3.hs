elemAt (x:xs) 1 = x
elemAt [] n = error "Can't get this element"
elemAt (x:xs) n = elemAt xs (n - 1)
