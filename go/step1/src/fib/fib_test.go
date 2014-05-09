package main
import "testing"

func FibTest(t *testing.T) {
  assert(5, 5, t)
  assert(0, 0, t)
  assert(-1, 0, t)
  assert(6, 13, t)
}

func assert(in int, out int, t *testing.T) {
  if x := Fib(in); x != out {
    t.Errorf("Fib(%v) = %v but got %v", in, out, x)
  }
}
