package main

func BinarySearch(array *[]int, target int) int {
  for min, max := 0, len(*array) - 1; min <= max; {
    mid := (max + min) / 2
    if (*array)[mid] == target {
      return mid
    }
    if (*array)[mid] > target {
      max = mid - 1
    } else {
      min = mid + 1
    }
  }
  return -1
}

