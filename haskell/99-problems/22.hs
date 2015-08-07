-- Create a list containing all integers within a given range.

range min max
  | min <= max    = min : range (min + 1) max
  | otherwise     = []
