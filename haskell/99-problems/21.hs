-- Insert an element at a given position into a list.

insertAt el lst 0 = el : lst
insertAt el (x:xs) n = x : insertAt el xs (n - 1)
