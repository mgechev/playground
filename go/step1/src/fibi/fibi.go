package main
import "fmt"

func Fibi(n int) int {
  if n < 0 {
    return 0
  }
  if n == 1 || n == 2 {
    return 1
  }
  fst, snd := 0, 1
  var temp int
  for n > 0 {
    temp = snd
    snd = fst + snd
    fst = temp
    n -= 1
  }
  return fst
}

func main() {
  fmt.Println(Fibi(5));
}