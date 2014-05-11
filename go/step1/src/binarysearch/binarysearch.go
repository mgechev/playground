package main
import "fmt"

func BinarySearch(array []int, target int) int {
  for min, max := 0, len(array) - 1; min <= max; {
    mid := (max + min) / 2
    if array[mid] == target {
      return mid
    }
    if array[mid] > target {
      max = mid - 1
    } else {
      min = mid + 1
    }
  }
  return -1
}

func main() {
  arr := []int{ 1, 2, 3, 4, 5, 6, 8, 9, 10, 11 }
  fmt.Println(BinarySearch(arr, 1))
}

