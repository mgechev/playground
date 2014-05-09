package main
import "testing"

func FibTest(t *testing.T) {
  const in, out = 5, 5
  if x := Fib(in); x != out {
    t.Errorf("Fib(%v) = %v, want %v", in, x, out)
  }
}