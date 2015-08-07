-- Extract a given number of randomly selected elements from a list.

import System.Random
import Control.Monad (replicateM)

randSelect [] _  = return []
randSelect lst n
  | n < 0     = error "Invalid argument"
  | otherwise = do pos <- replicateM n $
                              getStdRandom $ randomR (0, (length lst) - 1)
                   return [ lst !! p | p <- pos ]
