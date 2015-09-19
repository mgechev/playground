def swap(arr, i, j):
    tmp = arr[i]
    arr[i] = arr[j]
    arr[j] = tmp

def partition(arr, left, right):
    el = arr[left]
    i = j = left + 1
    while i <= right:
        if arr[i] < el:
            swap(arr, i, j)
            j += 1
        i += 1
    j -= 1
    swap(arr, left, j)
    return j

def quick_select(arr, item):
    if arr == None:
        return -1
    left = 0
    right = len(arr) - 1
    while left <= right:
        pivot = partition(arr, left, right)
        if arr[pivot] == item:
            return pivot
        elif arr[pivot] > item:
            right = pivot - 1
        else:
            left = pivot + 1

print(quick_select([1, 2, 3, 4, 5, 6], 6))