package main
import "testing"

func TestBinarySearch(t *testing.T) {
  assert([]int{}, 1, -1, t)
  assert([]int{-1}, -1, 0, t)
  assert([]int{-1, 1}, 1, 1, t)
  assert([]int{-1, 1, 2, 3}, 3, 3, t)
  assert([]int{-1, 1, 2, 3}, 4, -1, t)
  assert([]int{-1, 1, 2, 3}, -4, -1, t)
  assert([]int{-1, 1, 2, 3, 7}, -4, -1, t)
  assert([]int{-1, 1, 2, 3, 7}, 9, -1, t)
}

func assert(array []int, target int, expected int, t *testing.T) {
  if x := BinarySearch(&array, target); x != expected {
    t.Errorf("BinarySearch(array, %v) = %x not %v", target, expected)
  }
}
