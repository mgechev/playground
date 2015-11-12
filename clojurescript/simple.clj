(ns simple-playground)

(defn flatten1 [lst]
    (if (coll? lst)
      (let [s (seq lst)]
        (if (= (count s) 0)
          s
          (concat (flatten1 (first s)) (flatten1 (rest s))))
        )
      (seq [lst])
      )
  )

(flatten1 [1 2 3 4])
(flatten1 [1 2 [3] 4])
(flatten1 [[1 2] [3] 4])
(flatten1 [[[[1] 2] [3] 4]])

(defn qs [lst]
  (let [[head & tail] lst]
    (if (>= 1 (count lst))
      lst
      (flatten [(qs (for [x tail :when (<= x head)] x)) head (qs (for [x tail :when (> x head)] x))]))))


(qs [5 6 1 2 3 5 6 7])