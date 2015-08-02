-- Duplicate the elements of a list.

dupli [] = []
dupli (x:xs) = x : x : (dupli xs)
