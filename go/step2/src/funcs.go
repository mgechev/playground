package main
import "fmt"

func add(x, y int) int {
  return x + y
}

func returnArgs(x, y int) (int, int) {
  return x, y
}

func multi(x, y int) (z int) {
  z = x * y
  return
}

func pow(x, y int) (res int) {
  for res = 1; y > 0; y -= 1 {
    res *= x
  }
  return
}

func main() {
  fmt.Println(add(1, 2))
  fmt.Println(returnArgs(1, 2))
  fmt.Println(multi(2, 2))
  fmt.Println(pow(2, 10))
}
