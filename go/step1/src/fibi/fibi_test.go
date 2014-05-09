package main
import "testing"

func TestFibi(t *testing.T) {
  assert(0, 0, t);
  assert(-1, 0, t);
  assert(1, 1, t);
  assert(2, 1, t);
  assert(5, 5, t);
}

func assert(arg int, expected int, t *testing.T) {
  if x := Fibi(arg); x != expected {
    t.Errorf("Fibi(%v) = %v but got %v", arg, expected, x)
  }
}
