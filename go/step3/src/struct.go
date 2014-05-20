package main
import (
  "fmt"
  "math"
)

type Vector struct {
  X float64
  Y float64
}

func (v1 Vector) distance(v2 Vector) float64 {
  return math.Sqrt(math.Pow(v2.X - v1.X, 2) + math.Pow(v2.Y - v1.Y, 2))
}

func main() {
  v := Vector{ 1, 2 }
  v2 := Vector{ 2, 2 }
  fmt.Println(v.X)
  fmt.Println(v.distance(v2))
}