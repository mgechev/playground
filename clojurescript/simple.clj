(ns simple-playground)

;; Factorial function

(defn fact [a]
  (if (<= a 0)
    1
    (* a (fact (- a 1)))))

(fact 5)


;; Fibonacci function

(defn fib [n]
  (if (<= n 2)
    1
    (+ (fib (- n 1)) (fib (- n 2))))
  )

(fib 5)
(fib 10)
(fib 15)


;; Custom flatten function

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


;; Quick Sort function

(defn qs [lst]
  (let [[head & tail] lst]
    (if (>= 1 (count lst))
      lst
      (flatten [(qs (for [x tail :when (<= x head)] x)) head (qs (for [x tail :when (> x head)] x))]))))


(qs [5 6 1 2 3 5 6 7])